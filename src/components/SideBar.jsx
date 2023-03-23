import SelectTheme from './SelectTheme'

function SideBar() {
    return (
        
        <div className="glass w-2/6 h-5/6 my-auto rounded-lg pt-5" style={{backgroundImage: `url(./images/chill-out_copy.jpeg)`,backgroundSize: 'cover'}}>
            <SelectTheme />
        </div>
        
    );
}

export default SideBar;
