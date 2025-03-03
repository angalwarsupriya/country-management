// src/components/ConfirmationDialog.jsx
import React from 'react';
import './index.css';

const ConfirmationDialog = ({ dialogMode, message, onConfirm, onCancel }) => {
  
  return (
    <div className="confirmation-dialog" style={{display : dialogMode ? '' : 'none'}}>
      <div className="confirmation-dialog-content">
        <p className='dialog-p'>{message}</p>
        <div className="confirmation-dialog-actions">
          <button onClick={onConfirm} className='btn1'>Yes</button>
          <button onClick={onCancel}  className='btn2'>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
