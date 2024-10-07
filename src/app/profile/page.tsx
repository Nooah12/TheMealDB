'use client'
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from '@/utils/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const profile = () => {
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
        <div className="w-60 m-auto my-4 font-semibold text-lg">
          <h2 className='mb-4'>Favorite Category: {user?.category}</h2>
          <h2>Favorite meals of {user?.name}:</h2>
        </div>
        <div className='w-60 m-auto'>
          {user.savedRecipes.length > 0 ? ( // possible null ?
            recipeDetails.map((recipe) => (
              <div className='p-4' key={recipe.idMeal}>
                <Link href={`/recipe/${recipe.idMeal}`}>
                  <h3 className='mb-2 text-center'>{recipe.strMeal}</h3>
                  <img className='rounded-full' src={recipe.strMealThumb} alt={recipe.strMeal} height="auto" width="200px" />
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

export default profile