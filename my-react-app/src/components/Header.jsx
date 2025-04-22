import React from 'react'
import { NavLink } from 'react-router-dom'
import { TiWeatherPartlySunny } from "react-icons/ti";


const Header = () => {
  return (
    <nav className='flex h-14 bg-gray-800 w-full items-center gap-6 p-2 text-white text-2xl'>
      <NavLink className={({isActive}) => isActive ? 'text-blue-500 flex gap-4 items-center' : 'text-white flex gap-4 items-center'} to='/'><TiWeatherPartlySunny/>Home</NavLink>
      <NavLink className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'} to='/city'>City</NavLink>
      <NavLink className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'} to='/favorites'>Favorites</NavLink>
      <NavLink className={({isActive}) => isActive ? 'text-blue-500' : 'text-white'} to='/about'>About</NavLink>
    </nav>
  )
}

export default Header