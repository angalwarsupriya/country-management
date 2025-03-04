// src/App.js

import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import StateList from './components/StateList';
import CityList from './components/CityList';
import {fetchCountries} from './data/countriesData'
import './App.css';
import Header from './components/Header';

//import contriesData from './data/countriesData'
const preData = [
  {id:1, countryName: 'South Georgia', flagURL: 'https://flagcdn.com/48x36/gs.png'},
  {id:2, countryName: 'Grenada', flagURL: 'https://flagcdn.com/48x36/gd.png'},
  {id:3, countryName: 'Switzerland', flagURL: 'https://flagcdn.com/48x36/ch.png'},
  {id:4, countryName: 'Sierra Leone', flagURL: 'https://flagcdn.com/48x36/sl.png'},
  {id:5, countryName: 'Hungary', flagURL: 'https://flagcdn.com/48x36/hu.png'},
  {id:6, countryName: 'Taiwan', flagURL: 'https://flagcdn.com/48x36/tw.png'},
  {id:7, countryName: 'Wallis and Futuna', flagURL: 'https://flagcdn.com/48x36/wf.png'},
  {id:8, countryName: 'Barbados', flagURL: 'https://flagcdn.com/48x36/bb.png'}, 
  {id:9, countryName: 'Pitcairn Islands', flagURL: 'https://flagcdn.com/48x36/pn.png'}, 
  {id:10, countryName: 'Ivory Coast', flagURL: 'https://flagcdn.com/48x36/ci.png'} ,
  {id:11, countryName: 'Tunisia', flagURL: 'https://flagcdn.com/48x36/tn.png'}, 
]

function App() {
  // managing main data by using useState
  const [countries, setCountries] = useState(preData);
  const [countriesData, setCountriesData] = useState([]);

  // useEffect TO get the countries list name with flag urls
  useEffect(() => {
    const getCountriesData = async () => {
      const data = await fetchCountries();
      setCountriesData(data);
    };
    getCountriesData();
  }, []);
  
  // managing countries  logic like ADD, EDIT and DELETE Country
  const deleteCountry = (idName) => {
    const remainingCountriesList = countries.filter((each, index) => (
      index !== idName
    ))
    setCountries(remainingCountriesList)
  }
const editCountryName = (countryId, newCountryName) => {
  console.log(countryId, newCountryName);

  const countryMatchedData = countriesData.find(
    (eachOne) => eachOne.countryName.toLowerCase() === newCountryName.toLowerCase()
  );

  if (!countryMatchedData) {
    console.error('Country not found in the predefined list.');
    return;
  }

  // Update the country list with the new country name and flag URL
  const newUpdatedCountriesList = countries.map((eachCoun) => {
    if (eachCoun.id === countryId) {
      return {
        ...eachCoun,
        countryName: countryMatchedData.countryName,
        flagURL: countryMatchedData.flagURL,
      };
    }
    return eachCoun;
  });

  // Set the updated countries list
  setCountries(newUpdatedCountriesList);
};

  
  // managing states of counties logic like ADD, EDIT and DELETE States
  const addStatesToCountries = (stateName, countryNameId) => {
    const newUpdatedCountriesList = countries.map((eachCountry) => {
      if (eachCountry.countryName.toLowerCase() === countryNameId.toLowerCase()) {
        return {
          ...eachCountry,
          states: eachCountry.states
            ? [...eachCountry.states, { stateName, id: Date.now() }]
            : [{ stateName, id: Date.now() }],
        };
      }
      return eachCountry;
    });
    setCountries(newUpdatedCountriesList);
  };
  
  const editStateName = (countryName, stateId, newStateName) => {
    const updatedCountries = countries.map((country) => {
      if (country.countryName.toLowerCase() === countryName.toLowerCase()) {
        const updatedStates = country.states.map((state) => {
          if (state.id === stateId) {
            return { ...state, stateName: newStateName }; // Update state name
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });
  
    setCountries(updatedCountries);
  };
  

  const deleteState = (countryName, stateId) => {
    const updatedCountries = countries.map((country) => {
      if (country.countryName.toLowerCase() === countryName.toLowerCase()) {
        const updatedStates = country.states.filter((index) => index.id !== stateId);
        return { ...country, states: updatedStates };
      }
      return country;
    });
    setCountries(updatedCountries);
  };
  

  
  // manage cities data and logics like ADD, EDIT and DELETE Cities
  const addCitiesToState = (cityName, countryName, stateName) => {
    const updatedCountries = countries.map((country) => {
      if (country.countryName.toLowerCase() === countryName.toLowerCase()) {
        const updatedStates = country.states.map((state) => {
          if (state.stateName.toLowerCase() === stateName.toLowerCase()) {
            const updatedCities = [...(state.cities || []), { id: Date.now(), cityName }];
            return { ...state, cities: updatedCities };
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });
    setCountries(updatedCountries);
  };

  const editCityName = (countryName, stateName, cityId, newCityName) => {
    console.log(countryName, stateName, cityId, newCityName, ';;;;;;')
    const updatedCountries = countries.map((country) => {
      if (country.countryName.toLowerCase() === countryName.toLowerCase()) {
        const updatedStates = country.states.map((state) => {
          if (state.stateName.toLowerCase() === stateName.toLowerCase()) {
            const updatedCities = state.cities.map((city) => {
              if (city.id === cityId) {
                return { ...city, cityName: newCityName };
              }
              return city;
            });
            return { ...state, cities: updatedCities };
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });
    setCountries(updatedCountries);
  };

  const deleteCity = (countryName, stateName, cityId) => {
    const updatedCountries = countries.map((country) => {
      if (country.countryName.toLowerCase() === countryName.toLowerCase()) {
        const updatedStates = country.states.map((state) => {
          if (state.stateName.toLowerCase() === stateName.toLowerCase()) {
            const updatedCities = state.cities.filter((city) => city.id !== cityId);
            return { ...state, cities: updatedCities };
          }
          return state;
        });
        return { ...country, states: updatedStates };
      }
      return country;
    });

    setCountries(updatedCountries);
  };

  // starting returning UI
  return (
    <Router>
      <Header/>
      <div className="app">
      <h1 className='h1'>Country, State, and  City Management</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CountryList
                  countries={countries}
                  setCountries={setCountries}
                  deleteCountry={deleteCountry} 
                  editCountryName={editCountryName} />
              </>
            }
          />
          <Route path="/country/:countryName/states" element={
            <StateList
              countries={countries}
              addStatesToCountries={addStatesToCountries}
              editStateName={editStateName} 
              deleteState={deleteState}
            />} />
          <Route path="/country/:countryName/state/:stateName" element={
            <CityList
              countries={countries}
              addCitiesToState={addCitiesToState}
              editCityName={editCityName}
              deleteCity={deleteCity} 
            />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
