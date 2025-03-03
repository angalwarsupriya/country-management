// src/components/DisplayListOfCities.js
import React from 'react';
import './index.css';

const DisplayListOfCities = ({ cities, onEditCity, onDeleteCity }) => {
  console.log(cities, 'kkkkkkkkkkk')
  return (
    <ul className="city-list">
      {cities.map((city, index) => (
        <li key={index} className="city-item">
          <h4>{city.cityName}</h4>
          <div className="btns-row-con">
            <button onClick={() => onEditCity(city.id)} className="update-btn">Edit</button>
            <button onClick={() => onDeleteCity(city.id)} className="delete-btn">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DisplayListOfCities;
