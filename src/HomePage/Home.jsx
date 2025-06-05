import React from 'react'
import { Header } from './Header'
import { Body } from './Body'
import HoverCard from './CardHover'
import { Projects } from './Projects'
import Footer from './Footer'
import { useTheme } from '@mui/material'


const Home = () => {
    const theme = useTheme();
    return (
        <>
            <Header />
            <div style={{ backgroundColor: theme.palette.secondary }}>
                <Body />
                <HoverCard />
                <Projects />
                <Footer />
            </div>
        </>
    )
}

export default Home