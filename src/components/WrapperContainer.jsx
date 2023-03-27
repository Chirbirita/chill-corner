import SideBar from './SideBar'
import MainBody from './MainBody'



const WrapperContainer = ({token}) => {


    return (
        <div className={`container w-screen max-w-[1224px] flex mx-auto h-screen  bg-no-repeat rounded-lg gap-5`} >
            <SideBar />
            <MainBody />
        </div >
    )
}

export default WrapperContainer