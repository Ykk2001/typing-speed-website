import React, { useState } from 'react'
import { TestModeContext } from './TestModeContext.js'
export default function TestModeProvider({children}) {
    const[testTime,setTestTime]=useState(15);
  return (
    <TestModeContext.Provider value={{testTime,setTestTime}}>
       {children}
    </TestModeContext.Provider>
  )
}
