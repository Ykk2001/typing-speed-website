import React, {
  createRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { TestModeContext } from "../Context/TestModeContext.js";
import Stats from "./Stats.jsx";

export default function TypingBox1() {
  const inputRef = useRef(null);
  const prevCorrectRef = useRef(0);
  const { testTime, setTestTime } = useContext(TestModeContext);
  console.log("TestTime", testTime); //accessing the testTime and SetTestTime updater from the conetct
  const [countDown, setCountDown] = useState(testTime); //initial value it will provide 15
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [correctCharAtEachSec, setCorrectCharAtEachSec] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setInCorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [timeGraph, setTimeGraph] = useState([]);
  const [wpmGraph, setWpmGraph] = useState([]);
  const [charGraph, setCharGraph] = useState([]);
  const [wordGraph, setWordGraph] = useState([]);
  const [wordPerMinute, setWordPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [showTypingBox, setShowTypingBox] = useState(true);

  const [wordsArray, setWordsArray] = useState(() => {
    return generate(50);
  });

  //calculating correct characters at each seconds
  function calculateCorrectChars() {
    let correct = 0;
    wordsSpanRef.forEach((word) => {
      if (!word || !word.current || !word.current.childNodes) {
        return;
      }
      Array.from(word.current.childNodes).forEach((char) => {
        if (char.classList.contains("correct")) {
          correct++;
        }
      });
    }); //wordSapnRef
    return correct;
  } //calculateCorrectChars

  function startTimer() {
    const id = setInterval(timer, 1000);

    function timer() {
      //Update Coorect charcter at every seconds
      const correct = calculateCorrectChars(); //here we are retuning the number of  correct character from the word at particular time second and updating with the help of updator function .so already this function will take much time then next functionality will get executed before completing this function that is why we are returning the function because we are saying that dont run the next functionality until this function get executed

      const typedThisSecond = correct - prevCorrectRef.current; //corect=newly correct typed character fetch at this movement
      prevCorrectRef.current = correct;

      //store character tped at each second
      setCharGraph((prev) => [...prev, typedThisSecond]);

      //store word typed at each second
      const wordThisSecond = typedThisSecond / 5; //converted to word
      setWordGraph((prev) => [...prev, wordThisSecond]);

      //store word per minute at each seconds
      const wpm = (typedThisSecond / 5) * 60; //wpm
      setWpmGraph((prev) => [...prev, Math.round(wpm)]);

      setCountDown((prevTime) => {
        //update wpm graph and timeGraph at each second
        const timePased = testTime - prevTime + 1;
        setTimeGraph((prev) => {
          if (prev.includes(timePased)) {
            return prev;
          } else {
            return [...prev, timePased];
          }
        });

        if (prevTime === 1) {
          clearInterval(id);
          setTestEnd(true);

          setTimeout(() => {
            setShowTypingBox(false);
          }, 50); //after ending the test we are hiding the typeBox After the few second so that we can able to fetch the result and are able to show on the UI

          return 0;
        } //if block

        return prevTime - 1;
      });
    }
  }

  function resetTest() {
    setCountDown(testTime);
    setCurrWordIndex(0);
    setCurrCharIndex(0);
    setWordPerMinute(0);
    setShowTypingBox(true);
    setAccuracy(0);
    setTestStart(false);
    setTestEnd(false);
    setWordsArray(generate(50));
    resetWordSpanRefClassName();
    focusInput();
    setTimeGraph([]);
    setWpmGraph([]);
    setCharGraph([]);
    setWordGraph([]);
    prevCorrectRef.current = 0;
  }

  function handleUserInput(e) {
    if (!testStart) {
      startTimer();
      setTestStart(true);
    } ////if test is not started then above if block will run

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes; //here we will get array of span characters (characters from the one word)

    if (e.key === " ") {
      //logic for space after completing the whole single word

      //remove cursor from the last place of word(cursor is in place last letter of the word )
      if (allCurrChars.length <= currCharIndex) {
        allCurrChars[allCurrChars.length - 1].classList.remove("current-right");
      } else {
        //if cursor is in between the word and and you have enter the space btn  then remove the class current
        allCurrChars[currCharIndex].classList.remove("current");
      }

      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current"; //after removing the cursor from the previous word now we are putting the cursor before the next word

      setCurrWordIndex((prev) => prev + 1);
      setCurrCharIndex(0);
      return;
    }

    //when you are presing the backspace btn
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } //when you are removing the extra added character from the word
          else {
            allCurrChars[currCharIndex - 1].className = "current"; //removing the corrct and incorrect classname
          } //when you are coming to the previus character and wanto remove the correct and incorrect character

          setCurrCharIndex(currCharIndex - 1);
          return;
        } //when you re at the end of the word and precing back space

        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
        return; //if you are in the middle of the word and precing the back space
      }
    } // code foe backspace key

    //when you are adding the letters after end of the word and not going to the next word then below edge case(adding the word at the end of the word)
    if (allCurrChars.length === currCharIndex) {
      const newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right"; //class added to the newSpan
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      return;
    }

    //if the typing user  character matches with random word character then correct classname will be added else incorrect className will be Added
    if (
      e.key === allCurrChars[currCharIndex].innerText
    ) //comparing user text and random word text from the screen
    {
      //correct user input
      allCurrChars[currCharIndex].className = "correct";
    } else {
      //incorrect user input
      allCurrChars[currCharIndex].className = "incorrect";
    }

    if (currCharIndex === allCurrChars.length - 1) {
      allCurrChars[currCharIndex].className += " current-right"; //if user come to the last character of the word then cursor should go right side of that word
    } else {
      allCurrChars[currCharIndex + 1].className = "current"; //if user type the char then blinking cursor aplly to the next character (left border)
    }

    setCurrCharIndex((prev) => prev + 1); //increasing the chracter index after typing the character
  } //handleuserInput (whne the user has started to type is user box then this block will get executed)

  function focusInput() {
    inputRef.current.focus();
  } //focusInput

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);
  //here we have put wordsSpanRef[0].current =word0,wordsSpanRef[1].current =word1
  console.log("WordsSpanRef", wordsSpanRef);

  function resetWordSpanRefClassName() {
    wordsSpanRef.map((word) => {
      if (
        word.current
      ) //this condition we have applied beacuse before generating the new random word resetWordSpanRefClassName Run and there random word will not available at that time then there we are checking of word is there then and then you can reset the className
      {
        Array.from(word.current.childNodes).forEach((j) => {
          j.className = ""; //all word className reset to empty
        });
      }
    }); //map
    if (
      wordsSpanRef[0] &&
      wordsSpanRef[0].current &&
      wordsSpanRef[0].current.childNodes[0]
    ) {
      wordsSpanRef[0].current.childNodes[0].className = "current"; //after reseting this className to empty then we are assignning the current classNAme to the first character of the first word
    }
  }

  useEffect(() => {
    if (testEnd === true) {
      let correct = 0;
      let incorrect = 0;
      let extra = 0;
      let missed = 0;
      let totalChar = 0;

      wordsSpanRef.forEach((word) => {
        if (!word || !word.current || !word.current.childNodes) {
          return; //if word is not available then return from here only
        }
        let WordChars = word.current.childNodes.length;
        totalChar = totalChar + WordChars;
        Array.from(word.current.childNodes).forEach((char) => {
          if (char.classList.contains("extra")) {
            extra++;
          } else if (char.classList.contains("correct")) {
            correct++;
          } else if (char.classList.contains("incorrect")) {
            incorrect++;
          } else if (char.className === "" || char.className === "current") {
            missed++;
          }
        });
      }); //incorrectChars

      let wpm = correct / 5 / (testTime / 60);
      let accuracy = (correct / (correct + incorrect + extra)) * 100; //percentage
      setCorrectChars(correct);
      setInCorrectChars(incorrect);
      setMissedChars(missed);
      setExtraChars(extra);
      setTotalChars(totalChar);
      setWordPerMinute(Math.round(wpm));
      setAccuracy(accuracy.toFixed(2));

      console.log(
        "Correct:",
        correct,
        "Incorrect:",
        incorrect,
        "extra:",
        extra,
        "Missed:",
        missed,
        "TotalChar",
        totalChar,
      );
      console.log("wpm", wpm, "Accuracy", accuracy);
    }
  }, [testEnd]);

  useEffect(() => {
    focusInput();
    if (
      wordsSpanRef[0] &&
      wordsSpanRef[0].current &&
      wordsSpanRef[0].current.childNodes &&
      wordsSpanRef[0].current.childNodes[0]
    ) {
      wordsSpanRef[0].current.childNodes[0].className = "current"; //blinking cursor is apllied
    } //here we are applying this condition beacuse after test end new word will be generated that takes much time so that id wordd is available then and then only classname willl get apllied
  }, []); //useEffect

  useEffect(() => {
    setCountDown(testTime);
  }, [testTime]); //when testTime will get changed then countDown will get Updated and pass to the UpperMenu Component

  useEffect(() => {
    resetTest();
    if (wordsSpanRef[0].current) {
      wordsSpanRef[0].current.childNodes[0].className = "current"; //after changing testTime cursor should start blinking before the first word
    }
  }, [testTime]); //when testTime changes from 10 to 30s etc then this block will get executed

  return (
    <div>
      <UpperMenu countDown={countDown} />

      {testEnd && (
        <Stats
          wpm={wordPerMinute}
          accuracy={accuracy}
          correctChars={correctChars}
          inCorrectChars={incorrectChars}
          extraChars={extraChars}
          missedChars={missedChars}
          totalChar={totalChars}
          //above this is props is used for calculating average word per minute ,and accuracy
          graphLabels={timeGraph}
          graphData={wpmGraph}
          charData={charGraph}
          wordData={wordGraph}
        />
      )}

      {showTypingBox && (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => {
              return (
                <span className="word" key={index} ref={wordsSpanRef[index]}>
                  {word.split("").map((char, i) => {
                    return <span key={i}>{char}</span>;
                  })}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <input
        type="text"
        className="hidden-input"
        onKeyDown={handleUserInput}
        ref={inputRef}
        disabled={testEnd}
      />
    </div>
  );
}

//React may call this updater function more than once in development (because of React Strict Mode). That is why time gets pushed twice. setCountDown will get  called beacuse of strict mode
//React runs updater again with same prevTime.
//that is why we are getting this [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15]
//State updater functions must be pure

//This means they should only calculate the new state, not do side effects.

//Bad:

// setCountDown((prev)=>{
//    setTimeGraph(...)
//    setWpmGraph(...)
//    return prev-1
// })

// Because React may run it multiple times.
