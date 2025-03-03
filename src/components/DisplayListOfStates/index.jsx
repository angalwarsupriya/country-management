import React from 'react'
import './index.css'
function DisplayListOfStates({ states, onDeleteState, onEditState }) {
  
  return (
    <div className='display-staes-list-con'>
        <ul className='states-display-ul-con'>
          {states.map((state) => (
            <li key={state.id} className='states-list-li-con'>
                <h4>{state.stateName}</h4>
                <div className='btns-row-con'>
                    <button className='update-btnn' onClick={()=> onEditState(state)}>Update</button>
                    <button className='delete-btnn' onClick={()=> onDeleteState(state)}>Delete</button>
                </div>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default DisplayListOfStates
