import React, { useState } from 'react';
import SelectTheme from './SelectTheme';

function ButtonsRow({ buttons }) {
  return (
    <div className="my-3 flex justify-center">
      {buttons.map(({ label, onClick }) => (
        <button
          key={label}
          className="mx-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
          onClick={onClick}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function SideBar() {
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
  };

  return (
    <div
      className="glass my-auto h-5/6 w-2/6 rounded-lg pt-5 "
      style={{
        backgroundImage: `url(./images/chill-out_copy.jpeg)`,
        backgroundSize: 'cover',
      }}
    >
      <SelectTheme />
      <ButtonsRow
        buttons={[
          { label: 'Happy', onClick: () => console.log('Button 1 clicked') },
          { label: 'Sad', onClick: () => console.log('Button 2 clicked') },
          { label: 'Relaxed', onClick: () => console.log('Button 3 clicked') },
        ]}
      />
      <ButtonsRow
        buttons={[
          {
            label: 'Rebellious',
            onClick: () => console.log('Button 4 clicked'),
          },
          { label: 'Smart', onClick: () => console.log('Button 5 clicked') },
          {
            label: 'Feeling lucky?',
            onClick: () => console.log('Button 6 clicked'),
          },
        ]}
      />
      <div className="my-8 flex justify-center">
        <label htmlFor="hours-input" className="mx-2">
          Hours:
          <input
            type="number"
            id="hours-input"
            value={hours}
            onChange={handleHoursChange}
            className="input-box mx-2"
          />
        </label>
        <label htmlFor="minutes-input" className="mx-2">
          Minutes:
          <input
            type="number"
            id="minutes-input"
            value={minutes}
            onChange={handleMinutesChange}
            className="input-box mx-2"
          />
        </label>
      </div>
      <div className="my-3 flex justify-center">
        <button
          className="mx-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700"
          onClick={handleStartClick}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default SideBar;
