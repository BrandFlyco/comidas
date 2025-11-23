import React from 'react';
import { Recipe } from '../types';
import { ClockIcon, FireIcon, ChartBarIcon } from './Icons';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 overflow-hidden border border-slate-100 animate-fade-in-up">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{recipe.title}</h2>
            <p className="text-slate-300 leading-relaxed">{recipe.description}</p>
          </div>
        </div>

        {/* Meta Data */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <ClockIcon className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium">{recipe.time}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <ChartBarIcon className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium">{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
            <FireIcon className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium">{recipe.calories}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8 md:gap-12">
        
        {/* Ingredients Column */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Ingredientes
          </h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex justify-between items-center text-slate-700 border-b border-slate-50 pb-2 last:border-0">
                <span className="font-medium">{ing.item}</span>
                <span className="text-slate-500 text-sm font-mono bg-slate-50 px-2 py-0.5 rounded">
                  {ing.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions Column */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
            Instrucciones
          </h3>
          <ol className="space-y-6">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="relative pl-8">
                <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold ring-4 ring-white">
                  {idx + 1}
                </span>
                <p className="text-slate-600 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
