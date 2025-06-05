import React, { useEffect, useState } from 'react'
import { Header } from '../HomePage/Header'
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import { Box, CardMedia, Container, Grid, Typography } from '@mui/material';
import Footer from '../HomePage/Footer';
import ProjectsData from './filterBox/projectBox';
import projectPic from '../assets/9796308.jpg'

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState('Board');
    const [showId, setShowId] = useState(null)

    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                await apiIntance.get(`/project/get`)
                    .then((res) => {
                        const data = res.data
                        setProjects(data)
                    })
                    .catch((er) => {
                        console.log(er);
                    })
            } catch (error) {
                console.log('error', error)
            }
        }
        getProjectDetails()
    }, [])

    return (
        <div>
            <div >
                <Header />
                <Container sx={{ pt: 12 }}>
                    <Grid container spacing={2} style={{ width: '100%' }}>
                        <Grid item xs={12} md={6} sx={{ border: 'none' }}>

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', width: '100%', flexDirection: 'column' }}>
                                <Typography sx={{ textAlign: 'start', fontWeight: 800, fontSize: '3.3em' }}>My Development Playground</Typography>
                                <Box>
                                    <Typography>Playful and personal—great if your projects are experimental or creative.</Typography>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{
                                position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                height: '100%', width: '100%', flexDirection: 'column', aspectRatio: '16 / 3'
                            }}>
                                <CardMedia
                                    component={'img'}
                                    alt='project'
                                    src={projectPic}
                                    sx={{
                                        width: 450,
                                        height: 450,
                                        objectFit: 'cover',
                                        mixBlendMode: 'multiply',
                                        borderRadius: 2,
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
                <ProjectsData
                    setRefresh={setRefresh} projects={projects}
                    page={page} setPage={setPage}
                    setShowId={setShowId} showId={showId}
                />
                <Footer />
            </div>
        </div>
    )
}

export default Projects