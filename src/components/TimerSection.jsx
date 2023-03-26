import { useState, useRef, useEffect, useContext } from "react"
import useTimer from "./useTimer"
import SecondsContext from "./SecondsContext"

export const TimerSection = () => {
    const [_, setSeconds] = useContext(SecondsContext)
    const [time, setTime] = useState({
        hour: '',
        minutes: '',
    })

    const [displayTime, setDisplayTime] = useState({
        displayHour: 0,
        displayMinutes: 0,
        displaySeconds: 0,
    })

    // const [displayTime] = useTimer(time)

    const [active, setActive] = useState(false)

    const hourRef = useRef()
    const minsRef = useRef()

    useEffect(() => {
        setTimeout(() => {

        })
    })

    const submitTimer = (e) => {
        e.preventDefault()
        setActive(true)
        setTime(prevTime => {
            return {
                hour: '',
                minutes: '',
            }
        })

        // get current time
        const targetTime = new Date()

        // add user's input to current time
        targetTime.setHours(targetTime.getHours() + hourRef.current.value)
        targetTime.setMinutes(targetTime.getMinutes() + minsRef.current.value)


        const countDownTimer = setInterval(() => {
            const now = new Date();
            // current new current time from user's current time
            const timeDifference = targetTime.getTime() - now.getTime();

            // if difference in time is less than 0, end timer
            if (timeDifference < 1) {
                clearInterval(countDownTimer)
            } else {
                setDisplayTime(prevDisplayTime => {
                    return {
                        displayHour: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        displayMinutes: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        displaySeconds: Math.floor((timeDifference % (1000 * 60)) / 1000)
                    }
                })
                setSeconds(Math.floor((timeDifference % (1000 * 60)) / 1000))
            }
        }, 1000)
    }



    // set active when timer exhausts or when user cancels
    const handleTimerChange = (e) => {
        e.preventDefault()

    }

    const activeState = active === true ? 'disable' : '';

    return (
        <div>
            <form onSubmit={submitTimer} className="relative flex flex-col p-2 bg-[#ffffff59] w-full rounded-md items-center">
                <div className="flex flex-row w-full items-center">
                    <label htmlFor="hour" className="w-1/2 relative">Hour
                        <input
                            type="number"
                            name="hour"
                            id="hours-input"
                            value={time.hour}
                            onChange={(e) => {
                                if (e.target.valueAsNumber < 0) {
                                    setTime(prevTime => { return { ...prevTime, hour: 0 } })
                                    return
                                };
                                setTime(prevTime => { return { ...prevTime, hour: e.target.valueAsNumber } })
                            }}
                            disabled={active}
                            ref={hourRef}
                            className="w-[90%] py-1 rounded-sm"
                        />
                    </label>
                    <label htmlFor="minute" className="w-1/2 relative">Minutes
                        <input
                            type="number"
                            name='minutes'
                            id="minute-input"
                            value={time.minutes}
                            onChange={(e) => {
                                if (e.target.valueAsNumber < 0) {
                                    setTime(prevTime => { return { ...prevTime, minutes: 0 } })
                                    return
                                };
                                setTime(prevTime => { return { ...prevTime, minutes: e.target.valueAsNumber } })
                            }}
                            disabled={active}
                            ref={minsRef}
                            max='60'
                            min='0'
                            className="w-[90%] py-1 rounded-sm"
                        />
                    </label>
                </div>
                <button className="block mt-3 bg-white w-1/2 py-1 rounded-md" disabled={active}>Start</button>
            </form>

            <div className="w-full mt-10 flex justify-center">
                {active && <p>{`${displayTime.displayHour} : ${displayTime.displayMinutes} : ${displayTime.displaySeconds}`}</p>}
            </div>
        </div>

    )
}



