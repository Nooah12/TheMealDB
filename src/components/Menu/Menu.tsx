import Link from 'next/link'
import React from 'react'

const Menu = () => {
  return ( // cant use a-tag with context! Page will reload and we lose everything?
    <nav className='p-4 bg-[#23180D] text-white flex justify-evenly'> 
        <Link href="/">Home</Link> 
        <Link href="/profile">Profile</Link>
        <Link href="/category">Categories</Link>
    </nav>
  )
}

export default Menu