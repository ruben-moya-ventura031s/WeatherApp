import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
  }

  useEffect(() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
    
  }, [])

  useEffect(() => {
    if (coords) {

      const API_key = 'ed17fcd69d345982afdff9432fa36c9f'
      const { lat, lon } = coords

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)

          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(2),
            fahrenheit: ((res.data.main.temp - 273.15) * 9 / 5 + 32).toFixed(2)
          }

          setTemp(obj)
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [coords])

  return (
    <div className='app'>

      {
        isLoading
          ? <h2 className='weather__loading'>
            Loading. . .
          </h2>
          : (
            <WeatherCard
              weather={weather}
              temp={temp}
            />
          )
      }
    </div >
  )
}

export default App