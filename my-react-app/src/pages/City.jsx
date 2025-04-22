import React from 'react'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from "react-spinners/ClipLoader"


const fetchWeather = async () => {
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
const data = await response.json()
return data
}


const City = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['CityWeather'],
    queryFn: fetchWeather
  })
  console.log(data)



  return (
    <div className='bg-blue-100 flex flex-col items-center justify-center gap-4 h-screen w-screen'>
        {isLoading && <div className='flex items-center gap-4'>Data Is Loading!<ClipLoader size={50}/></div>}
        {error && <div>Error: {error.message}</div>}
        {data && <div>
          <p>{data.hourly.time[0]} - {data.hourly.temperature_2m[0]} °C</p>
          </div>}
      </div>
  )
}

export default City