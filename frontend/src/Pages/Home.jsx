import { Hero, Navbar } from "../Components";

import React from 'react'
import Maps from "../Components/Maps";
import Programs from "../Components/Programs";
import Footer from "../Components/Footer";

function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Maps/>
    <Programs/>
    <Footer/>
    </>
  )
}

export default Home
