import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";




export default function Footer() {
  return (
    <Container>
      {/* <CurrentTrack /> */}
      <PlayerControls />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 70%;
  background-color: #ffffff59;
  border-top: 1px solid #ffffff59;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 1rem;
`;
