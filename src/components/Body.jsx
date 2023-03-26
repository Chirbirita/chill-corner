import React, { useEffect } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";

export default function Body() {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] =
    useStateProvider();

    useEffect(() => {
      const getInitialPlaylist = async () => {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        )
      }
          
    });
}