'use client'
import Image from "next/image";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { user } = useUserContext() as UserContextType // treat this as a specific type! not null?
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect( () => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`);
          const data = await response.json();

          const topFiveRecipes = data.meals.slice(0, 5); // get the top 5 recipes
          setRecipes(topFiveRecipes);

          console.log(data)
          console.log(data.meals)
        }
      } catch (error) {
        console.log(error)
      }
    } 

    fetchRecipes();
  }, [])

  return (
    <>
      {user && (
        <section>
          <div className="text-center my-4">
            <p className="font-semibold text-lg mb-1">Welcome back {user.name}!</p>
            <p>Your favorite category of food is: <span className="font-bold">{user.category}</span></p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
            {user.category.length > 0 ? (
              recipes && recipes.map((meal: RecipeType) => (
                <div className="flex items-center bg-gray-200 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  key={meal.idMeal}>
                  <Link href={`/recipe/${meal.idMeal}`}>
                    <h3 className="mb-2 text-center text-black font-semibold text-lg">{meal.strMeal}</h3>
                    <img className="w-full h-auto object-cover rounded-lg mb-2" 
                      src={meal.strMealThumb} alt={meal.strMeal} />
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center">There is no saved category, yet!</p>
            )}    
          </div>
        </section>
      )}
    </>
  );
  
}
