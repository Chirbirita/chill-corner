import React from "react";
import styled from "styled-components";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";




export default function Footer() {
  return (
    <div className="h-full w-[95%] relative items-center justify-center rounded-lg ">
      {/* <CurrentTrack /> */}
      <PlayerControls />
    </div>
  );
}