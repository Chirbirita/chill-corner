import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import SpotifyPlayer from 'react-spotify-web-playback';


import axios from "axios";
import { reducerCases } from "../utils/Constants";
export default function PlayerControls() {
  const [{ token, selectedPlaylistId }, dispatch] = useStateProvider();

  return (
    <Container>
      <SpotifyPlayer
        styles={{
          activeColor: '#fff',
          bgColor: '#ffffff59',
          color: '#000',
          loaderColor: '#000',
          sliderColor: '#000',
          trackArtistColor: '#000',
          trackNameColor: '#000',
          height: 100,
          loaderSize: '100'
        }}
        token={token}
        uris={[`spotify:playlist:${selectedPlaylistId}`]}
        hideAttribution='true'
        layout="responsive"
      />
    </Container>
  );
}

const Container = styled.div`
margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #000000;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
