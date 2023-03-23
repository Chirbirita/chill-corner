import React, { useState } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

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
        <FaStepBackward size={50} color="#FFF" onClick={handlePrevious} style={{marginTop: 5, marginBottom: 5}}/>
      {playing ? (
        <FaPause size={70} color="#FFF" onClick={handleClick} />
      ) : (
        <FaPlay size={70} color="#FFF" onClick={handleClick} />
      )}
      <FaStepForward size={50} color="#FFF" onClick={handleNext} style={{marginTop: 5, marginBottom: 5}}/>
    </div>
    </div>
  );
};

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
      </div>
    </>
  );
};
export default MainBody;
