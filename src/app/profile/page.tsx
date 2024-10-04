'use client'
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from '@/utils/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const profile = () => {
  const {user, setUser} = useUserContext() as UserContextType;
  const [recipeDetails, setRecipeDetails] = useState<RecipeType[]>([]);

  // with Promise.all
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        if (user?.savedRecipes?.length) {
          // Fetch all recipe details for each savedRecipe ID
          const fetchPromises = user.savedRecipes.map(async (idMeal) => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            return data.meals[0]; // Return the recipe details
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





/* useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (user?.savedRecipes?.length) {
        for (const idMeal of user.savedRecipes) {
          try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            const data = await response.json();
            const newRecipe = data.meals[0];

            // Avoid duplicates by checking if the meal is already in recipeDetails
            setRecipeDetails((prevDetails) => {
              if (!prevDetails.some(recipe => recipe.idMeal === newRecipe.idMeal)) {
                return [...prevDetails, newRecipe];
              }
              return prevDetails; // No update if already present
            });
          } catch (error) {
            console.error(`Error fetching recipe with ID ${idMeal}:`, error);
          }
        }
      }
    };

    fetchSavedRecipes();
  }, [user?.savedRecipes]); */

  return (
    <div>
      <h2>Favorite Category: {user?.category}</h2>
      <h2>Favorite meals of: {user?.name}</h2>
     {/*  {user && user.savedRecipes.map(recipe => <p>{recipe}</p>)} */}
     {recipeDetails.map((recipe) => (
      <div key={recipe.idMeal}>
        <h3>{recipe.strMeal}</h3>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} height="auto" width="200px" />
        <Link href={`/recipe/${recipe.idMeal}`}>View Recipe</Link>
      </div>
     ))}
    </div>
  )
}

export default profile