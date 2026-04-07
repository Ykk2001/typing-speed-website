import React, { useState } from 'react'
import { ThemeContext } from './ThemeContext.js'
import { themeOptions } from '../Utils/themeOptions.js';

export default function ThemeProvider({children}) {
    const defaultTheme=JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value; 
    const[theme,setTheme]=useState( defaultTheme);//here we are passing the 
  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
