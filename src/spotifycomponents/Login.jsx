import React from "react"
import { Container } from "react-bootstrap"
import { useState, useContext } from "react"

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=4f2906a5d36046439e8ae23a23f6acc9&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }} >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login to access Spotify
      </a>
    </Container>
    
  )
}