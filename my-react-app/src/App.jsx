import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import About from './pages/About'
import Footer from './components/Footer'
import City from './pages/City'
import Favorites from './pages/Favorites'

const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/famous-cities" element={<City/>} />
        <Route path="/favorites" element={<Favorites/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  )
}

export default App