'use client'
import Image from "next/image";
import { useUserContext } from "@/utils/contexts";
import { RecipeType, UserContextType } from "@/utils/types";
import { useEffect, useState } from "react";
import Link from "next/link";

import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user } = useUserContext() as UserContextType // treat this as a specific type! not null?
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  useEffect( () => {
    const fetchRecipes = async () => {
      try {
        if (user) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${user.category}`);
          const data = await response.json();

          const topFiveRecipes = data.meals.slice(0, 10); // get the top 5 recipes
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
          <div className="grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 px-8 max-w-screen-2xl m-auto">
            {user.category.length > 0 ? (
              recipes && recipes.map((meal: RecipeType) => (
                // Card


                <Card key={meal.idMeal} className="flex flex-col justify-between bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{meal.strMeal}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/recipe/${meal.idMeal}`}>
                      <img 
                        className="w-full h-auto object-cover rounded-lg border border-[#7f7575]" 
                        src={meal.strMealThumb} 
                        alt={meal.strMeal} 
                      />
                    </Link>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/recipe/${meal.idMeal}`}>
                      <Button variant="outline" className="bg-orange-300">View Recipe</Button>
                    </Link>
                  </CardFooter>
                </Card>

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




                {/* <div className="flex items-center bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  key={meal.idMeal}>
                  <Link href={`/recipe/${meal.idMeal}`}>
                    <h3 className="mb-2 text-center text-black font-semibold text-lg">{meal.strMeal}</h3>
                    <img className="w-full h-auto object-cover rounded-lg mb-2 border border-[#7f7575]" 
                      src={meal.strMealThumb} alt={meal.strMeal} />
                  </Link>
                </div> */}