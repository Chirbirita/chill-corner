import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"


const spotifyApi = new SpotifyWebApi({
  clientId: "4f2906a5d36046439e8ae23a23f6acc9",
})

export default function Testapi({ code }) {
  const accessToken = useAuth(code) 
  //const songs = useSongs(code) 
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
  }


  // useEffect(() => {
  //    if (!accessToken) return
  //    spotifyApi.setAccessToken(accessToken)
  //   // if (!songs) {
  //   //   console.log("songs no")
  //   //   return
  //   // }
  //   // console.log("songs")

  //   //sp test
  //   spotifyApi.searchPlaylists('workout').then(res => {
  //       console.log("searchPlaylists token : " + accessToken)
  //       console.log(res)
      
  //   })
        

  //     //sp test ends
  // }, [accessToken])


  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return 

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
        console.log(res)
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            //uri: track.uri,
            uri: 'spotify:playlist:37i9dQZF1EIgzSCNweQzPQ',
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])
  

  return(
    <Container >
      <Form.Control
        type="search"
        placeholder="Search song to play"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
       <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      <div>
        <div>{accessToken}</div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>

     
    </Container>
  )
}

 
        