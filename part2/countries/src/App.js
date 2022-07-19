import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryList = ({ countries, countryFilter, countriesLoaded }) => {
    let filtered_countries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));
    // console.log(filtered_countries)

    if (filtered_countries.length === 0) {
        return (
            <div>{countriesLoaded ? 'no matching country' : 'loading...'}</div>
        )
    } else if (filtered_countries.length > 10) {
        return (
            <div>Too many matches, specify another filter ({filtered_countries.length})</div>
        )
    } else if (filtered_countries.length > 1) {
        return (
            <>
                {
                    filtered_countries.map((country, index) => {
                        return (
                            <div key={index}>{country.name.common}</div>
                        )
                    })
                }
            </>
        )
    } else if (filtered_countries.length === 1) {
        let single_country = filtered_countries[0];
        return (
            <>
                <h1>{single_country.name.common}</h1>
                <div>capital {single_country.capital}</div>
                <div>area {single_country.area}</div>
                <h3>languages:</h3>
                <ul>
                    {Object.values(single_country.languages).map((lang, i) => <li key={i}>{lang}</li>)}
                </ul>
                <img src={single_country.flags.png} width={180} alt='flag' />
            </>
        )
    }
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [countryFilter, setCountryFilter] = useState('')
    const [countriesLoaded, setCountriesLoaded] = useState(false)

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all').then(resp => {
            setCountries(resp.data)
            setCountriesLoaded(true)
        })
    }, [])

    const handleFilterChange = (event) => {
        setCountryFilter(event.target.value)
    }

    return (
        <>
            <label>find countries <input value={countryFilter} onChange={handleFilterChange} autoFocus /></label>
            <CountryList countries={countries} countryFilter={countryFilter} countriesLoaded={countriesLoaded} />
        </>
    )
}

export default App
