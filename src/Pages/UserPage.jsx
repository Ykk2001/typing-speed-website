import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import DatevsWpmGraph from "../Components/DatevsWpmGraph";
import UserInfo from "../Components/UserInfo";
import Footer from "../Components/Footer";

export default function UserPage() {
  const [data, setData] = useState([]); //array of object
  const [graphData, setGraphData] = useState(); //storing the one object consist of two array
  const [user, loading] = useAuthState(auth); //loading becomes false ONLY after Firebase completes authentication check //useAuthState return array with 3 values user,loading,error
  const[dataLoading,setDataLoading]=useState(true);

  console.log("user", user, "Loading State", loading);
  const navigate = useNavigate();

  async function fetchUserData() {
    if (!user) {
      return; //if user is not logged in then return it
    }

    const resultsRef = collection(db, "Results"); //creates a reference to the "Results" collection in Firestore so you can perform operations like fetch, add, or query data.

    const q = query(resultsRef, where("userId", "==", user.uid)); //Function used to build a query  q is a query object this will fetch the document of the user who has logged in now

    const snapshot = await getDocs(q);

    const sortedDocs = snapshot.docs.sort(
      (a, b) => a.data().Timestamp.seconds - b.data().Timestamp.seconds,
    ); //sort document according to time
    //     Timestamp = {
    //   seconds: 1712256810,
    //   nanoseconds: 123000000
    // }  in fireStore Timestamps store in seconds

    console.log("Snapshot", snapshot);

    let tempData = []; //array of document in an object format
    let labels = [];
    let wpmData = [];

    sortedDocs.forEach((doc) => {
      tempData.push({ id: doc.id, ...doc.data() });
      labels.push(doc.data().Timestamp.toDate().toLocaleString());
      wpmData.push(doc.data().wpm);
      // console.log("Document", doc.data());
    });

    setData(tempData);
    setGraphData({ labels, wpmData }); //labels is the array of timestamps(Date is on x axis) and wpmData is the Array of wpm (on Y Axis)
    setDataLoading(false);
    // console.log("tempData", tempData);
  } //fetchUserData

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
      return;
    } //if user is not logged In and user is on user page then naviagete to home page  //after the loading if user is not present then naviagte

    if (!loading && user) {
      fetchUserData();
    } //if loading is done and user is logged in then fetch the data from the firestore
  }, [loading, user]); //when loading state and user state will get changed then above function will get executed

  if (loading || dataLoading) {
    return (
      <div className="center-of-screen">
        <CircularProgress enableTrackSlot size={200}/>;
      </div>
    );
  }

  return (
    <div className="canvas">
      {user && <UserInfo TotalTestsTaken={data.length} />}

      <div className="graph-user-page">
        {graphData && (
          <DatevsWpmGraph
            graphLabels={graphData.labels}
            graphData={graphData.wpmData}
          />
        )}
      </div>

      <TableUserData data={data} />

      <Footer/>
    </div>
  );
}
