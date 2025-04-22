import React, { useState } from 'react'

const Home = () => {

  const [input, setInput] = useState('')

  return (
    <div className="bg-[url('../public/weather.jpg')] bg-cover bg-no-repeat h-screen w-screen flex items-center justify-center">
    <div className='flex flex-col gap-4'>
    <h1 className='font-bold text-4xl'>Weather App</h1>
    <div className='flex'>
    <input 
    placeholder='Enter the city name...'
    className='p-2 rounded-md bg-gray-100'
    value={input}
    onChange={(e) => setInput(e.target.value) }
    />
    <button className='bg-green-800 text-white rounded-md p-2 ml-2'>Search</button>
    </div>
    </div>
  </div>
  )
}

export default Home