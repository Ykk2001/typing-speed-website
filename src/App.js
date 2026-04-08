import "./App.css";

import React, { useContext } from "react";
import { GlobalStyles } from "./Styles/global.js";
import { ThemeContext } from "./Context/ThemeContext.js";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import {Routes,Route} from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import UserPage from "./Pages/UserPage.jsx";


export default function App() {
  const { theme } = useContext(ThemeContext); //theme == themeoptions[0].value it is an object

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      {/* Toast where all toast will be placed */}
       <GlobalStyles />
       
       {/* Routes will rendered here below */}
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/user" element={<UserPage/>}/>
       </Routes>

    </ThemeProvider>
  );
}

//here all compnent can access the theme now 

//lecture 26 till 3:00 min 
