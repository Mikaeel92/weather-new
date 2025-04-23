import React from 'react'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from "react-spinners/ClipLoader"
import CityCard from '../components/CityCard'

const cityNames = [
  'New York',
  'London',
  'Paris',
  'Tokyo',
  'Sydney',
  'Berlin',
  'Toronto',
  'Moscow',
  'Beijing',
  'Dubai',
  'Tehran',
  'São Paulo'
]

const city = cityNames.map((item) => item)

const tehtan = 'tehran'

// const fetchGeoWeather = async () => {
// const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m')
// const data = await response.json()
// return data
// }

const fetchCityNameWeather = async () => {
  const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${tehtan}`, {
    headers: {'X-Api-Key': 'p7tnhaWIqq542FYPIWv9rg==vIR3eCqrq9ngAJS0'}
  })
  const data = await response.json()
  return data[0]
}

const City = () => {
//   const { data: , isLoading: , error: } = useQuery({
//     queryKey: ['geoWeather'],
//     queryFn: fetchGeoWeather
//   })
//   console.log(data)

  const { data, isLoading, error } = useQuery({
    queryKey: ['cityName'],
    queryFn: fetchCityNameWeather
  })
  console.log(data)



  return (
    <div className='bg-blue-100 flex flex-col items-center justify-center gap-4 h-screen w-screen'>
        {isLoading && <div className='flex items-center gap-4'>Data Is Loading!<ClipLoader size={50}/></div>}
        {error && <div>Error: {error.message}</div>}
        {/* {data && data.map((item, index) => (
            <CityCard item={item} key={index}/>
        ))} */}
        <CityCard data={data}/>
      </div>
  )
}

export default City