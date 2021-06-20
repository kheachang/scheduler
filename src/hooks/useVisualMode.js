import { useState } from "react";

//sets initial argument to mode state
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //keep history of transitions
  const [history, setHistory] = useState([initial]);

  // take new mode and update mode state with new value
  function transition(newMode, replace = false) {
    if (replace === true) {
      // when true, replace current mode
      history[history.length - 1] = newMode;
    } else {
      // add newmode to top of stack
      history.push(newMode);
    }
    setMode(newMode);
  }

  // remove the last item in stack
  function back() {
    if (history.length <= 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  }

  return { mode, transition, back };
}
