import { useState, useRef, useEffect } from 'react';
import useTimer from './useTimer';

export const TimerSection = () => {
  const [time, setTime] = useState({
    hour: '',
    minutes: '',
  });

  const [displayTime, setDisplayTime] = useState({
    displayHour: 0,
    displayMinutes: 0,
    displaySeconds: 0,
  });

  const [active, setActive] = useState(false);

  const hourRef = useRef();
  const minsRef = useRef();
  const timerRef = useRef();
  const targetTimeRef = useRef();

  const updateTimer = () => {
    const now = new Date();
    const timeDifference = targetTimeRef.current.getTime() - now.getTime();

    if (timeDifference < 1) {
      clearInterval(timerRef.current);
      setActive(false);
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
    }
  };

  const startTimer = () => {
    const targetTime = new Date();

    targetTime.setHours(
      targetTime.getHours() + parseInt(hourRef.current.value)
    );
    targetTime.setMinutes(
      targetTime.getMinutes() + parseInt(minsRef.current.value)
    );

    targetTimeRef.current = targetTime;
    timerRef.current = setInterval(updateTimer, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setActive(false);
    updateTimer();
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(true);
    setTime({
      hour: hourRef.current.value,
      minutes: minsRef.current.value,
    });
    startTimer();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative flex w-full flex-col items-center rounded-md bg-[#8bc34a] p-1"
      >
        <div className="flex w-full flex-row items-center">
          <label htmlFor="hour" className="relative w-1/2">
            Hour
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
              className="w-[90%] rounded-sm py-1"
            />
          </label>
          <label htmlFor="minute" className="relative w-1/2">
            Minutes
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
              className="w-[90%] rounded-sm py-1"
            />
          </label>
        </div>
        <div className="container relative flex justify-center">
          <button
            className="rounded bg-green-500 py-2 px-4 text-white"
            style={{ marginRight: '10px' }}
            disabled={active}
          >
            Start
          </button>
          {active ? (
            <button
              className="rounded bg-yellow-500 py-2 px-4 text-white"
              onClick={pauseTimer}
            >
              Pause
            </button>
          ) : null}
          <button
            className="rounded bg-red-500 py-2 px-4 text-white"
            onClick={resetTimer}
            disabled={!active}
          >
            Reset
          </button>
        </div>
      </form>
      <div className="mt-1 flex w-full justify-center">
        {active && (
          <p>{`${displayTime.displayHour
            .toString()
            .padStart(2, '0')} : ${displayTime.displayMinutes
            .toString()
            .padStart(2, '0')} : ${displayTime.displaySeconds
            .toString()
            .padStart(2, '0')}`}</p>
        )}
      </div>
    </div>
  );
};
