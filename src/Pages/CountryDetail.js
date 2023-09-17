import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryDetail } from '../Services/api';
import './CountryDetail.css';

export default function CountryDetail({ isDarkMode }) {
    const { countryCode } = useParams();
    const [detail, setDetail] = useState({});

    useEffect(() => {
        getCountryDetail(countryCode).then(result => {
            setDetail(result.data);
        });
    }, [countryCode]);

    return (
        <div className={`country-detail-wrapper ${isDarkMode ? 'dark-details' : 'light-details'}`}>
            <a href="/">
            <h1 className={`back-button ${isDarkMode ? 'dark-arrow' : 'light-arrow'}`}>
                &larr; 
            </h1>
            </a>
            <div className='country-image'>
                <img src={detail.flags?.png} alt={detail.name} />
            </div>
            <div className='country-info'>
                <div className='country-name'>Name: {detail.name}</div>
                <div>Capital: {detail.capital}</div>
                <div>Population: {detail.population}</div>
                <div>Region: {detail.region} , Subregion: {detail.subregion}</div>
                <div>Timezones: {detail.timezones?.join(', ')}</div>
                <div>Calling Codes: {detail.callingCodes?.join(', ')}</div>
                <div>Borders: {detail.borders?.join(', ')}</div>
                <div>Languages: {detail.languages?.map(lang => lang.name).join(', ')}</div>
                <div>Currencies: {detail.currencies?.map(currency => currency.name).join(', ')}</div>
            </div>
        </div>
    );
}
