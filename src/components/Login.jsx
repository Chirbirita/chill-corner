import React from "react";
import styled from "styled-components";
import logo from '../assets/images/logo.jpg'

export default function Login() {
  const handleClick = async () => {
<<<<<<< HEAD
    const client_id = "be9041803e9c4b31b255f5745792ceb4"; //"6222cdaf6ce34dcf8b682a6e7dc404a8";
    const redirect_uri = "http://localhost:5173/";
=======
    const client_id = "eb3a6109471f4ea799215a3e0a7e7a59";
    const redirect_uri = "http://localhost:5173";
>>>>>>> b4afdf1f8386123dc6d256dbe17d239c2938fcc7
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
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
