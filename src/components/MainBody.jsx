import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

// NavBar
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-light p-4"
      style={{
        backgroundColor: 'rgba(161,184,155,0.75)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <a href="/" className="ml-4 font-bold text-white">
        Home
      </a>
      <div
        style={{ display: 'flex', alignItems: 'center', marginLeft: '23em' }}
      >
        <a href="/about" className="ml-12 text-white">
          About
        </a>
        <a href="/contact" className="ml-4 text-white">
          Contact
        </a>
        <a href="/placeholder" className="ml-4 text-white">
          Placeholder
        </a>
      </div>
    </nav>
  );
};

// Our App name; this can be moved to side bar later if needed
const TextBox = () => {
  return (
    <div
      className="card text-center text-white"
      style={{ width: `18rem`, margin: `50px auto 0` }}
    >
      <div className="card-body">
        <h1
          className="card-title"
          style={{
            fontSize: '2rem',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'italic',
          }}
        >
          A CHILL CORNER
        </h1>
        <p className="card-text" style={{ fontFamily: 'Inter, sans-serif' }}>
          Your space for work
        </p>
      </div>
    </div>
  );
};

// Music player but no particular logic yet
const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    setPlaying(!playing);
  };

  const handlePrevious = () => {
    // TODO: logic for going to the previous song
  };

  const handleNext = () => {
    // TODO: logic for going to the next song
  };

  return (
    <div className="mt-8 flex items-center justify-center">
      <div className="flex gap-6">
        <FaStepBackward
          size={50}
          color="#FFF"
          onClick={handlePrevious}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        {playing ? (
          <FaPause size={70} color="#FFF" onClick={handleClick} />
        ) : (
          <FaPlay size={70} color="#FFF" onClick={handleClick} />
        )}
        <FaStepForward
          size={50}
          color="#FFF"
          onClick={handleNext}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
      </div>
    </div>
  );
};

// Timer countdown
// time will be our prop input but I have no idea if this code works as it's a mix of solutions found in google
const Timer = ({ time }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div
      className=" mx-auto mt-7 rounded-md bg-[rgb(187,220,163,0.6)] p-10 text-center"
      style={{ width: '50%', fontSize: '2.3rem' }}
    >
      {minutes.toString().padStart(2, '0')}:
      {seconds.toString().padStart(2, '0')}
    </div>
  );
};

// User's notes
function NoteForm(props) {
  const [noteText, setNoteText] = useState('');

  const handleChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(noteText);
    setNoteText('');
  };

  return (
    <div
      className=" mx-auto mt-7 rounded-md bg-[rgb(187,220,163,0.6)] p-7 text-center"
      style={{ width: '50%', fontSize: '1.5rem' }}
    >
      <form onSubmit={handleSubmit}>
        <textarea
          className="rounded-md bg-[rgb(211,211,211,0.8)]"
          placeholder="Enter your note here..."
          value={noteText}
          onChange={handleChange}
        />
        <button
          className="rounded-md bg-[rgb(187,220,163,0.6)] p-2"
          type="submit"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

const MainBody = () => {
  return (
    <>
      <div
        className="glass my-auto h-5/6 w-full rounded-lg"
        style={{
          backgroundImage: `url(./images/chill-out_copy.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Navbar />
        <TextBox />
        <MusicPlayer />
        <Timer />
        <NoteForm />
      </div>
    </>
  );
};
export default MainBody;
