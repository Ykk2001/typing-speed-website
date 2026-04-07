import React, { useContext, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { ThemeContext } from "../Context/ThemeContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping.js";
export default function LoginForm({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useContext(ThemeContext);

  function handleSubmit()
  {
    if(!email || !password)
    {
      toast.warn("Enter All details");
      return;
    }
    signInWithEmailAndPassword(auth,email,password).then((res)=>{
      toast.success("Logged In!");
      handleClose()//when user is successfully login then modal should be closed
    }).catch((err)=>{
      console.log(err)
      toast.error(errorMapping[err.code]||"some error occured")
    })
  }//handleSubmit

  return (
    <div style={{ border: "1px solid white" }}>
      <Box
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        p={3}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter Email"
          onChange={(e) => setEmail(e.target.value)} 
          InputLabelProps={{style:{color:theme.color}}}
         
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{style:{color:theme.color}}}
        />
        <Button variant="contained" size="large" sx={{backgroundColor:theme.color}} onClick={handleSubmit}>
          Login
        </Button>
      </Box>
    </div>
  );
}
