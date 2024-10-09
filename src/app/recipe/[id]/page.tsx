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
      <section className="p-4 md:w-3/4 lg:w-2/3 2xl:w-1/2 m-auto">
        <div className="bg-gray-200 p-4 border border-gray-300 rounded-lg">
        {recipe && (
          <button onClick={() => handleClick(recipe.idMeal)}>
            <FontAwesomeIcon className="heart-icon text-black"
              icon={user?.savedRecipes.includes(recipe.idMeal) ? solidHeart : regularHeart} />
          </button>
        )}
        {recipe && (
          <div className="flex flex-col ">
            <img className="mb-4 self-center rounded-lg border border-[#7f7575]" src={recipe.strMealThumb} height="auto" width="300px" />
            <div className="p-4">
              <h3 className="text-black text-center mb-1 text-lg font-semibold">{recipe.strMeal}</h3>
              <div className="text-black flex justify-evenly">
                <p className="font-thin">{recipe.strArea}</p>
                <p>{recipe.strCategory}</p>
              </div>
              <p className="text-black mt-4">{recipe.strInstructions}</p>
            </div>
          </div>
        )}
        </div>
      </section>
    );
}

export default recipePage