import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";
import useAuth from "./useAuth"
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
  clientId: "4f2906a5d36046439e8ae23a23f6acc9",
})

export default function Body({ headerBackground }) {

  const [{ token, code, song, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();
  const accessToken = useAuth(code)
  const [currentSong, setCurrentSong] = useState();
  
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }
        }
      )


      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),

      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    }
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  //get play list by mood  
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
   //sp test
   spotifyApi.searchPlaylists('chill')
   .then(res => res.body.playlists)
   .then(response => {
       console.log("searchPlaylists response")
       console.log(response)
       const selectedPlaylist = {
        id: 1,
        name: "test",
        description: "desc",
        tracks: response.items
        // image: "test",
        // tracks: response.playlists.items.map(({ track }) => ({
        //   id: 2,
        //   name: "track.name",
        //   artists: "test",
        //   image: "img ",
        //   duration: "dur",
          //album: track.album.name,
          //context_uri: track.album.uri,
          //track_number: track.track_number,
        // })),

      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
   })
     //sp test ends
 }, [accessToken])

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response)
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
    }
  };
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60000);
    var seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  useEffect(() => {
    if(currentSong!= undefined){
      console.log("song set", currentSong)
      dispatch({ type: reducerCases.SET_SONG, song });
    }    
  }, [dispatch, song]);
  // return (
  //   <Container className="w-[60%] bg-[#ffffff59] mt-16 rounded-lg overflow-scroll">
  //     <div>body selected palylist</div>
  //     {selectedPlaylist && (
  //       <>
  //       <div>play list is available</div>
  //       <div className="list">
  //           <div className="header-row">
  //             <div className="col">
  //               <span>#</span>
  //             </div>
  //             <div className="col">
  //               <span>TITLE</span>
  //             </div>
  //             <div className="col">
  //               <span>ALBUM</span>
  //             </div>
  //             <div className="col">
  //               <span>
  //                 <AiFillClockCircle />
  //               </span>
  //             </div>
  //           </div>
  //           <div className="tracks">
  //             {selectedPlaylist.tracks.map(
  //               (
  //                 {
  //                   id,
  //                   name,
  //                   uri
  //                 },
  //                 index
  //               ) => {
  //                 return (
  //                   <div
  //                     className="row"
  //                     key={index}
  //                     onClick={() =>
  //                       setCurrentSong(uri)
  //                     }
  //                   >
  //                     <div className="col">
  //                       <span>{index + 1}</span>
  //                     </div>
  //                     <div className="col detail">
  //                       <div className="image">
  //                       </div>
  //                       <div className="info">
  //                         <span className="name">{name}</span>
  //                         {/* <span>{artists}</span> */}
  //                       </div>
  //                     </div>
                      
  //                   </div>
  //                 );
  //               }
  //             )}
  //           </div>
            
  //           </div>
  //       </>
  //     )}
  //   </Container>
  // );

  return (
    <Container className="w-[60%] bg-[#ffffff59] mt-16 rounded-lg overflow-scroll">
      {selectedPlaylist && (
        <>
          {/* <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="selected playlist" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div> */}
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={index}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    .image {
      img {
        height: 1rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      gap: 10px;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header-row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 10px 0 0 0;
      color: #000000;
      position: sticky;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      background-color: ${({ headerBackground }) =>
    headerBackground ? "#000000" : "none"};
    }
    .tracks {
      margin: 0 2rem;
      display: flex;
      flex-direction: column;
      margin-bottom: 5rem;
      .row {
        padding: 0.5rem 1rem;
        display: grid;
        grid-template-columns: 0.3fr 3.1fr 2fr 0.1fr;
        &:hover {
          background-color: rgba( 255, 255, 255, 0.75 );
          border-radius: 10px;
        }
        .col {
          display: flex;
          align-items: center;
          color: #000000;
          img {
            height: 40px;
            width: 40px;
          }
        }
        .detail {
          display: flex;
          gap: 1rem;
          .info {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
`;
