import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
function DisplayListOfStates({ states, onDeleteState, currentCountry, onEditState, }) {
  const countryNa = currentCountry.countryName
  const stateNa = states[0].stateName

  console.log(stateNa,'kkk', stateNa)
  return (
    <div className='display-staes-list-con'>
        <ul className='states-display-ul-con'>
          {states.map((state) => (
            <li key={state.id} className='states-list-li-con'>
                <h4 className='h4'>{state.stateName}</h4>
                <div className='btns-row-con'>
                    <button className='update-btn' onClick={()=> onEditState(state)}>Update</button>
                    <button className='delete-btn' onClick={() => onDeleteState(state)}>Delete</button>
                </div>
              <Link className='li' to={`/country/${countryNa}/state/${state.stateName}`}>manage States</Link>
              <Link to='/'>Go Back</Link>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default DisplayListOfStates
