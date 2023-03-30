import React, { useEffect } from "react";

import styled from "styled-components";
import logo from '../assets/images/logo.jpg'

export default function Login() {
  
  const handleClick = async () => {
    const client_id = 'eb3a6109471f4ea799215a3e0a7e7a59';
    const redirect_uri = "http://localhost:5173";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
      "streaming",
      'user-library-read',
      'user-library-modify'
    ];
    // window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
    //   " "
    // )}&response_type=token&show_dialog=true`;
    const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=4f2906a5d36046439e8ae23a23f6acc9&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

    
  window.location.href = AUTH_URL;
  };


  return (
    <Container>
      <img
        src={logo}
        alt="spotify"
      />
      <button onClick={handleClick}>Connect ChillCorner</button>
      
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 658px;
  width: 100%;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 50vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
