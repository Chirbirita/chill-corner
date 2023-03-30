import React, { useState } from 'react';
import SelectTheme from './SelectTheme';
import { useStateProvider } from '../utils/StateProvider';
import { TimerSection } from './TimerSection';
import chillCorner from '../assets/images/chill-corner.png'


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
  };

  return (
    <div
      style={{ backgroundImage: `url(${themeBackground})` }}
      className="flex flex-col w-[90%] mx-auto max-w-[300px] lg:max-w-[350px] md:h-5/6 gap-5 relative glass my-auto rounded-lg py-5 justify-center bg-cover px-3"
    >
      
      <div className='flex flex-col gap-4 md:justify-between lg:h-[450px]'>
        {/* <Search/> */}
        <img
          src={chillCorner}
          alt='ChillCorner'
          className='h-15'
        />
        <SelectTheme />
        <TimerSection />
      </div>
    </div>
  );
}

export default SideBar;
