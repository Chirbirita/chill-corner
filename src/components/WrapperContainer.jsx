import SideBar from './SideBar'
import MainBody from './MainBody'

const WrapperContainer = () => {
    return (
        <div className='container flex mx-auto h-screen max-w-[70rem] relative bg-[#FFFFFF] rounded-lg px-6 gap-5'>
            <header className='h-[60px]'>

            </header>
            <SideBar />
            <MainBody />
        </div>
    )
}

export default WrapperContainer