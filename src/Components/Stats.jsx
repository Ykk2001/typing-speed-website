import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig.js";
import { toast } from "react-toastify";
import {collection,addDoc} from 'firebase/firestore';

export default function Stats({
  correctChars,
  inCorrectChars,
  extraChars,
  missedChars,
  totalChars,
  wpm,
  accuracy,
  graphLabels,
  graphData,
  charData,
  wordData,
}) {
   function pushDataToDB() {
    const resultsRef = collection(db,"Results"); //creating collection into the database
    const { uid } = auth.currentUser;
    console.log("userId",auth.currentUser);

     addDoc(resultsRef,{
      wpm: wpm,
      accuracy: accuracy,
      Timestamp: new Date(),
      characters: `${correctChars}/${inCorrectChars}/${missedChars}/${extraChars}`,
      userId: uid,
    }).then((res)=>{
      toast.success("Data Saved To Db..")
    }).catch((err)=>{
      toast.error("Not able to Save Result...")
    })
  }
  
  useEffect(()=>{
    if(!auth.currentUser)
    {
       toast.warning('Login to Save Results..');
       return;
    }
    if(wpm>0)
    {
      pushDataToDB()
    }
  },[wpm])//at starting wpm=0 and later when it changes after completing the test then then this useEffect will again run

  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitle">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}</div>
        <div className="title">Characters</div>
        <div className="subtitle">
          {correctChars}/{inCorrectChars}/{missedChars}/{extraChars}
        </div>
      </div>
      <div className="right-stats">
        {/* Graph goes here */}
        <Graph
          graphLabels={graphLabels}
          graphData={graphData}
          charData={charData}
          wordData={wordData}
        />
      </div>
    </div>
  );
}
