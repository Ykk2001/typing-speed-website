import React, {
  createRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { TestModeContext } from "../Context/TestModeContext.js";
import UpperMenu from "./UpperMenu.jsx";
import { generate } from "random-words";

export default function TypingBox() {
  const inputRef = useRef(null);
  const { testTime, setTestTime } = useContext(TestModeContext);
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntervalId] = useState(null);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]); //wordsSpanRef

  function starTimer() {
    const id = setInterval(timer, 1000);
    setIntervalId(id);

    function timer() {
      setCountDown((prevTime) => {
        if (prevTime === 1) {
          setTestEnd(true);
          clearInterval(id); //when the time is eqal to 1 then it should clear Interval Id
          return 0;
        } //if block

        return prevTime - 1;
      }); //countDown Updater
    } //timer function
  } //startTimer

  const resetTest = () => {
    clearInterval(intervalId); //when testTime Changes from 10s to 60s then it should clear the timer so that is why we are clearing the previes timer
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetWordSpanRefClassname();
    focusInput();
  }; //resetTest

  function resetWordSpanRefClassname() {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).forEach((j) => {
        j.className = "";
      });
    });

    wordsSpanRef[0].current.childNodes[0].className = "current";
  } //resetWordSpanRefClassname

  function handleuserInput(e) {
    if (!testStart) {
      starTimer();
      setTestStart(true);
    } //if test is not started then above if block will run

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;
    console.log("allCureent Char ", allCurrChars);
  } //handleUserInput Function

  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []); //ath the time of component mounting

  return (
    <>
      <UpperMenu countDown={countDown} />

      {testEnd ? (
        <h1>Test Over</h1>
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => {
              return (
                <span className="word" key={index} ref={wordsSpanRef[index]}>
                  {word.split("").map((char, i) => {
                    return <span key={i}>{char}</span>;
                  })}
                </span>
              ); //span
            })}
          </div>
        </div>
      )}
      {/* if test end true then show the text else ahow the typing box to type the text */}

      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={handleuserInput}
      />
    </>
  );
}
