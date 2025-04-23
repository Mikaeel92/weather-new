import React from 'react'

const CityCard = ({ data }) => {

    if(!data) return null

  return (
    <div>
        <h1>{data.name}</h1>
        <p>{data.latitude}</p>
        <p>{data.longitude}</p>
        <p></p>
    </div>
  )
}

export default CityCard