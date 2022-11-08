import { useState } from "react";

// CUSTOM HOOK FOR SETTING VISUAL MODE //

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); //history is array of all modes

  // const [mode, setHistory] = useState([initial]);

  function transition(nextmode, replace = false) {

    if (replace) {
      // let historyCopy = [...history]; // "first" "second"
      // historyCopy.pop(); // "first" 
      setHistory(prev => [...prev.slice(0, prev.length -1), nextmode]); // "first" "third"   *keep the array!!

    } else {
      setHistory(prev => [...prev, nextmode]); //new mode added to end of array - update history
    }
  }
  function back() {
    if (history.length - 1 === 0) return;
    // let historyCopy = [...history]; //copy of all elements
    // historyCopy.pop(); //remove last element (*cannot mutate original history state*)
    setHistory(prev => prev.slice(0, prev.length -1)); //prev is a reducer fn
  }
  return { mode: history[history.length - 1], transition, back };
  // mode is last el of history array
}

