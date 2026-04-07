import React, { useContext, useState } from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { ThemeContext } from "../Context/ThemeContext.js";

export default function Footer() {
   const {theme,setTheme}=useContext(ThemeContext);

  function handleChange(e) {
    console.log('Event while selecting the theme options',e.value);
       setTheme(e.value);
       localStorage.setItem('theme',JSON.stringify(e.value));
  }
  return (
    <div className="footer">
      <div className="links">Links</div>
      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{label:theme.label,value:theme}}
          styles={{
            control:(styles)=>({...styles,backgroundColor:theme.background}),//background color of theme =background color of theme
            menu:(styles)=>({...styles,backgroundColor:theme.background}),//menu background =theme background
            option:(styles,{isFocused})=>{
              return {
                ...styles,backgroundColor:(!isFocused)?theme.backgroundColor:theme.color,
                color:(!isFocused)?theme.color:theme.background,
                cursor:'pointer'
              }
            }//when option is on focus then its background color=text color //when it is focus then color=theme background
          }}
        />
      </div>
    </div>
  );
}
