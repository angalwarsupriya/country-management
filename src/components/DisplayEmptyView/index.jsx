import React from 'react'
import './index.css'
function DisplayEmptyView({message}) {
  return (
    <div className='empty-view-bg-con'>
      <img className='no-data-img' src='/images/nodata.jpg' alt='no data'/>
      <p>{message}</p>  
    </div>
  )
}

export default DisplayEmptyView