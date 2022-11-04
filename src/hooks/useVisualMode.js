import { useState } from "react";

// CUSTOM HOOK FOR SETTING VISUAL MODE //

export default function useVisualMode(initial) {
  //current mode <- refactor: remove mode (redundant) mode is last element of hisory array
  const [history, setHistory] = useState([initial]); //history is array of all modes

  function transition(nextmode, replace = false) {
    
    if (replace) {
      let historyCopy = [...history]; // first second
      historyCopy.pop() // first 
      setHistory([...historyCopy, nextmode]); // first third   *keep the array!!
      
    } else {
      setHistory([...history, nextmode]) //new mode added to end of array - update history
    }
  }
  function back() {
    if (history.length - 1 === 0) return;
      let historyCopy = [...history]; //copy of all elements
      historyCopy.pop() //remove last element (*cannot mutate original history state*)
      setHistory(historyCopy);
      // console.log("historyCopy last index", historyCopy[historyCopy.length-1])
  }
  return { mode: history[history.length - 1], transition, back };  
  // mode is last el of history array
}