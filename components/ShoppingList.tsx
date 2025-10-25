import React, { useState, useMemo } from 'react';
import { ShoppingList as ShoppingListType, ShoppingListCategory } from '../types';
import { Check, Copy, RotateCcw, UtensilsCrossed } from './icons';

interface ShoppingListProps {
  shoppingList: ShoppingListType | Record<string, any>; // オブジェクト型も許容
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

  // ✅ 配列でもオブジェクトでも安全に扱う（中身も含めて）
  const normalizedList: ShoppingListCategory[] = Array.isArray(shoppingList)
    ? shoppingList
    : Object.entries(shoppingList || {}).map(([category, items]) => ({
        category,
        items: Array.isArray(items)
          ? items
          : Object.values(items || {}), // ←★★ ここを追加！
      }));
  console.log("normalizedList:", normalizedList);

  // ✅ items の中身をオブジェクト形式に変換
  const fixedList = normalizedList.map((category) => {
    const fixedItems = category.items.map((item) => {
      // もし item が ["牛肉", "500g", 800] のような配列ならオブジェクトに変換
      if (Array.isArray(item)) {
        const [name, quantity, price] = item;
        return {
          name: String(name ?? ""),
          quantity: String(quantity ?? ""),
          price: typeof price === "number" ? price : Number(price) || undefined,
        };
      }
      // すでにオブジェクト形式ならそのまま
      return item;
    });

    return { ...category, items: fixedItems };
  });

  // ✅ 合計金額計算
  const totalPrice = useMemo(() => {
    return normalizedList.reduce((total, category) => {
      return (
        total +
        category.items.reduce((sum, item) => sum + (item.price || 0), 0)
      );
    }, 0);
  }, [normalizedList]);

  // ✅ チェックのON/OFF
  const handleToggleItem = (categoryName: string, itemName: string) => {
    const itemId = `${categoryName}-${itemName}`;
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

  // ✅ テキストコピー用
  const listToPlainText = () => {
    let text = `【BBQ買い出しリスト】\n予想合計金額: 約${totalPrice.toLocaleString()}円\n\n`;

    text += normalizedList
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
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 w-full animate-fade-in">
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
                &yen;{totalPrice.toLocaleString()}
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
        {fixedList.map((category) => (
          <div key={category.category}>
            <h3>{category.category}</h3>
            <ul>
              {category.items.map((item, i) => (
                <li key={i}>
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  {item.price && <p>約{item.price.toLocaleString()}円</p>}
                </li>
              ))}
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
