import { useState } from "react";

// CUSTOM HOOK FOR SETTING VISUAL MODE //

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]); 

  function transition(nextmode, replace = false) {

    if (replace) {
      setHistory(prev => [...prev.slice(0, prev.length -1), nextmode]); 
    } else {
      setHistory(prev => [...prev, nextmode]); 
    }
  }
  function back() {
    if (history.length - 1 === 0) return;

    setHistory(prev => prev.slice(0, prev.length -1)); 
  }
  return { mode: history[history.length - 1], transition, back };

}