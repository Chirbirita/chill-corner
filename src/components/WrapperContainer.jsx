import SideBar from './SideBar'
import MainBody from './MainBody'



const WrapperContainer = () => {


    return (
        <div className={`h-screen min-h-[90%] w-[90%] max-w-[1300px] m-auto gap-3 flex flex-col md:flex-row md:gap-2 items-center px-2 overflow-scroll`} >
            <SideBar />
            <MainBody />
        </div >
    )
}

export default WrapperContainer