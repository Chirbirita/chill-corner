import React, { useState } from 'react';
import SelectTheme from './SelectTheme';
import { useStateProvider } from '../utils/StateProvider';
import { TimerSection } from './TimerSection';
import chillCorner from '../assets/images/chill-corner.png';
import Search from './Search';

function SideBar() {
  const [{ themeBackground }, dispatch] = useStateProvider();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleHoursChange = (event) => {
    const value = parseInt(event.target.value);
    if (event.key === 'Backspace') {
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
    if (event.key === 'Backspace') {
      if (value === '' || value.length === 1) {
        setMinutes(0);
      } else {
        setMinutes(parseInt(value.slice(0, -1)));
      }
    } else if (parseInt(value) >= 0 && parseInt(value) <= 59) {
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
      className="glass relative my-auto flex h-5/6 w-2/6 min-w-[300px] flex-col justify-center rounded-lg bg-cover px-3 pt-5"
    >
      <div className="little-glass absolute top-5 w-[92%] rounded-lg">
        <img src={chillCorner} alt="ChillCorner" className="h-20 w-full" />
      </div>
      <div className="flex h-[500px] flex-col justify-between">
        {/* <Search/> */}
        <SelectTheme />
        <TimerSection />
      </div>
    </div>
  );
}

export default SideBar;
