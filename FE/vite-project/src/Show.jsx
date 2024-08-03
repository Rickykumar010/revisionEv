import axios from 'axios';
import React, { useEffect, useState } from 'react';
export default function Show() {
    const [show, setShow] = useState([]);
    const currencyCode = 'USD';
    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`)
            .then((res) => {
                setShow(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            <h1>Fetch in Front-end</h1>
            <input type="text" placeholder='search.......'/> 
                <ul>
                    {show.map((country) => (
                        <li key={country.cca3}>
                            <img src={country.flags.png}  />
                            <h2>{country.name.common}</h2>
                            <p> {country.capital}</p>
                            <p> {country.region}</p>
                        </li>
                    ))}
                </ul>
             
        </div>
    );
}
