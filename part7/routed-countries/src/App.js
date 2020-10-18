import React, { useState, useEffect } from 'react'
import axios from 'axios'


//axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (e) => setValue(e.target.value)

  return { value, type, onChange }
}

const useCountry = () => {

  const search = async (name) => {
    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}`)
    return response.data
  }

  return { search }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height='100' alt={`flag of ${country.name}`} />
    </div>
  )
}

const App = () => {
  const countryName = useField("text")
  const country = useCountry()
  const [list, setList] = useState([])

  const fetch = async (e) => {
    e.preventDefault()
    let data = await country.search(countryName.value)
    setList(data)
  }

  return (
    <div>
      <form>
        <input {...countryName} />
        <button onClick={fetch}>search</button>
      </form>
      {list.map((item, i) => {
        return <Country key={i} country={item} />
      })}
    </div>
  )
}

export default App