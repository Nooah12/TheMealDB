'use client'
import { CategoryType, UserContextType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/utils/contexts';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoryPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]); // use an array of CategoryType
  const {user, setUser} = useUserContext() as UserContextType;

  const handleClick = (categoryName:string) => {
    if (user)
    setUser({...user, category: categoryName}) // categoryName updates the category-context in UserType
  }

  const getData = async () => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      
      setCategories(data.categories); // Set the array of categories
    } catch (error) {
      console.error('Ops something went wrong');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <h2 className='text-center text-lg md:text-[32px] my-4 md:my-8'>Categories</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 px-8 max-w-screen-2xl m-auto'>
        {categories.map((category: CategoryType) => (
            <div className='bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300' key={category.idCategory}> 
              <div className='flex justify-between'>
                  <h3 className='text-black'>{category.strCategory}</h3>
                  <button onClick={() =>handleClick(category.strCategory)}>
                    <FontAwesomeIcon className="heart-icon text-black"
                      icon={user?.category === category.strCategory ? solidHeart : regularHeart} /> 
                  </button>
                </div>
              <Link href={`/category/${category.strCategory}`}>
                  <img className='rounded-lg' src={category.strCategoryThumb} alt={category.strCategory} height="auto" width="100%" />
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CategoryPage;
