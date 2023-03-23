import { useState } from "react"

const SelectTheme = () => {
    const [theme, setTheme] = useState('')

    return (
        <form className=' bg-[rgb(187,220,163,0.6)] w-full p-7 rounded-md'>
            <label htmlFor="theme">
               <h1 className="ChooseMe mb-3" style={{color: 'white', fontFamily: 'Inter, sans-serif'}}>
                CHOOSE A THEME</h1>
                <select id='theme' value={theme} placeholder="Choose Theme" className="mb-5 block w-60" onChange={(e) => setTheme(e.target.value)}>
                    <option /> {/** this is to add an empty line to the options list */}
                    {/* {THEMES.map((theme) => (
                        <option key={theme}>{theme}</option>
                    ))} */}
                </select>
            </label>

        </form>
       
    )
}

export default SelectTheme