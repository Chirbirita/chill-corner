import SideBar from './SideBar'
import MainBody from './MainBody'
import { useStateProvider } from "../utils/StateProvider";



const WrapperContainer = () => {
    const [{ code }, dispatch] = useStateProvider();

    return (
        <div className={`container w-screen max-w-[1224px] flex mx-auto h-screen  bg-no-repeat rounded-lg gap-5`} >
            <SideBar />
            <MainBody />
        </div >
    )
}

export default WrapperContainer