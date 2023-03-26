import React, { useState } from 'react';
import SelectTheme from './SelectTheme';
import { useContext } from 'react'
import BGContext from './BGContext'
import { TimerSection } from './TimerSection';


function SideBar() {
  const [background, _] = useContext(BGContext)
  const choosenBg = background === null ? 'bg-whtie' : background


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
    } else{
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
      style={{ backgroundImage: `url(${choosenBg})` }}
      className="relative glass my-auto h-5/6 w-2/6 rounded-lg pt-5 flex flex-col justify-center bg-cover px-3 min-w-[300px]"
    >
      <div className='absolute top-5 little-glass p-1 rounded-lg hover:transition-all hover:ease-in-out hover:duration-300'>
        <h3 className='text-3xl font-semibold px-2'>Chill Corner</h3>
      </div>
      <div className='h-[400px] flex flex-col justify-between'>
        <SelectTheme />
        <TimerSection />
      </div>
    </div>
  );
}

export default SideBar;
