import { useState } from "react"

const SelectTheme = () => {
    const [theme, setTheme] = useState('')

    return (
        <form className=' bg-[#E5E5E5] w-full p-7 rounded-md'>
            <label htmlFor="theme">
                CHOOSE A THEME
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