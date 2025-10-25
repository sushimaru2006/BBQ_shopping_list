import React, { useState, useMemo } from 'react';
import { Check, Copy, RotateCcw, UtensilsCrossed } from 'lucide-react';

interface ShoppingItem {
  name: string;
  quantity: string;
  price?: number;
  notes?: string;
}

interface ShoppingListCategory {
  category: string;
  items: ShoppingItem[];
}

interface ShoppingListProps {
  shoppingList: ShoppingListCategory[] | Record<string, any>;
  onRegenerate: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  shoppingList,
  onRegenerate,
  onReset,
  isLoading,
}) => {
  console.log("🧩 shoppingList data:", shoppingList);

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  // データの正規化
  const normalizedList: ShoppingListCategory[] = useMemo(() => {
    if (Array.isArray(shoppingList)) {
      return shoppingList;
    }

    // オブジェクト形式の場合
    return Object.entries(shoppingList || {}).map(([category, items]) => ({
      category,
      items: Array.isArray(items) ? items : Object.values(items || {}),
    }));
  }, [shoppingList]);

  // アイテムデータの修正
  const fixedList: ShoppingListCategory[] = useMemo(() => {
    return normalizedList.map((category) => {
      const fixedItems = category.items.map((item: any, index: number) => {
        // 配列形式の場合
        if (Array.isArray(item)) {
          const [name = '', quantity = '', price, notes] = item;
          return {
            name: String(name),
            quantity: String(quantity),
            price: typeof price === 'number' ? price : (price ? Number(price) : undefined),
            notes: notes ? String(notes) : undefined,
          };
        }

        // オブジェクト形式の場合
        if (typeof item === 'object' && item !== null) {
          return {
            name: String(item.name || item.item || `アイテム${index + 1}`),
            quantity: String(item.quantity || item.amount || '適量'),
            price: typeof item.price === 'number' ? item.price : (item.price ? Number(item.price) : undefined),
            notes: item.notes ? String(item.notes) : undefined,
          };
        }

        // その他の場合（文字列など）
        return {
          name: String(item),
          quantity: '適量',
        };
      });

      return { ...category, items: fixedItems };
    });
  }, [normalizedList]);

  // 合計金額の計算
  const totalPrice = useMemo(() => {
    return fixedList.reduce(
      (total, category) =>
        total +
        category.items.reduce((sum, item) => sum + (item.price || 0), 0),
      0
    );
  }, [fixedList]);

  // チェックのON/OFF（ユニークなIDを生成）
  const handleToggleItem = (categoryIndex: number, itemIndex: number) => {
    const itemId = `cat-${categoryIndex}-item-${itemIndex}`;
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // テキストコピー用
  const listToPlainText = () => {
    let text = `【BBQ買い出しリスト】\n予想合計金額: 約${totalPrice.toLocaleString()}円\n\n`;

    text += fixedList
      .map(
        (cat) =>
          `▼ ${cat.category}\n` +
          cat.items
            .map((item) => {
              let line = `- ${item.name} (${item.quantity})`;
              if (item.price != null) {
                line += ` [約${item.price.toLocaleString()}円]`;
              }
              if (item.notes) {
                line += ` (${item.notes})`;
              }
              return line;
            })
            .join('\n')
      )
      .join('\n\n');

    return text;
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(listToPlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <div className="flex items-center">
            <UtensilsCrossed className="w-8 h-8 text-orange-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">BBQ買い出しリスト</h2>
          </div>
          {totalPrice > 0 && (
            <div className="mt-2 pl-11">
              <span className="font-semibold text-gray-600">予想合計金額:</span>
              <span className="ml-2 text-2xl font-bold text-orange-600">
                ¥{totalPrice.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all text-sm"
          >
            {copied ? (
              <Check className="w-5 h-5 mr-2 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 mr-2" />
            )}
            {copied ? 'コピーしました！' : 'コピー'}
          </button>

          <button
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-4 rounded-lg transition-all text-sm disabled:opacity-50"
          >
            <RotateCcw
              className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`}
            />
            再生成
          </button>
        </div>
      </div>

      {/* List Section */}
      <div className="space-y-6">
        {fixedList.map((category, categoryIndex) => (
          <div
            key={`category-${categoryIndex}`}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <h3 className="bg-orange-50 text-orange-800 px-4 py-3 font-semibold text-lg border-b border-orange-200">
              {category.category}
            </h3>
            <ul className="divide-y divide-gray-200">
              {category.items.map((item, itemIndex) => {
                const itemId = `cat-${categoryIndex}-item-${itemIndex}`;
                const isChecked = checkedItems.has(itemId);
                return (
                  <li
                    key={itemId}
                    onClick={() => handleToggleItem(categoryIndex, itemIndex)}
                    className={`flex items-start p-4 cursor-pointer transition-colors ${
                      isChecked
                        ? 'bg-green-50 text-gray-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mr-4 mt-1 flex items-center justify-center ${
                        isChecked
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`font-medium text-gray-800 ${
                          isChecked ? 'line-through' : ''
                        }`}
                      >
                        {item.name}
                      </p>
                      <div
                        className={`text-sm text-gray-600 flex items-center ${
                          isChecked ? 'line-through' : ''
                        }`}
                      >
                        <span>{item.quantity}</span>
                        {item.price != null && (
                          <span className="ml-2 font-semibold text-gray-700">
                            (約{item.price.toLocaleString()}円)
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p
                          className={`text-xs text-gray-500 italic mt-1 ${
                            isChecked ? 'line-through' : ''
                          }`}
                        >
                          {item.notes}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <div className="mt-8">
        <button
          onClick={onReset}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          最初からやり直す
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
