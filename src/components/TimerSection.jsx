import { useState, useRef, useEffect } from 'react';
import useTimer from './useTimer';
import Confetti from 'react-confetti';

export const TimerSection = () => {
  const [time, setTime] = useState({
    hour: '0',
    minutes: '0',
  });

  const [displayTime, setDisplayTime] = useState({
    displayHour: 0,
    displayMinutes: 0,
    displaySeconds: 0,
  });

  const [active, setActive] = useState(false);
  const [timerEnded, setTimerEnded] = useState(false); // NEW CONFETTI LINE
  const [showConfetti, setShowConfetti] = useState(false); // NEW CONFETTI LINE
  const [paused, setPaused] = useState(false);

  const hourRef = useRef();
  const minsRef = useRef();
  const timerRef = useRef();
  const targetTimeRef = useRef();
  const remainingTimeRef = useRef(); // new ref to store remaining time left in timer

  const updateTimer = () => {
    const now = new Date();
    let timeDifference;
    if (remainingTimeRef.current) {
      // if remaining time is stored, use it to calculate time difference
      timeDifference = remainingTimeRef.current - now.getTime();
    } else {
      // if remaining time is not stored, calculate time difference from target time
      timeDifference = targetTimeRef.current.getTime() - now.getTime();
    }

    if (timeDifference < 1) {
      clearInterval(timerRef.current);
      setActive(false);
      setTimerEnded(true);
      setShowConfetti(true); // NEW CONFETTI LINE
    } else {
      setDisplayTime((prevDisplayTime) => ({
        displayHour: Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        displayMinutes: Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        ),
        displaySeconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
      }));
      remainingTimeRef.current = now.getTime() + timeDifference; // update remaining time
    }
  };

  const startTimer = () => {
    const now = new Date();
    const targetTime = remainingTimeRef.current
      ? new Date(now.getTime() + remainingTimeRef.current)
      : new Date(
          now.getTime() + time.hour * 60 * 60 * 1000 + time.minutes * 60 * 1000
        );

    targetTimeRef.current = targetTime;
    remainingTimeRef.current = null;

    timerRef.current = setInterval(() => {
      updateTimer();
    }, 1000);
    setActive(true); //new line IS THIS LINE NECESSARY?
    setShowConfetti(false); // NEW CONFETTI LINE
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    remainingTimeRef.current =
      targetTimeRef.current.getTime() - new Date().getTime(); // store remaining time left in timer
    updateTimer();
    setTimerEnded(false);
    setPaused(true);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime({
      hour: '',
      minutes: '',
    });
    setDisplayTime({
      displayHour: 0,
      displayMinutes: 0,
      displaySeconds: 0,
    });
    setActive(false);
    remainingTimeRef.current = null; // reset remaining time when timer is reset
    setTimerEnded(false);
    setShowConfetti(false);
    setPaused(false); // reset the paused state variable
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaused(false); // reset the paused state variable when the timer is started again
    setActive(true);
    setTime({
      hour: hourRef.current.value,
      minutes: minsRef.current.value,
    });
    startTimer();
  };

  return (
    <div>
      <div>
        {timerEnded && showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-col items-center rounded-md bg-[#ffffff59] p-4"
      >
        <p className="text-m mb-2 rounded-md bg-[#ffffff59] bg-opacity-95 p-2 font-bold opacity-75">
          Countdown timer
        </p>
        <div className="flex w-full flex-row items-center">
          <label htmlFor="hour" className="relative w-1/2 px-2">
            Hours:
            <input
              type="number"
              name="hour"
              id="hours-input"
              value={time.hour}
              onChange={(e) => {
                if (e.target.valueAsNumber < 0) {
                  setTime((prevTime) => {
                    return { ...prevTime, hour: 0 };
                  });
                  return;
                }
                setTime((prevTime) => {
                  return { ...prevTime, hour: e.target.valueAsNumber };
                });
              }}
              disabled={active}
              ref={hourRef}
              className="ml-3 w-1/3 rounded-md py-1"
            />
          </label>
          <label htmlFor="minute" className="relative w-1/2 p-1">
            Minutes:
            <input
              type="number"
              name="minutes"
              id="minute-input"
              value={time.minutes}
              onChange={(e) => {
                if (e.target.valueAsNumber < 0) {
                  setTime((prevTime) => {
                    return { ...prevTime, minutes: 0 };
                  });
                  return;
                }
                setTime((prevTime) => {
                  return { ...prevTime, minutes: e.target.valueAsNumber };
                });
              }}
              disabled={active}
              ref={minsRef}
              max="59"
              min="0"
              className="ml-3 w-1/3 rounded-md py-1"
            />
          </label>
        </div>
        <div className="container relative flex justify-center space-x-4">
          <button
            className="rounded bg-white px-4 text-black hover:bg-slate-50 focus:bg-slate-500"
            style={{ marginTop: '10px' }}
            disabled={active}
          >
            Start
          </button>
          {active ? (
            <button
              className="rounded bg-white px-4 text-black hover:bg-slate-50 focus:bg-slate-500"
              style={{ marginTop: '10px' }}
              onClick={pauseTimer}
            >
              Pause
            </button>
          ) : null}
          <button
            className="rounded bg-white py-2 px-4 text-black hover:bg-slate-50 focus:bg-slate-500"
            style={{ marginTop: '10px' }}
            onClick={resetTimer}
            disabled={!time.hour && !time.minutes}
          >
            Reset
          </button>
        </div>
      </form>
      <div className="text-m mt-1 flex w-full justify-center rounded-md bg-[#ffffff59] bg-opacity-95 p-2 font-bold">
        <p>{`${displayTime.displayHour
          .toString()
          .padStart(2, '0')} : ${displayTime.displayMinutes
          .toString()
          .padStart(2, '0')} : ${displayTime.displaySeconds
          .toString()
          .padStart(2, '0')}`}</p>
      </div>
    </div>
  );
};

//<div>{active && (

//)}</div>

