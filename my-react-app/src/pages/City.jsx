import React from 'react'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from "react-spinners/ClipLoader"
import CityCard from '../components/CityCard'

const cityNames = ['New York','London','Paris','Tokyo','Sydney','Berlin','Toronto','Moscow','Beijing','Dubai','Tehran','São Paulo']

const fetchCityNameGeo = async (city) => {
  const response = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${city}`, {
    headers: {'X-Api-Key': 'p7tnhaWIqq542FYPIWv9rg==vIR3eCqrq9ngAJS0'}
  })
  const data = await response.json()
  return data[0]
}

const fetchAllCityNameGeo = async () => {
  const loopCity = cityNames.map((item) => fetchCityNameGeo(item))
  const result = await Promise.all(loopCity)
  return result
}

const City = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cityName'],
    queryFn: fetchAllCityNameGeo
  })
  return (
    <div className='bg-blue-100 p-8 min-h-screen w-full'>
        {isLoading && <div className='flex items-center justify-center gap-4 h-screen'>Data Is Loading!<ClipLoader size={50}/></div>}
        {error && <div className='flex items-center justify-center gap-4 h-screen'>Error: {error.message}</div>}
        <div className='grid grid-cols-4 gap-6'>
        {data && data.map((item, index) => (
            <CityCard data={item} key={index}/>
        ))}
       </div>
      </div>
  )}

export default City