import React, { useContext, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";//create top navigation bar used for header navbar
import Tabs from "@mui/material/Tabs";//we can put multiple tab inside this and control the tab thta is which tab is active
import Tab from "@mui/material/Tab";//represent single tab inside tab
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { ThemeContext } from '../Context/ThemeContext';
import GoogleButton from 'react-google-button';
import { Box } from "@mui/material";
import { signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom";

export default function AccountCircle() {
  const [open, setOpen] = useState(false);
  const[value,setValue]=useState(0);
  const{theme}=useContext(ThemeContext);
  const navigate=useNavigate();

  //authState Hook is used to track the authentication state of firebase 
  const [user]=useAuthState(auth);//while login or logout this will get changed and then component will get rendered (useAuthState Hook is used here)
  console.log("Auth State Changed",user);//user is an auth object when user is login then it will not null and if user logout then it becomes null
  console.log("Auth Object",auth)

  function handleModal() {
    if(user)
    {
     navigate('/user');
    }
    else{
     setOpen(true);
    }
    
  }//when user click the acountCircle Icon and user is logged in then it will navigate to the user page and if user is not logged and user click the accountCircle then modal will get Open

  function handleClose() {
    setOpen(false);
  }//when user click outside the modal then this function will get triggered

  function handleValueChange(e,v)
  {
   setValue(v);
  }
 
  //Sign In With Google 
  const googleProvider=new GoogleAuthProvider();//this creates provider object  instance for login
  function handleGoogleSignIn()
  {
   signInWithPopup(auth,googleProvider).then((res)=>{
    toast.success("Login with Google is Successful..");
   }).catch((err)=>{
       toast.error(errorMapping[err.code] || "Not Able to use Google Authentication")
   })
  }
 
  //Logout Functionality
  function logout()
  {
    auth.signOut().then((res)=>{
      toast.success("Logged Out..")
    }).catch((err)=>{
      toast.error("Not able to Logout..")
    })
    
  }

  return (
    <div>
      <AccountCircleIcon className="circleIcon" onClick={handleModal} />
      {user && <LogoutIcon className="logoutIcon" onClick={logout}/>}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "400px",textAlign:'center' }}>
           <AppBar position="static" style={{backgroundColor:'transparent'}}>
             <Tabs variant="fullWidth" value={value}  onChange={handleValueChange}>
              <Tab label='login' style={{color:theme.color}}></Tab>
              <Tab label='signup' style={{color:theme.color}}></Tab>
             </Tabs>
           </AppBar>

           {value===0 && <LoginForm handleClose={handleClose}/> }
           {value===1 && <SignUpForm handleClose={handleClose}/>}

           <Box>
            <span>OR</span>
            <GoogleButton style={{width:"100%",marginTop:'12px'}} onClick={handleGoogleSignIn}/>
           </Box>

        </div>

      </Modal>
    </div>
  );
}
