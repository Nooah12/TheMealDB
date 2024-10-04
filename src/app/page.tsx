'use client'
import Image from "next/image";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const { user } = useUserContext() as UserContextType // treat this as a specific type! not null?
  const [recipes, setRecipes] = useState<RecipeType | null>(null)

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
    {user && ( // here we get the favorite from category page?
      <section>
        <p>Welcome back {user.name}!</p>
        Your fav category of food is {user.category}
        
        {recipes && recipes.map((meal:RecipeType) => 
        <div key={meal.idMeal}>
          <Link href={`/recipe/${meal.idMeal}`}>
            {meal.strMeal}
            <img src={meal.strMealThumb} height="auto" width="200px"></img>
          </Link>
        </div>)}
      </section>
    )}
    </>
  );
}
