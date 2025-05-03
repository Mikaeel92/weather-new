import React, { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from 'react-spinners/ClipLoader'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import useLocalStorage from '../hooks/useLocalStorage'

const Home = () => {
  const inputRef = useRef(null)
  const [city, setCity] = useState(null)
  const [favorite, setFavorite] = useLocalStorage('favorite', [])
  
  const fetchWeather = async ({ queryKey }) => {
    const [_key, city] = queryKey

    const geoResponse = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
      headers: { 'X-Api-Key': 'p7tnhaWIqq542FYPIWv9rg==vIR3eCqrq9ngAJS0' }
    })
    const geoData = await geoResponse.json()
    const location = geoData[0]

    if (!location) throw new Error('City not found')

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m`
    )
    const weatherData = await weatherResponse.json()

    const timeResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m&timezone=auto`
    )
    const timeData = await timeResponse.json()

    return { location, weatherData, timeData }
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['weather', city],
    queryFn: fetchWeather,
    enabled: !!city
  })

  const handleSubmit = () => {
    const input = inputRef.current.value.trim()
    if (input) {
      setCity(input)
      inputRef.current.value = ''
    }
  }

  const handleFavorite = () => {
      if (!data?.location) return
    const isFavorited = favorite.some( item => item.name === data.location.name )
    if(isFavorited) {
      const newList = favorite.filter( item => item.name !== data.location.name)
      setFavorite(newList)
    } else {
      setFavorite([...favorite, data.location])
    }
  }

  return (
    <div className="bg-[url('/weather.jpg')] bg-cover bg-no-repeat h-screen w-screen flex flex-col items-center justify-start p-10">
      <h1 className="font-bold text-4xl mb-4">Weather App</h1>

      <div className="flex mb-6">
        <input
          placeholder="Enter the city name..."
          className="p-2 rounded-md bg-gray-100"
          ref={inputRef}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button className="bg-green-800 text-white rounded-md p-2 ml-2" onClick={handleSubmit}>
          Search
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center gap-4 h-full">
          Data is loading! <ClipLoader size={50} />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center gap-4 h-full text-red-500 font-semibold">
          Error: {error.message}
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="flex item-center justify-center">
          <div className="items-center rounded-2xl shadow-lg p-4 flex flex-col transition hover:scale-105">
            <img
              src={`https://flagcdn.com/w80/${data.location.country.toLowerCase()}.png`}
              alt={`${data.location.name} flag`}
              className="w-10 h-auto rounded-md shadow-sm mb-2"
            />
            <h1 className="font-bold">{data.location.name}</h1>
            {data.timeData?.current?.time ? (
              <p>
                <strong>Local Time: </strong>
                {new Date(data.timeData.current.time).toLocaleTimeString()}
              </p>
            ) : (
              <p>Time data not available</p>
            )}
            {data.weatherData?.hourly?.temperature_2m?.length ? (
              <p>
                <strong>Temperature: </strong>
                {data.weatherData.hourly.temperature_2m[0]}°C
              </p>
            ) : (
              <p>No temperature data</p>
            )}
            <p>
              <strong>Latitude: </strong>
              {data.location.latitude}
            </p>
            <p>
              <strong>Longitude: </strong>
              {data.location.longitude}
            </p>
            <button onClick={handleFavorite} className='text-red-700'>
              { favorite.some( item => item.name === data.location.name ) ? <FaHeart/> : <FaRegHeart/> }
              </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home