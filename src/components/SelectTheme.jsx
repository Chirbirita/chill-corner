import { useState, useContext } from "react"
import BGContext from './BGContext'

const moodOptions = [{ mood: 'chill', bg_href: "src/assets/images/chill.jpg" }, { mood: 'happy', bg_href: "src/assets/images/happy.jpg" }, { mood: 'sad', bg_href: "src/assets/images/sad.jpg" }, { mood: 'relaxed', bg_href: "src/assets/images/relaxed.jpg" }, { mood: 'random', bg_href: "src/assets/images/random.jpg" }]


const SelectTheme = () => {
    const [theme, setTheme] = useState('')
    const [_, setBackground] = useContext(BGContext)

    // function to change bg and start the new mood playlist
    const startPlaying = (bg_href) => {
        setBackground(bg_href)
    }

    return (
        <div className='bg-[#ffffff59] w-full p-1 rounded- ' >
            <h1 className="mb-3" >
                What is your mood today ?
            </h1>
            <div className="flex flex-row gap-1 flex-wrap">
                {
                    moodOptions.map((mood, index) => (
                        <button className="bg-white px-4 py-1 rounded-md hover:bg-slate-50 focus:bg-slate-500" key={index} onClick={() => { startPlaying(mood.bg_href) }}>{mood.mood}</button>
                    ))
                }
            </div>



        </div >

    )
}

export default SelectTheme
