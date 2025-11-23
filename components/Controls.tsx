import React from 'react';
import { MealType } from '../types';
import { MEAL_OPTIONS } from '../constants';
import { SparklesIcon } from './Icons';

interface ControlsProps {
  mealType: MealType;
  setMealType: (type: MealType) => void;
  restrictions: string;
  setRestrictions: (text: string) => void;
  onGenerate: () => void;
  loading: boolean;
  disabled: boolean;
}

const Controls: React.FC<ControlsProps> = ({
  mealType,
  setMealType,
  restrictions,
  setRestrictions,
  onGenerate,
  loading,
  disabled
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Meal Type Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tipo de Comida
          </label>
          <div className="grid grid-cols-2 gap-2">
            {MEAL_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setMealType(option.value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-colors border
                  ${mealType === option.value
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restrictions Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Restricciones / Preferencias
          </label>
          <textarea
            value={restrictions}
            onChange={(e) => setRestrictions(e.target.value)}
            placeholder="Ej: Sin gluten, Tobi es vegetariano, nos gusta mucho el picante..."
            className="w-full h-[88px] p-3 rounded-lg border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none text-sm text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Main Action Button */}
      <button
        onClick={onGenerate}
        disabled={disabled || loading}
        className={`
          w-full py-4 rounded-xl flex items-center justify-center gap-2 text-lg font-bold transition-all
          ${disabled 
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
            : 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200 active:scale-[0.99]'
          }
        `}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Consultando al Chef...</span>
          </>
        ) : (
          <>
            <SparklesIcon className="w-6 h-6" />
            <span>Generar Menú Perfecto</span>
          </>
        )}
      </button>
    </div>
  );
};

export default Controls;
