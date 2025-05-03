import React from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { MdDelete } from "react-icons/md";


const Favorites = () => {
  const [favorite, setFavorite] = useLocalStorage('favorite', [])

  const removeCard = (name) => {
    const updated = favorite.filter((item) => item.name !== name)
    setFavorite(updated)
  }

  return (
<div className='bg-blue-100 min-h-screen w-screen p-6'>
  {favorite.length === 0 && <p className="text-center text-lg text-gray-600">No favorites added yet.</p>}

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {favorite.map((item, index) => (
      <div key={index} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition hover:scale-105 hover:shadow-xl">
        <img
          src={`https://flagcdn.com/w80/${item.country.toLowerCase()}.png`}
          alt={`${item.name} flag`}
          className="w-10 h-auto rounded-md shadow-sm mb-2"
        />
        <h1 className="font-bold text-xl mb-2">{item.name}</h1>
        <p><strong>Latitude:</strong> {item.latitude}</p>
        <p><strong>Longitude:</strong> {item.longitude}</p>
        <button onClick={() => removeCard(item.name)} className="mt-4 text-red-600 hover:text-red-800 text-2xl">
          <MdDelete />
        </button>
      </div>
    ))}
  </div>
</div>
  )
}

export default Favorites