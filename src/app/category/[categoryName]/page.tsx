'use client'
import { RecipeType } from '@/utils/types'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CategoryItemsPage = ({ params }: { params: { categoryName: string } }) => {
  const { categoryName } = params;
  const [categoryItems, setCategoryItems] = useState<RecipeType[]>([]);

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
    <section className=''>
      <h2 className='text-center mt-4 font-semibold text-lg'>Meals of Category: {categoryName}</h2>
      <div className='w-60 m-auto'>
        {categoryItems.map((categoryItem) => (
          <div className='p-4' key={categoryItem.idMeal}>
            <Link href={`/recipe/${categoryItem.idMeal}`}>
              <h3 className='mb-2 text-center'>{categoryItem.strMeal}</h3>
              <img className='rounded-full' src={categoryItem.strMealThumb} height="auto" width="200px"></img>
            </Link>
          </div>
          )
        )}
      </div>
    </section>
  );
};

export default CategoryItemsPage;




  // TOGGLE LIKE BUTTON
/* 'use client'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserContext } from '@/utils/contexts';
import { RecipeType, UserContextType } from '@/utils/types';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const CategoryItemsPage = ({ params }: { params: { categoryName: string } }) => {
  const { categoryName } = params;
  const [categoryItems, setCategoryItems] = useState<RecipeType[]>([]);
  const {user, setUser} = useUserContext() as UserContextType;

  const toggleSaveItem = (id: string) => {
    if (user) {
      const updatedSavedRecipes = user.savedRecipes.includes(id)
        ? user.savedRecipes.filter((recipeId) => recipeId !== id) // remove if already saved
        : [...user.savedRecipes, id]; // add if not saved

      setUser({ ...user, savedRecipes: updatedSavedRecipes });
    }
  };

  useEffect(() => {
    const fetchCategoryMeals = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        setCategoryItems(data.meals);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryMeals();
  }, [categoryName]);

  return (
    <section className="p-4">
      <h2>Meals of Category: {categoryName}</h2>
      <div>
        {categoryItems.map((categoryItem) => (
          <div key={categoryItem.idMeal}>
            <button onClick={() => toggleSaveItem(categoryItem.idMeal)}>
              {/* Toggle heart icon *
              <FontAwesomeIcon className="heart-icon"
                icon={user?.savedRecipes.includes(categoryItem.idMeal) ? solidHeart : regularHeart} /> 
            </button>
            <Link href={`/recipe/${categoryItem.idMeal}`}>
              <h3>{categoryItem.strMeal}</h3>
              <img src={categoryItem.strMealThumb} height="auto" width="200px" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryItemsPage; */
