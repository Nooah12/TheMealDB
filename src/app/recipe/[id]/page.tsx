'use client'
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const recipePage = ({params}: {params: {id:string}}) => {
    const {id} = params;
    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const {user, setUser} = useUserContext() as UserContextType;

      const handleClick = (id: string) => {
        if (user) {
          const savedRecipes = user.savedRecipes || [];  // Ensure savedRecipes is initialized as an array
          const updatedSavedRecipes = user.savedRecipes.includes(id)
            ? savedRecipes.filter((recipeId) => recipeId !== id) // remove if already saved
            : [...savedRecipes, id]; // add if not saved
    
          setUser({ ...user, savedRecipes: updatedSavedRecipes });
        }
      };


    useEffect( () => {
        const fetchRecipes = async () => {
          try {
            if (id) {
              const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
              const data = await response.json();
    
              console.log(data.meals[0])
              setRecipe(data.meals[0])
            }
          } catch (error) {
            console.log(error)
          }
        } 
    
        fetchRecipes();
      }, [])

    return (
      <section className="p-4">
        <p>hello from recipe page, id number is: {id}</p>
        {recipe && (
          <button onClick={() => handleClick(recipe.idMeal)}>
            <FontAwesomeIcon className="heart-icon"
              icon={user?.savedRecipes.includes(recipe.idMeal) ? solidHeart : regularHeart} />
          </button>
        )}
        {recipe && (
          <div className="flex flex-col">
            <h3 className="mb-4 text-center">{recipe.strMeal}</h3>
            <img className="mb-4 self-center" src={recipe.strMealThumb} height="auto" width="300px" />
            <p className="mb-4">{recipe.strInstructions}</p>
            <p>Location: {recipe.strArea}</p>
          </div>
        )}
      </section>
    );
}

export default recipePage