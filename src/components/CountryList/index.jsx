
import React, { useEffect, useState } from 'react';
import './index.css';

import { fetchCountries } from '../../data/countriesData';
import CountryListItemCompo from '../CountryListCompo';
import ConfirmationDialog from '../ConfirmationDialog';

const CountryList = ({ countries, setCountries ,deleteCountry,editCountryName}) => {
  const [countryName, setCountryName] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  

  const [dialogMode, setDialogMode] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('');
  const [countryId, setCountryId] = useState('')
  const [newCountryName, setNewCountryName] = useState('');
  const [mode, setMode] = useState('')

  useEffect(() => {
    const getCountriesData = async () => {
      const data = await fetchCountries();
      setCountriesData(data);
      console.log(data);
    };
    getCountriesData();
  }, []);
  
  // handling form(adding counties)
  const handleChange = (e) => {
    setCountryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedCountry = countriesData.find(
      (c) => c.countryName.toLowerCase() === countryName.toLowerCase()
    );
    console.log(matchedCountry, 'matchedCountry');

    if (matchedCountry) {
      const newCountry = { ...matchedCountry, id: Date.now() } 
      setCountries([newCountry,...countries]);
    } else {
      alert('Country not found in the predefined list.');
    }
    setCountryName('');
  };
  
  // handling edit and delete methods
  const handleEdit = (index) => {
    setMode('EDIT')
    const newName = prompt('Enter new country name:', countries[index].countryName);
    if (newName) {
      setNewCountryName(newName); // Store the new country name
      setCountryId(index)
      setDialogMessage('Are you sure you want to update the country name?');
      setDialogMode(true)
    }
  };

  const handleDelete = (index) => {
    setMode('DELETE')
    setDialogMessage('Are you sure you want to delete this country?');
    setDialogMode(true)
    setCountryId(index)
  };
  
 // Handling dialog logic
  const handleDialogCancel = () => {
    setDialogMode(false)
  }
  const handleDialogConfirm = () => {
    if (mode === 'EDIT') {
      editCountryName(countryId,newCountryName)
    }
    else {
      deleteCountry(countryId)
    }
    setDialogMode(false)
  }
  // returning that UI
  return (
    <section className="countries-list-bg-con">
      <form onSubmit={handleSubmit} className="add-country-form">
        <input
          type="text"
          name="name"
          placeholder="Country Name"
          value={countryName}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Country</button>
      </form>

      <ul className="contries-display-ul-con">
        {countries.map((countryDetails, index) => (
          <CountryListItemCompo
            key={index}
            countryDetails={countryDetails}
            onEdit={() => handleEdit(countryDetails.id)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </ul>

      <ConfirmationDialog
        dialogMode={dialogMode}
        message={dialogMessage}
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
      />
    </section>
  );
};

export default CountryList;
