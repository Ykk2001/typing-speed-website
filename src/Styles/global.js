import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 
 *{
  box-sizing:border-box;
}
.header{
    display:flex;
    justify-content:space-between;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
  }

.formfield{
  
}

 body{
  background:${(props) => props.theme.background};
  color:${(props) => props.theme.color};
  margin:0px;
  padding:0px;
  transition:all 3s linear;
 }

 .canvas{
  display:grid;
  min-height:100vh;
  grid-auto-flow:row;
  grid-template-row:auto 1fr auto;
  gap:0.5rem;
  padding:2rem;
  width:100vw;
  text-align:center;
  align-items:center;
 }
  
 .type-box{
 display:block;
 max-width:1000px;
 height:140px;
 margin-left:auto;
 margin-right:auto;
 overflow:hidden;
 }

 .words{
   font-size:32px;
   display:flex;
   flex-wrap:wrap;
   color:${(props) => props.theme.typeBoxText}
 }
 .word{
   margin-right:5px;
   margin:4px;
 }
  
 .hidden-input{
  opacity:0;
  cursor:pointer;
 }
 
 .current{
   animation:blinking 2s infinite;
   border-left:1px solid ;
   animation-timing-function:ease;
 }
 @keyframes blinking{
    0% {border-left-color:white}
    25% {border-left-color:black}
    50% {border-left-color:white}
    75% {border-left-color:black}
    100% {border-left-color:white}
  }
  
  .current-right{
   animation:blinkingRight 2s infinite;
   border-right:1px solid ;
   animation-timing-function:ease;
 }
 @keyframes blinkingRight{
    0% {border-right-color:white}
    25% {border-right-color:black}
    50% {border-right-color:white}
    75% {border-right-color:black}
    100% {border-right-color:white}
  }

  .correct{
    color:green;
  }
  .incorrect{
    color:red;
  }

  .upper-menu{
    display:flex;
    width:1000px;
    margin-left:auto;
    margin-right:auto;
    font-size:1.35rem;
    justify-content:space-between;
    padding:0.5rem;
  }
  .modes{
     display:flex;
     gap:0.4rem;
  }
  .time-mode:hover{
    color:green;
    cursor:pointer;
  }
  
  .footer{
  width:1000px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-left:auto;
  margin-right:auto;
  padding:15px 20px;
  border-top:1px solid ${(props) => props.theme.color};
}
.links{
  display:flex;
  gap:20px;
  
}
.Link{
  color:${(props)=>props.theme.color};
  text-decoration:none;
}
  .stats-box{
  display:flex;
  width:1000px;
  height:auto;
  margin-left:auto;
  margin-right:auto;
  border:1px solid red;
  }

  .left-stats{
    width:30%;
    padding:30px;
    border:1px solid green;
  }
  .right-stats{
      width:70%;
  }
  .title{
    font-size:20px;
    color:${(props) => props.theme.typeBoxText}
  }
  .subtitle{
    font-size:30px;
  }

 .user-profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.theme.background};
  color:${(props) => props.theme.color};
  padding: 20px 30px;
  border-radius: 12px;
  margin: 20px auto;
  width: 85%;
  box-shadow: 0 4px 6px ${(props) => props.theme.color};
}
.user {
  display: flex;
  align-items: center;
  gap: 15px;
}

// Profile icon

.picture {
  background: #2c2c3e;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.picture svg {
  font-size: 40px;
  color: ${(props) => props.theme.color};
}

/* User Info */
.info {
  display: flex;
  flex-direction: column;
}

.email {
  font-size: 18px;
  font-weight: 600;
}

.joined-at {
  font-size: 14px;
  color: ${(props) => props.theme.color};
}

/* Right Section */
.total-tests {
  background: ${(props) => props.theme.color}
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.color};;
}

.graph-user-page {
  width: 85%;
  margin: 20px auto;
  min-height: 300px;
  padding: 20px;
  border-radius: 12px;
  background: ${(props) => props.theme.background};
  box-shadow: 0 4px 10px ;
}
  .table{
   width:85%;
   margin: 20px auto;
   padding: 20px;
   border-radius: 12px;
  background: ${(props) => props.theme.background};
  box-shadow: 0 4px 10px ;
  }

  .center-of-screen{
   display:flex;
   justify-content:center;
   align-items:center;
  height:100vh;
  width:100vw;
  }

`;
//why we are prefering this beacuse this component we can export and use anywhere in application that is why we are using styled-components library
