import { SchemaType } from "@google/generative-ai";
import { FormData, ShoppingList } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenerativeAI(apiKey);

const shoppingListSchema = {
  type: SchemaType.ARRAY,
  description: "A categorized shopping list for a BBQ party.",
  items: {
    type: SchemaType.OBJECT,
    properties: {
      category: {
        type: SchemaType.STRING,
        description: "Category of the items (e.g., お肉, 海鮮, 野菜・果物, 飲み物, 調味料・ソース, 備品・消耗品).",
        nullable: false,
      },
      items: {
        type: SchemaType.ARRAY,
        description: "List of items in this category.",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            name: {
              type: SchemaType.STRING,
              description: "Name of the item to buy.",
              nullable: false,
            },
            quantity: {
              type: SchemaType.STRING,
              description: "Specific quantity of the item (e.g., 500g, 2本, 1パック).",
              nullable: false,
            },
            price: {
              type: SchemaType.NUMBER,
              description: "Estimated price of the item in Japanese Yen (e.g., 1500).",
              nullable: false,
            },
            notes: {
              type: SchemaType.STRING,
              description: "Optional notes for the item (e.g., brand preference, preparation note).",
              nullable: true,
            },
          },
          required: ['name', 'quantity', 'price'],
        },
      },
    },
    required: ['category', 'items'],
  },
};

function buildPrompt(formData: FormData): string {
  const {
    adults,
    children,
    budget,
    meatPreferences,
    seafoodPreferences,
    allergies,
    otherRequests
  } = formData;

  return `
あなたは経験豊富なBBQプランナーです。以下の条件に基づいて、楽しくて美味しいBBQパーティーのための、詳細な買い出しリストを生成してください。

# BBQパーティーの条件
- 大人の人数: ${adults}人
- 子供の人数: ${children}人
- 全体の予算: ${budget.toLocaleString()}円
- お肉の好み: ${meatPreferences.length > 0 ? meatPreferences.join('、') : '特になし。プランナーのおすすめで'}
- 海鮮の好み: ${seafoodPreferences.length > 0 ? seafoodPreferences.join('、') : '特になし。プランナーのおすすめで'}
- アレルギーや苦手な食材: ${allergies || 'なし'}
- その他の要望: ${otherRequests || 'なし'}

# 指示
1. **予算遵守**: 提示された予算内で、満足度の高い買い出しリストを作成してください。少し余裕を持たせた金額で計画してください。
2. **量の計算**: 大人と子供の人数に合わせて、食材や飲み物の量を適切に計算してください。食べ残しが少なく、かつ不足しないような量をお願いします。
3. **多様性**: 肉、海鮮、野菜、主食、デザート、飲み物など、バランスの取れたメニュー構成にしてください。
4. **子供向けメニュー**: 子供が喜ぶようなメニュー（例：焼きそば、フランクフルト、焼きマシュマロ、コーンバターなど）を必ず含めてください。
5. **カテゴリ分類**: 買い物がしやすいように、リストを「お肉」「海鮮」「野菜・果物」「飲み物」「調味料・ソース」「主食・その他食材」「備品・消耗品」などの明確なカテゴリに分けてください。
6. **具体的な記述**: 各アイテムについて、品名（name）、具体的な量（quantity）、そして日本の一般的なスーパーマーケットでの予想価格（price）を円単位の数値で必ず記載してください。必要であれば、補足情報（notes）も追記してください。
7. **アレルギー対応**: アレルギーや苦手な食材はリストから除外するか、代替案を提案してください。
8. **価格の現実性**: 価格は実際の日本のスーパーマーケットの相場に基づいて設定してください。

# 出力例
[
  {
    "category": "お肉",
    "items": [
      {
        "name": "牛カルビ",
        "quantity": "800g",
        "price": 2400,
        "notes": "焼肉用にカット済み"
      },
      {
        "name": "豚バラ肉",
        "quantity": "600g",
        "price": 900
      }
    ]
  },
  {
    "category": "野菜・果物",
    "items": [
      {
        "name": "玉ねぎ",
        "quantity": "3個",
        "price": 200
      }
    ]
  }
]
`;
}

export const generateShoppingList = async (formData: FormData): Promise<ShoppingList> => {
  const prompt = buildPrompt(formData);

  try {
    // ✅ スキーマを使用してモデルを初期化
    const model = ai.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: shoppingListSchema,
      },
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    console.log("📥 API Response:", text);

    // JSONとしてパース
    const shoppingList: ShoppingList = JSON.parse(text);

    console.log("✅ Parsed Shopping List:", shoppingList);

    return shoppingList;
  } catch (error) {
    console.error("❌ Error generating shopping list:", error);
    throw new Error("買い出しリストの生成中にエラーが発生しました。");
  }
};
