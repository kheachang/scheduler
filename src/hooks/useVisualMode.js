import {useState} from "react";

//sets initial argument to mode state 
function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //keep history of transitions
  const [history, setHistory] = useState([initial])

  // take new mode and update mode state with new value
  function transition(newMode, replace = false) {
    if (replace === true) {
      history[history.length-1] = newMode;
    } else {
      history.push(newMode)

    }
    setMode(newMode)

    function back () {
      if (history.length <= 1) {
        return;
      }
      const newHistory = [...history];
      newHistory.pop();
      setMode(newHistory[newHistory.length - 1]);
      setHistory(newHistory)
    }
    
  return {mode, transition, back};
}
}



export {useVisualMode}