import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className='header-bg-con'>
      <Link to='/' className='l'>
        <img src='/images/logo.jpg' className='logo' alt='logo' />
      </Link>
        <button className='sign-btn'>Sign In</button>
    </header>
  )
}

export default Header