import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

export default function UserInfo({ TotalTestsTaken }) {
  const [user] = useAuthState(auth);
  console.log("userData", user);
  return (
    <div className="user-profile">
      
      <div className="user">
        <div className="picture">
          <AccountCircleIcon />
        </div>
        <div className="info">
          <div className="email">{user.email}</div>
          <div className="joined-at">{user.metadata.creationTime}</div>
        </div>
      </div>

      <div className="total-tests">
        <span>Total Tests Taken-{TotalTestsTaken}</span>
      </div>
    </div>
  );
}
