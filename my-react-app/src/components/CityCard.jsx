import React from 'react'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from 'react-spinners/ClipLoader'

const CityCard = ({ data }) => {

  const fetchWeather = async () => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&hourly=temperature_2m`)
    const result = await response.json()
    return result
  }
  const { data: weatherData, isLoading, error } = useQuery({
    queryKey: ['weather', data.latitude, data.longitude],
    queryFn: fetchWeather,
    enabled: !!data
  })

  const fetchTime = async () => {
    const response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current=temperature_2m&timezone=auto`)
    const timeZone = await response.json()
    return timeZone
  }
  const { data: timeData } = useQuery({
    queryKey: ['timeZone', data.latitude, data.longitude],
    queryFn: fetchTime,
    enabled: !!data
  })

  if (isLoading) {return (<div 
  className='bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center h-40'><ClipLoader size={30} /></div>)}

  if (error) {return (<div 
  className='bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center h-40 text-red-500'>Error: {error.message}</div>)}

  return (
    <div className='bg-white items-center rounded-2xl shadow-lg p-4 flex flex-col item-center transition hover:scale-105'>
      <img src={`https://flagcdn.com/w80/${data.country.toLowerCase()}.png`}
       alt={`${data.name} flag`}
      className='w-10 h-auto rounded-md shadow-sm mb-2'/>
      <h1>{data.name}</h1>
      {timeData?.current.time ? (
      <p>Local Time: {new Date(timeData.current.time).toLocaleTimeString()}</p>) : <p>Time data not available</p>}
      {weatherData?.hourly?.temperature_2m?.length > 0 ? (<p>Temperature: {weatherData.hourly.temperature_2m[0]}°C</p>) : 
      ( <p>No temperature data</p> )}
      <p>Latitude: {data.latitude}</p>
      <p>Longitude: {data.longitude}</p>
    </div>
  )
}

export default CityCard