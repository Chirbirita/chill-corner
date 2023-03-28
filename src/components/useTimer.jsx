import { useEffect, useState } from "react"

// function useTimer(userTime) {





//     useEffect(() => {

//         //call setInterval
        
//     }, [])

//     return [displayTime]
// }

// function useTimer() {
//     const [time, setTime] = useState(0);
//     const [active, setActive] = useState(false);
  
//     useEffect(() => {
//       let interval = null;
//       if (active) {
//         interval = setInterval(() => {
//           setTime((prevTime) => prevTime + 1);
//         }, 1000);
//       } else {
//         clearInterval(interval);
//       }
//       return () => clearInterval(interval);
//     }, [active]);
  
//     const handleStart = () => {
//       setActive(true);
//     };
  
//     const handleStop = () => {
//       setActive(false);
//     };
//     return { time, active, handleStart, handleStop };
//}
const useTimer = ({ setActive, setDisplayTime }) => {
    const resetTimer = () => {
      clearInterval(timerRef.current);
      setActive(false);
      setDisplayTime({
        displayHour: 0,
        displayMinutes: 0,
        displaySeconds: 0,
      });
    };
  
    return <button onClick={resetTimer}>Reset Timer</button>;
  };

export default useTimer;