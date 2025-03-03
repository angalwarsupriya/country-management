// src/App.js

import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import StateList from './components/StateList';
import CityList from './components/CityList';
import {fetchCountries} from './data/countriesData'
import './App.css';

//import contriesData from './data/countriesData'
const preData = [
  {countryName: 'South Georgia', flagURL: 'https://flagcdn.com/48x36/gs.png'},
  {countryName: 'Grenada', flagURL: 'https://flagcdn.com/48x36/gd.png'},
  {countryName: 'Switzerland', flagURL: 'https://flagcdn.com/48x36/ch.png'},
  {countryName: 'Sierra Leone', flagURL: 'https://flagcdn.com/48x36/sl.png'},
  {countryName: 'Hungary', flagURL: 'https://flagcdn.com/48x36/hu.png'},
  {countryName: 'Taiwan', flagURL: 'https://flagcdn.com/48x36/tw.png'},
  {countryName: 'Wallis and Futuna', flagURL: 'https://flagcdn.com/48x36/wf.png'},
  {countryName: 'Barbados', flagURL: 'https://flagcdn.com/48x36/bb.png'}, 
  {countryName: 'Pitcairn Islands', flagURL: 'https://flagcdn.com/48x36/pn.png'}, 
  {countryName: 'Ivory Coast', flagURL: 'https://flagcdn.com/48x36/ci.png'} ,
  {countryName: 'Tunisia', flagURL: 'https://flagcdn.com/48x36/tn.png'}, 
]

function App() {
  const [countries, setCountries] = useState(preData);
  
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      const data = await fetchCountries();
      setCountriesData(data);
    };
    getCountriesData();
  }, []);


  const deleteCountry = (idName) => {
    const remainingCountriesList = countries.filter((each, index) => (
      index !== idName
    ))
    setCountries(remainingCountriesList)
  }
  

  const editCountryName = (countryId,newCountryName) => {
    console.log(countryId, newCountryName)
  
    const countryMatchedData = countriesData.find(
      (eachOne) => eachOne.countryName.toLowerCase() === newCountryName.toLowerCase()
    );
  
    if (!countryMatchedData) {
      console.error('Country not found in the predefined list.');
      return;
    }
  
    // Update the country list with the new country name and flag URL
    const newUpdatedCountriesList = countries.map((eachCoun) => {
      if (eachCoun.countryName.toLowerCase() === newCountryName.toLowerCase()) {
        return {
          ...eachCoun,
          countryName: countryMatchedData.countryName,
          flagURL: countryMatchedData.flagURL,
        };
      }
      return eachCoun;
    });
  
    // Set the updated countries list
    console.log(newUpdatedCountriesList, 'Updated Countries List');
    setCountries(newUpdatedCountriesList);
  }
  return (
    <Router>
      <div className="app">
        <h1 className='h1'>Country Management</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CountryList countries={countries} setCountries={setCountries} deleteCountry={deleteCountry} editCountryName={editCountryName} />
              </>
            }
          />
          <Route path="/country/:countryName" element={<StateList countries={countries} />} />
          <Route path="/country/:countryName/state/:stateName" element={<CityList countries={countries} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
