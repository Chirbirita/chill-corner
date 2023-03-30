import SideBar from './SideBar'
import MainBody from './MainBody'
import { useStateProvider } from "../utils/StateProvider";



const WrapperContainer = () => {
    const [{ code }, dispatch] = useStateProvider();

    return (
        <div className={`h-screen w-[90%] max-w-[1300px] m-auto gap-3 flex flex-col md:flex-row md:gap-2 items-center px-2`} >
            <SideBar />
            <MainBody />
        </div >
    )
}

export default WrapperContainer