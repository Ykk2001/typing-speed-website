import React, { useContext } from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions";
import { ThemeContext } from "../Context/ThemeContext.js";
import { Link } from "react-router-dom";
 import HomeIcon from '@mui/icons-material/Home';
 import PersonIcon from '@mui/icons-material/Person';
 import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleChange(e) {
    console.log("Event while selecting the theme options", e.value);
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value));
  }
  return (
    <div className="footer">

      <div className="links">
        <Link className='Link' to="/"><HomeIcon fontSize="small"/> </Link>
        <Link className='Link' to="/user"><PersonIcon/></Link>
        <a className='Link' href="https://github.com/Ykk2001"><GithubIcon/></a>
        <a className='Link' href="https://www.linkedin.com/in/yogesh-khatake-2a49b7306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
         <LinkedInIcon/>
        </a>
      </div>

      <div className="themeButton">
        <Select
          onChange={handleChange}
          options={themeOptions}
          menuPlacement="top"
          defaultValue={{ label: theme.label, value: theme }}
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: theme.color,
            }), //background color of theme =background color of theme
            menu: (styles) => ({
              ...styles,
              backgroundColor: theme.background,
            }), //menu background =theme background
            option: (styles, { isFocused }) => {
              return {
                ...styles,
                backgroundColor: !isFocused
                  ? theme.backgroundColor
                  : theme.color,
                color: !isFocused ? theme.color : theme.background,
                cursor: "pointer",
              };
            }, //when option is on focus then its background color=text color //when it is focus then color=theme background
          }}
        />
      </div>
    </div>
  );
}
