'use client'
import { CategoryType, UserContextType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '@/utils/contexts';

const CategoryPage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]); // use an array of CategoryType
  const {user, setUser} = useUserContext() as UserContextType;

  const handleClick = (categoryName:string) => {
    if (user)
    setUser({...user, category: categoryName}) // categoryName override category from userType
  }

  const getData = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    try {
      const response = await fetch(url);
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
        <div>
          <button onClick={() =>handleClick(category.strCategory)}>Favorite</button>
          <Link href={`/category/${category.strCategory}`} key={category.idCategory}>
              <h3>{category.strCategory}</h3>
              <img src={category.strCategoryThumb} alt={category.strCategory} height="auto" width="200px" />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default CategoryPage;
