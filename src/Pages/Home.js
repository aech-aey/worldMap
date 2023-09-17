import React, { useEffect, useState } from 'react';
import { getAllCountries } from '../Services/api';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import CountryCard from '../Components/CountryCard';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import './Home.css';
import logo from './logo.png';

function Home({ isDarkMode, setIsDarkMode }) {
    const [allCountriesList, setCountriesList] = useState([]);
    const [filteredCountriesList, setFilteredCountriesList] = useState([]);
    const [region, setRegion] = useState('');
    const [countryName, setCountryName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handleCountryNameChange = (event) => {
        setCountryName(event.target.value);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        getAllCountries().then((result) => {
            console.log(result);
            const countries = result.data;
            setCountriesList(countries);
            setFilteredCountriesList(countries);
            setIsLoading(false)
        });
    }, []);

    useEffect(() => {
        console.log('Region or country name changed: ', region, countryName);
        if (region === '' && countryName === '') {
            setFilteredCountriesList(allCountriesList);
        } else {
            let filteredCountries = allCountriesList;
            if (region.length) {
                filteredCountries = filteredCountries.filter((country) => {
                    if (country.region === region) return true;
                    return false;
                });
            }
            if (countryName.length) {
                filteredCountries = filteredCountries.filter((country) => {
                    const lowercaseName = country.name.toLowerCase();
                    if (lowercaseName.includes(countryName.toLowerCase())) return true;
                    return false;
                });
            }
            setFilteredCountriesList(filteredCountries);
        }
    }, [region, allCountriesList, countryName]);
    console.log(allCountriesList)
    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {isLoading ? (
                // Display the loader while data is loading
                <div className="loader">Loading...</div>
            ) : (
                <>
                    <div className={`navbar-container ${isDarkMode ? 'dark-nav' : 'light-nav'}`}>
                        <div className="navbar">
                            <div className="logo">
                                <img src={logo} alt="Logo" style={{ width: "70px" }} />
                            </div>
                            <div className={`search ${isDarkMode ? 'dark-srch' : 'light-srch'}`}>
                                <div className="search-only">
                                    <TextField
                                        id="outlined-basic"
                                        label="Search Name"
                                        className='search-by-name'
                                        variant="outlined"
                                        onChange={handleCountryNameChange}
                                        value={countryName}
                                        InputLabelProps={{
                                            style: { color: isDarkMode ? 'white' : '' }
                                        }}
                                        InputProps={{
                                            style: {
                                                color: isDarkMode ? 'white' : '',
                                                border: isDarkMode ? '1px solid white' : '',
                                            }
                                        }}
                                    />
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-helper-label" sx={{ color: isDarkMode ? 'white' : '' }} >Filter by Region</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={region}
                                            label="Filter by Region"
                                            onChange={handleRegionChange}

                                        >
                                            <MenuItem value={''}>All</MenuItem>
                                            <MenuItem value={'Africa'}>Africa</MenuItem>
                                            <MenuItem value={'Americas'}>Americas</MenuItem>
                                            <MenuItem value={'Asia'}>Asia</MenuItem>
                                            <MenuItem value={'Europe'}>Europe</MenuItem>
                                            <MenuItem value={'Oceania'}>Oceania</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className='dark-controller'>
                                    <div style={{ fontSize: "12px" }}>{isDarkMode ? "Light Mode" : "Dark Mode"}</div>
                                    <FormControlLabel
                                        control={<Switch color="primary" checked={isDarkMode} onChange={toggleDarkMode} sx={{ marginLeft: "20%" }} />}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="country-card-wrapper">
                        {filteredCountriesList.map((country) => (
                            <Link
                                to={`/${country.alpha3Code}`}
                                key={country.alpha3Code}
                                style={{ textDecoration: 'none' }}
                            >
                                <CountryCard
                                    name={country.name}
                                    capital={country.capital}
                                    population={country.population}
                                    flagUrl={country.flags.png}
                                    isDarkMode={isDarkMode}
                                />
                            </Link>

                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;
