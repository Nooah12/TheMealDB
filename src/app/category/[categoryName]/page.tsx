'use client'
import { RecipeType } from '@/utils/types'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CategoryItemsPage = ({ params }: { params: { categoryName: string } }) => {
  const { categoryName } = params;
  const [categoryItems, setCategoryItems] = useState<RecipeType[]>([]); // Initialize as an empty array

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();

        if (data.meals) {
          setCategoryItems(data.meals); // Set the fetched data
        } else {
          console.log('No meals found');
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (categoryName) {
      fetchCategoryMeals();
    }
  }, [categoryName]);

  return (
    <section className='p-4'>
      <h2>Meals of Category: {categoryName}</h2>
      <div>
        {categoryItems.map((categoryItem) => (
          <div key={categoryItem.idMeal}>
            <Link href={`/recipe/${categoryItem.idMeal}`}>
              {categoryItem.strMeal}
              <img src={categoryItem.strMealThumb} height="auto" width="200px"></img>
            </Link>
          </div>
          )
        )}
      </div>
    </section>
  );
};

export default CategoryItemsPage;
