import React, { useState } from 'react';
import SelectTheme from './SelectTheme';
import { useStateProvider } from '../utils/StateProvider';
import { TimerSection } from './TimerSection';
import chillCorner from '../assets/images/chill-corner.png'
import Search from './Search';



function SideBar() {
  const [{ themeBackground }, dispatch] = useStateProvider();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Current issues:
  // - user can input infitine number of 0s
  // - user can type more than 2 digits but the mouse choice is limited to 99
  // - 0 cannot be deleted when using backspace
  const handleHoursChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.key === "Backspace") {
      if (value < 9) {
        setHours(0);
      } else {
        setHours(Math.floor(value / 10));
      }
    } else if (value >= 0) {
      setHours(value % 100);
    } else {
      setHours(0);
    }
  };

  // Current issues:
  // - user can input infitine number of 0s
  // - 0 cannot be deleted when using backspace
  const handleMinutesChange = (event) => {
    const value = event.target.value;
    if (event.key === "Backspace") {
      if (value === "" || value.length === 1) {
        setMinutes(0);
      } else {
        setMinutes(parseInt(value.slice(0, -1)));
      }
    }
    else if (parseInt(value) >= 0 && parseInt(value) <= 59) {
      setMinutes(value);
    } else {
      setMinutes(0);
    }
  };

  const handleStartClick = () => {
    console.log(`Timer will start for ${hours} hours and ${minutes} minutes.`);
    // start timer countdown with specified amount of time
    // text - from - indigo - 500 via - purple - 500 to - pink - 500
  };

  return (
    <div
      style={{ backgroundImage: `url(${themeBackground})` }}
      className="relative glass my-auto h-5/6 w-2/6 rounded-lg pt-5 flex flex-col justify-center bg-cover px-3 min-w-[300px]"
    >
      <div className='absolute top-5 little-glass rounded-lg w-[92%]'>
        <img
          src={chillCorner}
          alt='ChillCorner'
          className='h-20 w-full'
        />
      </div>
      <div className='h-[500px] flex flex-col justify-between'>
        {/* <Search/> */}
        <SelectTheme />
        <TimerSection />
      </div>
    </div>
  );
}

export default SideBar;
