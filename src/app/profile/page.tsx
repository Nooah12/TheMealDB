'use client'
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from '@/utils/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
  const {user, setUser} = useUserContext() as UserContextType;
  const [recipeDetails, setRecipeDetails] = useState<RecipeType[]>([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        if (user?.savedRecipes?.length) {
          const fetchPromises = user.savedRecipes.map(async (idMeal) => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            return data.meals[0];
          });
          // Wait for all fetches to complete and update the state
          const allRecipes = await Promise.all(fetchPromises);
          setRecipeDetails(allRecipes);
        }
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    if (user?.savedRecipes?.length) {
      fetchSavedRecipes();
    }
  }, [user?.savedRecipes]);

    return (
      <section>
        <div className="my-4 font-semibold text-lg text-center">
          <h2 className='mb-4'>Favorite Category: {user?.category}</h2>
          <h2>Favorite meals of {user?.name}:</h2>
        </div>
        <div className='grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-8'>
          {user && user.savedRecipes?.length > 0 ? (
            recipeDetails.map((recipe) => (
              <div className='flex items-center bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300' key={recipe.idMeal}>
                <Link href={`/recipe/${recipe.idMeal}`}>
                  <h3 className='mb-2 text-center text-black'>{recipe.strMeal}</h3>
                  <img className='rounded-lg border border-[#7f7575]' src={recipe.strMealThumb} alt={recipe.strMeal} height="auto" width="100%" />
                </Link>
              </div>
            ))
          ) : (
            <p>No saved favorites yet</p>
          )}
        </div>
      </section>
    )
}

export default ProfilePage