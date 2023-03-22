import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-light p-4" style={{backgroundColor: "#A1B89B", borderRadius: '8px', display: 'flex', alignItems: 'center'}}>
    <a href="/" className="text-white font-bold ml-4">Home</a>
    <div style={{display: 'flex', alignItems: 'center', marginLeft: '23em'}}>
      <a href="/about" className="text-white ml-12">About</a>
      <a href="/contact" className="text-white ml-4">Contact</a>
      <a href="/placeholder" className="text-white ml-4">Placeholder</a>
    </div>
  </nav>
  );
};

const MainBody = () => {
    return (
        <>
       
        <div className="glass w-full h-5/6 my-auto rounded-lg"
        style={{
            backgroundImage: `url(./images/chill-out_copy.jpeg)`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
          }}>
             <Navbar />
        </div>
        
        </>
    )

}
export default MainBody