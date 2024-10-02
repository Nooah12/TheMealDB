'use client'

import { RecipeType } from "@/utils/types";
import { useEffect, useState } from "react";

const recipePage = ({params}: {params: {id:string}}) => {
    const {id} = params;
    const [recipe, setRecipe] = useState<RecipeType | null>(null)

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
        {recipe && <div className="flex flex-col">
                <h3 className="mb-4 text-center">{recipe.strMeal}</h3>
                <img className="mb-4 self-center" src={recipe.strMealThumb} height="auto" width="300px"></img>
                <p className="mb-4">{recipe.strInstructions}</p>
                <p>Location: {recipe.strArea}</p>
            </div>}
    </section>
  )
}

export default recipePage