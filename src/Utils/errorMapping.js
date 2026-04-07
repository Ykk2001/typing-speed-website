const errorMapping = {
  "auth/user-not-found": "Please enter a valid email address or signup", //that means if user enter incorrect email address while login or the this email is not stored in firebase
  "auth/wrong-password": "Incorrect credentials", //when user is trying to login and not entering the correct password for particular email then it will give that type of error
  "auth/email-already-in-use": "Email already in use", //when user is trying to signup with already stored email then
  'auth/invalid-email':"Please Enter a valid Email Address",
  'auth/invalid-credential':"Please Enter correct Email or Password",
  "auth/weak-password": "Password must be 6 or more characters long", //if user is trying to signup with their credentials and providing short password
  "auth/unknown": "Please try again later",//when firebase does not know this error
};
export default errorMapping;
