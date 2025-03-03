// src/components/CityList.js
/*import './index.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayEmptyView from '../DisplayEmptyView';
import DisplayListOfCities from '../DisplayListOfCities';

const CityList = ({ countries, addCitiesToState }) => {
  const { countryName, stateName } = useParams();
  const [cityName, setCityName] = useState('');
  const message = 'There are no cities added yet.';

  const currentCountry = countries.find((eachCountry) =>
    eachCountry.countryName.toLowerCase() === countryName.toLowerCase()
  );

  const currentState = currentCountry?.states?.find((eachState) =>
    eachState.stateName.toLowerCase() === stateName.toLowerCase()
  );

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    addCitiesToState(cityName, countryName, stateName);
    setCityName('');
  };

  const displayResultsBasedOnCitiesLength = () => {
    if (!currentState || !currentState.cities || currentState.cities.length === 0) {
      return <DisplayEmptyView message={message} />;
    } else {
      return <DisplayListOfCities cities={currentState.cities} />;
    }
  };

  return (
    <section className='cities-bg-con'>
      <h1>{stateName} - Cities</h1>
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          name="cityName"
          placeholder="City Name"
          value={cityName}
          onChange={handleCityChange}
          required
        />
        <button type="submit">Add City</button>
      </form>
      <div className='display-cities-con'>
        {displayResultsBasedOnCitiesLength()}
      </div>
    </section>
  );
};

export default CityList;
*/

// src/components/CityList.js
import './index.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayEmptyView from '../DisplayEmptyView';
import DisplayListOfCities from '../DisplayListOfCities';
import ConfirmationDialog from '../ConfirmationDialog';

const CityList = ({ countries, addCitiesToState, editCityName, deleteCity }) => {
  const { countryName, stateName } = useParams();
  
  // Dialog states for cities
  const [dialogMode, setDialogMode] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [mode, setMode] = useState('');
  const [cityId, setCityId] = useState('');
  const [newCityName, setNewCityName] = useState('');
  
  const [cityName, setCityName] = useState('');
  const message = 'There are no cities added yet.';

  const currentCountry = countries.find((eachCountry) =>
    eachCountry.countryName.toLowerCase() === countryName.toLowerCase()
  );

  const currentState = currentCountry?.states?.find((eachState) =>
    eachState.stateName.toLowerCase() === stateName.toLowerCase()
  );

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  const handleCitySubmit = (e) => {
    e.preventDefault();
    addCitiesToState(cityName, countryName, stateName);
    setCityName('');
  };

  const onEditCity = (index) => {
   
    setMode('EDIT');
    const newCityNamee = prompt('Enter new City name:');
    if (newCityNamee) {
      setCityId(index);
      setDialogMessage('Are you sure you want to update the City name?');
      setDialogMode(true);
      setNewCityName(newCityNamee);
    }
  };

  const onDeleteCity = (index) => {
    setMode('DELETE');
    setDialogMessage('Are you sure you want to delete this City?');
    setDialogMode(true);
    setCityId(index);
  };

  const handleDialogCancel = () => {
    setDialogMode(false);
  };

  const handleDialogConfirm = () => {
    if (mode === 'EDIT') {
      editCityName(countryName, stateName, cityId, newCityName);
    } else {
      deleteCity(countryName, stateName, cityId);
    }
    setDialogMode(false);
  };

  const displayResultsBasedOnCitiesLength = () => {
    if (!currentState || !currentState.cities || currentState.cities.length === 0) {
      return <DisplayEmptyView message={message} />;
    } else {
      return <DisplayListOfCities cities={currentState.cities} onEditCity={onEditCity} onDeleteCity={onDeleteCity} />;
    }
  };

  return (
    <section className='cities-bg-con'>
      <h2>{stateName} - Cities</h2>
      <form onSubmit={handleCitySubmit}>
        <input
          type="text"
          name="cityName"
          placeholder="City Name"
          value={cityName}
          onChange={handleCityChange}
          required
        />
        <button type="submit">Add City</button>
      </form>
      <div className='display-cities-con'>
        {displayResultsBasedOnCitiesLength()}
      </div>

      <ConfirmationDialog
        dialogMode={dialogMode}
        message={dialogMessage}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </section>
  );
};

export default CityList;
