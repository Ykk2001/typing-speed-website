import { Box, TextField ,Button} from '@mui/material'
import React, { useContext, useState } from 'react'
import { ThemeContext } from '../Context/ThemeContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { toast } from 'react-toastify';
import errorMapping from '../Utils/errorMapping.js';

export default function SignUpForm({handleClose}) {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');
    const {theme}=useContext(ThemeContext);

    function handleSubmit()
    {
      if(!email || !password || !confirmPassword)
      {
        toast.error('Please Enter All details',{
          theme:'dark'
        });
        return;
      }
      if(password!==confirmPassword)
      {
        toast.warn("Please Enter the Correct Password");
        return;
      }
      //creating user 
      createUserWithEmailAndPassword(auth, email,password).then((res)=>{
      toast.success("User is Created");
      handleClose()//when user is created successfully then modal should be closed
     }).catch((err)=>{
      toast.error(errorMapping[err.code]||'some error occured');
     })

    }

    const styleObj={
      input:{style:{color:theme.color}},inputLabel:{style:{color:theme.color}}
    }//style object for textField

   const btnStyle={
    backgroundColor:theme.color,color:theme.background
   }//btn style obj
   
  return (
    <div >
      <Box p={3} style={{display:'flex',flexDirection:'column',gap:'20px'}}>
        <TextField className='formfield' variant='outlined' type='email' label='Enter Email' onChange={(e)=>setEmail(e.target.value)}  slotProps={styleObj}/>
        <TextField className='formfield' variant='outlined' type='password' label='Enter Password' onChange={(e)=>setPassword(e.target.value)} slotProps={styleObj}/>
        <TextField className='formfield' variant='outlined' type='password' label='Enter Confirm password' onChange={(e)=>setConfirmPassword(e.target.value)} slotProps={styleObj}/>
        <Button variant='contained' size='large' style={btnStyle} onClick={handleSubmit}>SignUp</Button>
      </Box>
    </div>
  )
}
