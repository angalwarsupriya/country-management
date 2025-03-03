
import './index.css';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayEmptyView from '../DisplayEmptyView';
import DisplayListOfStates from '../DisplayListOfStates';
import ConfirmationDialog from '../ConfirmationDialog';
const StateList = ({ countries, addStatesToCountries,  editStateName, deleteState }) => {
 
  //dialog states for states
  const [dialogMode, setDialogMode] = useState(false)
  const [dialogMessage, setDialogMessage] = useState('');
  const [mode, setMode] = useState('')
  const [stateId, setStateId] = useState({})
  ///
  const { countryName } = useParams();
  const [stateName, setStateName] = useState('');
  const [newStateName, setNewStateName] = useState('');

  const message = 'There are no states added yet.';

  const currentCountry = countries.find((eachCoun) => (
    eachCoun.countryName.toLowerCase() === countryName.toLowerCase()
  ));

  const handleStateChange = (e) => {
    setStateName(e.target.value);
  };


  const handleStateSubmit = (e) => {
    e.preventDefault();
    addStatesToCountries(stateName, countryName);
    setStateName('');
  };
  
  const onEditState = (index) => {
    setMode('EDIT')
    const newStateNamee = prompt('Enter new State name:');
    if (newStateNamee) {
      setStateId(index)
      setDialogMessage('Are you sure you want to update the State name?');
      setDialogMode(true)
      setNewStateName(newStateNamee)
    }
    
  }
  const handleDialogCancel = () => {
    setDialogMode(false)
  }
  const handleDialogConfirm = () => {
    if (mode === 'EDIT') {
      editStateName(countryName, stateId.id, newStateName)
    }
    else {
      deleteState(countryName, stateId.id)
    }
    setDialogMode(false)
  }
  const onDeleteState = (index) => {
    setMode('DELETE')
    setDialogMessage('Are you sure you want to delete this State?');
    setDialogMode(true)
    setStateId(index)
  }
  const displayResultsBasedOnStatesLength = () => {
    if (!currentCountry || !currentCountry.states || currentCountry.states.length === 0) {
      return <DisplayEmptyView message={message} />;
    } else {
      return <DisplayListOfStates states={currentCountry.states} currentCountry={currentCountry} onDeleteState={onDeleteState} onEditState={onEditState} />;
    }
  };
 
  return (
    <section className='states-bg-con'>
      <div>
      <h2>{countryName} - States</h2>
      <form onSubmit={handleStateSubmit}>
        <input
          type="text"
          name="stateName"
          placeholder="State Name"
          value={stateName}
          onChange={handleStateChange}
          required
        />
        <button type="submit">Add State</button>
      </form>
      </div>
      
      <div className='display-states-con'>
        {displayResultsBasedOnStatesLength()}
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

export default StateList;
