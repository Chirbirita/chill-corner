import { useState, useContext } from "react"
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import chill from "src/assets/images/chill.jpg"
import happy from "src/assets/images/happy.jpg"
import sad from "src/assets/images/sad.jpg"
import relaxed from "src/assets/images/relaxed.jpg"
import random from "src/assets/images/random.jpg"

const moodOptions = [{ mood: 'chill', bg_href: chill, id: '3WLDIcG4Cx2UOPy0rbFhQn' }, { mood: 'happy', bg_href: happy, id: "37i9dQZF1EQqFPe2ux3rbj" }, { mood: 'sad', bg_href: sad, id: '37i9dQZF1DWVV27DiNWxkR' }, { mood: 'relaxed', bg_href: relaxed, id: '37i9dQZF1DX2vYju3i0lNX' }, { mood: 'random', bg_href: random, id: "1ak02xRxcy5UjN0TqoaaWw" }]


const SelectTheme = () => {
    const [{ token, selectedPlaylist }, dispatch] = useStateProvider();


    // function to change bg and start the new mood playlist
    const startPlaying = async (bg_href, id) => {

        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${id}`,
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
        dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId: id });
        dispatch({ type: reducerCases.SET_THEME, themeBackground: bg_href });

    }



    return (
        <div className='bg-[#ffffff59] w-full p-2 rounded-lg md:h-30 ' >
            <h1 className="text-center text-sm" >
                What is your mood today ?
            </h1>
            <div className="flex flex-row gap-1 flex-wrap justify-center">
                {
                    moodOptions.map((mood, index) => (
                        <button className="bg-white px-4 py-1 rounded-md hover:bg-slate-50 focus:bg-slate-500 text-sm" key={index} onClick={() => { startPlaying(mood.bg_href, mood.id) }}>{mood.mood}</button>
                    ))
                }
            </div>



        </div >

    )
}

export default SelectTheme
