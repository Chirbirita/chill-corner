import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { useContext } from 'react'
import BGContext from './BGContext'
import SecondsContext from './SecondsContext';

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
  const [seconds, _] = useContext(SecondsContext);

  return (
    <div
      className=" mx-auto mt-7 rounded-md bg-[rgb(187,220,163,0.6)] p-10 text-center"
      style={{ width: '50%', fontSize: '2.3rem' }}
    >
      {seconds}
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
  const [background, _] = useContext(BGContext)
  const choosenBg = background === null ? 'bg-whtie' : background
  return (
    <>
      <div
        style={{ backgroundImage: `url(${choosenBg})` }}
        className="glass my-auto h-5/6 w-full rounded-lg bg-center bg-cover"
      >
        {/* <Navbar /> */}
        <MusicPlayer />
        <Timer />
        <NoteForm />
      </div>
    </>
  );
};
export default MainBody;