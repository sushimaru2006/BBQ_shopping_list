import React, { useState } from 'react';
import { FormData, ShoppingList } from './types';
import { generateShoppingList } from './services/geminiService';
import BbqForm from './components/BbqForm';
import ShoppingListComponent from './components/ShoppingList';
import { PartyPopper } from './components/icons';

const initialFormData: FormData = {
  adults: 2,
  children: 0,
  budget: 10000,
  meatPreferences: [],
  seafoodPreferences: [],
  allergies: '',
  otherRequests: '',
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.adults + formData.children === 0) return;

    setIsLoading(true);
    setError(null);
    try {
      const list = await generateShoppingList(formData);
      setShoppingList(list);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('予期せぬエラーが発生しました。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const list = await generateShoppingList(formData);
      setShoppingList(list);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('予期せぬエラーが発生しました。');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setShoppingList(null);
    setError(null);
  };

  return (
    <div className="bg-orange-50 min-h-screen font-sans text-gray-800">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <header className="text-center mb-8 md:mb-12">
           <div className="inline-flex items-center justify-center bg-white p-4 rounded-full shadow-md mb-4">
             <PartyPopper className="w-12 h-12 text-orange-500" />
           </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            AI BBQプランナー
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            人数や好みを入力するだけで、AIがあなたにぴったりのBBQ買い出しリストを提案します！
          </p>
        </header>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200">
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                    <p className="font-bold">エラー</p>
                    <p>{error}</p>
                </div>
            )}

            {!shoppingList ? (
                <BbqForm
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />
            ) : (
                <ShoppingListComponent
                    shoppingList={shoppingList}
                    onRegenerate={handleRegenerate}
                    onReset={handleReset}
                    isLoading={isLoading}
                />
            )}
        </div>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by Google Gemini API</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
