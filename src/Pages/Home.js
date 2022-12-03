import React from 'react'
import Welcome from '../Components/Welcome'
import Services from '../Components/Services'
import Patents from '../Components/Patents'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
function Home() {
  return (
    <div>
    <div className="gradient-bg-welcome">
     <Navbar></Navbar>
     <Welcome></Welcome>
     </div>
     <Services/>
     <Patents></Patents>
     <Footer/> 
    </div>
  )
}

export default Home