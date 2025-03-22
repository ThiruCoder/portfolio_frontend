import React from 'react'
import { Header } from './Header'
import { Body } from './Body'
import HoverCard from './CardHover'
import { Projects } from './Projects'
import Footer from './Footer'


const Home = () => {
    return (
        <>
            <Header />
            <div>
                <Body />
                <HoverCard />
                <Projects />
                <Footer />
            </div>
        </>
    )
}

export default Home