import React from 'react'
import './index.css'
import { Link } from 'react-router-dom';
function CountryListItemCompo({ countryDetails,onEdit, onDelete }) {

  const { 
    countryName
    , flagURL } = countryDetails;
  return (
    <li className='country-list-li-con'>
      <h2 className='h2'>{countryName}</h2>
      <div className='country-flag-img-con'>
        <img src={flagURL} alt={countryName}/>
      </div>
      
      <div className='btns-row-con'>
        <button className='update-btn' onClick={onEdit}>update</button>
        <button className='delete-btn' onClick={onDelete}>Delete</button>
      </div>
      <Link to={`/country/${countryName}/states`} className='li'>
        manage country
      </Link>
    </li>
  )
}

export default CountryListItemCompo