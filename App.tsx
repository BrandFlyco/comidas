import React, { useState, useRef } from 'react';
import { FRIENDS_LIST } from './constants';
import { MealType, Recipe } from './types';
import { generateGroupRecipe } from './services/geminiService';
import FriendSelector from './components/FriendSelector';
import Controls from './components/Controls';
import RecipeCard from './components/RecipeCard';
import { UserIcon } from './components/Icons';

const App: React.FC = () => {
  // State
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [mealType, setMealType] = useState<MealType>(MealType.DINNER);
  const [restrictions, setRestrictions] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Refs for scrolling
  const recipeRef = useRef<HTMLDivElement>(null);

  // Handlers
  const toggleFriend = (id: string) => {
    setSelectedFriendIds((prev) => 
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleGenerateRecipe = async () => {
    if (selectedFriendIds.length === 0) return;

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const result = await generateGroupRecipe(
        selectedFriendIds.length,
        mealType,
        restrictions
      );
      setRecipe(result);
      
      // Small delay to ensure render happens before scroll
      setTimeout(() => {
        recipeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al conectar con el chef.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Comida con Amigos</h1>
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <UserIcon className="w-5 h-5" />
            <span>{FRIENDS_LIST.length} amigos totales</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* Intro */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Planifica tu próxima juntada</h2>
          <p className="text-slate-500">Selecciona quiénes vienen y deja que nuestra IA cree el menú ideal para todos.</p>
        </div>

        {/* Components */}
        <FriendSelector 
          friends={FRIENDS_LIST} 
          selectedIds={selectedFriendIds} 
          toggleFriend={toggleFriend} 
        />

        <Controls 
          mealType={mealType}
          setMealType={setMealType}
          restrictions={restrictions}
          setRestrictions={setRestrictions}
          onGenerate={handleGenerateRecipe}
          loading={loading}
          disabled={selectedFriendIds.length === 0}
        />

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Results Area */}
        <div ref={recipeRef}>
          {recipe && <RecipeCard recipe={recipe} />}
        </div>
        
      </main>
    </div>
  );
};

export default App;
