// src/components/DisplayListOfCities.js
import React from 'react';
import './index.css';

const DisplayListOfCities = ({ cities, onEditCity, onDeleteCity }) => {
  console.log(cities, 'kkkkkkkkkkk')
  return (
    <ul className="city-list">
      {cities.map((city, index) => (
        <li key={index} className="city-item">
          {city.cityName}
          <div className="city-actions">
            <button onClick={() => onEditCity(city.id)} className="edit-btn">Edit</button>
            <button onClick={() => onDeleteCity(city.id)} className="delete-btn">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DisplayListOfCities;
