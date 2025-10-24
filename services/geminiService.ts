import { GoogleGenAI, Type } from "@google/genai";
import { FormData, ShoppingList } from "../types";

// ✅ Vercel + Vite 環境対応：import.meta.env でAPIキーを取得
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Gemini APIキーが設定されていません。Vercelの環境変数または.envを確認してください。");
}

const ai = new GoogleGenerativeAI(API_KEY);

const shoppingListSchema = {
  type: Type.ARRAY,
  description: "A categorized shopping list for a BBQ party.",
  items: {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        description: "Category of the items (e.g., Meat, Seafood, Vegetables, Drinks, Condiments, Supplies)."
      },
      items: {
        type: Type.ARRAY,
        description: "List of items in this category.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "Name of the item to buy."
            },
            quantity: {
              type: Type.STRING,
              description: "Specific quantity of the item (e.g., 500g, 2 bottles, 1 pack)."
            },
            price: {
              type: Type.NUMBER,
              description: "Estimated price of the item in Japanese Yen. e.g., 1500"
            },
            notes: {
              type: Type.STRING,
              description: "Optional notes for the item (e.g., brand preference, preparation note)."
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
1.  **予算遵守**: 提示された予算内で、満足度の高い買い出しリストを作成してください。少し余裕を持たせた金額で計画してください。
2.  **量の計算**: 大人と子供の人数に合わせて、食材や飲み物の量を適切に計算してください。食べ残しが少なく、かつ不足しないような量をお願いします。
3.  **多様性**: 肉、海鮮、野菜、主食、デザート、飲み物など、バランスの取れたメニュー構成にしてください。
4.  **子供向けメニュー**: 子供が喜ぶようなメニュー（例：焼きそば、フランクフルト、焼きマシュマロ、コーンバターなど）を必ず含めてください。
5.  **カテゴリ分類**: 買い物がしやすいように、リストを「お肉」「海鮮」「野菜・果物」「飲み物」「調味料・ソース」「主食・その他食材」「備品・消耗品」などの明確なカテゴリに分けてください。
6.  **具体的な記述**: 各アイテムについて、品名（name）、具体的な量（quantity）、そして日本の一般的なスーパーマーケットでの**予想価格（price）**を円単位の数値で必ず記載してください。必要であれば、補足情報（notes）も追記してください。
7.  **アレルギー対応**: アレルギーや苦手な食材はリストから除外するか、代替案を提案してください。
8.  **出力形式**: 必ず指定されたJSONスキーマに従って、結果をJSON形式で出力してください。他のテキストは含めないでください。
`;
}


export const generateShoppingList = async (formData: FormData): Promise<ShoppingList> => {
  const prompt = buildPrompt(formData);
  try {
    // FIX: Use ai.models.generateContent instead of deprecated methods.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: shoppingListSchema,
      },
    });

    // FIX: Use response.text to get the text response directly.
    const jsonStr = response.text.trim();

    if (!jsonStr) {
      throw new Error("APIから空の応答が返されました。");
    }

    const shoppingList: ShoppingList = JSON.parse(jsonStr);
    return shoppingList;
  } catch (error) {
    console.error("Error generating shopping list:", error);
    throw new Error("買い出しリストの生成中にエラーが発生しました。条件を変更して再度お試しください。");
  }
};
