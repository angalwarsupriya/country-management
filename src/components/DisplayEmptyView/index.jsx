import React from 'react'
import './index.css'
function DisplayEmptyView({message}) {
  return (
    <div className='empty-view-bg-con'>
          <p>{message}</p>  
    </div>
  )
}

export default DisplayEmptyView