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
    <section className=''>
      <h2>Categories</h2>
      {categories.map((category: CategoryType) => (
        <div key={category.idCategory}> 
          <button onClick={() =>handleClick(category.strCategory)}>
            <FontAwesomeIcon className="heart-icon"
              icon={user?.category === category.strCategory ? solidHeart : regularHeart} /> 
          </button>
          <Link href={`/category/${category.strCategory}`}>
              <h3>{category.strCategory}</h3>
              <img src={category.strCategoryThumb} alt={category.strCategory} height="auto" width="200px" />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default CategoryPage;
