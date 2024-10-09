import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header className='text-center text-xl p-8 bg-[#23180D]'>
      <div className="container flex justify-center items-center">
        <div className="logo">
          <Link href="/">
            <img src="/logo-mealdb.png" alt="Logo" className="w-auto" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header