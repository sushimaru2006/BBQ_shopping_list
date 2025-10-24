import React from 'react';
import { FormData } from '../types';
import { Users, Baby, Beef, Fish, MessageSquarePlus, Sparkles, CircleDollarSign, Ban } from './icons';

interface BbqFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const meatOptions = ['牛肉', '豚肉', '鶏肉', 'ホルモン', 'ラム肉'];
const seafoodOptions = ['エビ', 'イカ', 'ホタテ', '魚介類盛り合わせ'];

const BbqForm: React.FC<BbqFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleNumberChange = (field: 'adults' | 'children' | 'budget', value: number) => {
    setFormData(prev => ({ ...prev, [field]: Math.max(0, value) }));
  };

  const handleCheckboxChange = (field: 'meatPreferences' | 'seafoodPreferences', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field];
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="adults" className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <Users className="w-6 h-6 mr-2 text-orange-500" />
            大人の人数
          </label>
          <input
            type="number"
            id="adults"
            value={formData.adults}
            onChange={e => handleNumberChange('adults', parseInt(e.target.value, 10) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="children" className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <Baby className="w-6 h-6 mr-2 text-orange-500" />
            子供の人数
          </label>
          <input
            type="number"
            id="children"
            value={formData.children}
            onChange={e => handleNumberChange('children', parseInt(e.target.value, 10) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            min="0"
          />
        </div>
        <div>
          <label htmlFor="budget" className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <CircleDollarSign className="w-6 h-6 mr-2 text-orange-500" />
            全体の予算
          </label>
          <div className="relative">
            <input
              type="number"
              id="budget"
              value={formData.budget}
              onChange={e => handleNumberChange('budget', parseInt(e.target.value, 10) || 0)}
              className="w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              min="0"
              step="1000"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">円</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <Beef className="w-6 h-6 mr-2 text-orange-500" />
            お肉の好み（複数選択可）
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {meatOptions.map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition has-[:checked]:bg-orange-100 has-[:checked]:border-orange-400">
              <input
                type="checkbox"
                value={option}
                checked={formData.meatPreferences.includes(option)}
                onChange={() => handleCheckboxChange('meatPreferences', option)}
                className="form-checkbox h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
      
       <div>
        <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <Fish className="w-6 h-6 mr-2 text-orange-500" />
            海鮮の好み（複数選択可）
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {seafoodOptions.map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition has-[:checked]:bg-orange-100 has-[:checked]:border-orange-400">
              <input
                type="checkbox"
                value={option}
                checked={formData.seafoodPreferences.includes(option)}
                onChange={() => handleCheckboxChange('seafoodPreferences', option)}
                className="form-checkbox h-5 w-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

       <div>
        <label htmlFor="allergies" className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <Ban className="w-6 h-6 mr-2 text-orange-500" />
            アレルギー・苦手な食材
        </label>
        <textarea
          id="allergies"
          value={formData.allergies}
          onChange={e => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
          rows={2}
          placeholder="例：エビ、ピーマン、乳製品など (カンマ区切りで入力)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        ></textarea>
      </div>

      <div>
        <label htmlFor="otherRequests" className="flex items-center text-lg font-semibold text-gray-700 mb-2">
            <MessageSquarePlus className="w-6 h-6 mr-2 text-orange-500" />
            その他の要望
        </label>
        <textarea
          id="otherRequests"
          value={formData.otherRequests}
          onChange={e => setFormData(prev => ({ ...prev, otherRequests: e.target.value }))}
          rows={2}
          placeholder="例：辛いものは苦手、焼きマシュマロがしたい！など"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading || (formData.adults + formData.children === 0)}
          className="w-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>生成中...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 mr-2" />
              AIに買い出しリストを作成してもらう
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BbqForm;