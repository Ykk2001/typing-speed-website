import React from 'react'
import AccountCircle from './AccountCircle.jsx'
import KeyboardIcon from '@mui/icons-material/Keyboard';
export default function Header() {
  return (
    <div className='header'>
      <div className="logo">
        <KeyboardIcon/>
      </div>
      <div className="user-icon">
         <AccountCircle/>
      </div>
    </div>
  )
}

//Notes-->1) In header component we placed two component one is Logo and another one is accountCircle