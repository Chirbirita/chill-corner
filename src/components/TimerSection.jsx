import { useState, useRef, useEffect, useContext } from 'react';
import useTimer from './useTimer';
//import SecondsContext from './SecondsContext';

export const TimerSection = () => {
  //const [_, setSeconds] = useContext(SecondsContext);
  const [time, setTime] = useState({
    hour: '',
    minutes: '',
  });

  const [displayTime, setDisplayTime] = useState({
    displayHour: 0,
    displayMinutes: 0,
    displaySeconds: 0,
  });

  // const [displayTime] = useTimer(time)

  const [active, setActive] = useState(false);

  const hourRef = useRef();
  const minsRef = useRef();

  useEffect(() => {
    setTimeout(() => {});
  });

  const submitTimer = (e) => {
    e.preventDefault();
    setActive(true);
    setTime({
      hour: hourRef.current.value,
      minutes: minsRef.current.value,
    });

    const targetTime = new Date();

    targetTime.setHours(
      targetTime.getHours() + parseInt(hourRef.current.value)
    );
    targetTime.setMinutes(
      targetTime.getMinutes() + parseInt(minsRef.current.value)
    );

    const countDownTimer = setInterval(() => {
      updateTimer(targetTime, countDownTimer);
    }, 1000);
  };

  const updateTimer = (targetTime, countDownTimer) => {
    const now = new Date();
    const timeDifference = targetTime.getTime() - now.getTime();

    if (timeDifference < 1) {
      clearInterval(countDownTimer);
      setActive(false);
      //setSeconds(0);
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
      //setSeconds(Math.floor((timeDifference % (1000 * 60)) / 1000));
    }

    // const submitTimer = (e) => {
    //     e.preventDefault()
    //     setActive(true)
    //     setTime(prevTime => {
    //         return {
    //             hour: '',
    //             minutes: '',
    //         }
    //     })

    //     // get current time
    //     const targetTime = new Date()

    //     //add user's input to current time
    //     targetTime.setHours(targetTime.getHours() + hourRef.current.value)
    //     //targetTime.setHours(hourRef.current.value)
    //     targetTime.setMinutes(targetTime.getMinutes() + minsRef.current.value)

    //     const countDownTimer = setInterval(() => {
    //         const now = new Date();
    //         // current new current time from user's current time
    //         const timeDifference = targetTime.getTime() - now.getTime();

    //         // if difference in time is less than 0, end timer
    //         if (timeDifference < 1) {
    //             clearInterval(countDownTimer)
    //         } else {
    //             setDisplayTime(prevDisplayTime => {
    //                 return {
    //                     displayHour: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    //                     displayMinutes: Math.floor((timeDifference % (1000 * 60 * 60 )) / (1000 * 60 )),
    //                     displaySeconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
    //                 }
    //             })
    //             setSeconds(Math.floor((timeDifference % (1000 * 60)) / 1000))
    //         }
    //     }, 1000)
    // Get current time
  };

  // set active when timer exhausts or when user cancels
  const handleTimerChange = (e) => {
    e.preventDefault();
  };

  const activeState = active === true ? 'disable' : '';

  return (
    <div>
      <form
        onSubmit={submitTimer}
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
            style={{ marginRight: '80px' }}
            disabled={active}
          >
            Start
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
