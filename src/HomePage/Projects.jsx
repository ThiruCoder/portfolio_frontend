import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FetchContext } from '../Context';
import axios from 'axios';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';


export const Projects = () => {

    const [projects, setProjects] = useState([]);

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
            },
        },
    };

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
        <Box
            component="section"
            sx={{
                py: 8,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ position: 'relative', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    <Typography
                        variant="h2"
                        align="center"
                        gutterBottom
                        component={motion.h2}
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        sx={{ flexGrow: 1 }}
                    >
                        Projects
                    </Typography>
                    <Link to={'/Projects'} style={{ flexGrow: 0, p: 0, height: '100%', backgroundColor: 'transparent', }}>
                        <Typography sx={{ fontSize: 'clamp(12px, 5px, 30px)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.4 }}>
                            View Projects <MoveRight />
                        </Typography>
                    </Link>
                </Box>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {projects && projects.length > 0 ? projects.map((project, index) => (
                            <Grid item xs={6} md={4} sm={6} key={index}>
                                <motion.div variants={itemVariants}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: 'transform 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-8px)',
                                            },
                                        }}
                                    >

                                        <Box sx={{ aspectRatio: '5/3', maxWidth: '100%', height: 'auto', objectFit: 'cover', backgroundPosition: 'center' }}>
                                            <a href={project?.url}>
                                                <CardMedia
                                                    component="img"
                                                    height="100%"
                                                    width='100%'
                                                    image={project.image.url}
                                                    alt={project.title}
                                                />
                                            </a>
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom sx={{
                                                overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', textOrientation: 'initial', whiteSpace: 'nowrap', width: '100%',
                                                fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                                                fontWeight: 600
                                            }}>
                                                {project.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{
                                                textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', overflow: 'hidden',
                                                fontSize: 'clamp(0.8rem, 1vw, 1rem)',
                                            }} paragraph>
                                                {project.description}
                                            </Typography>
                                            <Box sx={{
                                                flexWrap: 'wrap',
                                                color: 'white',
                                                borderRadius: '16px',
                                                maxWidth: 1000,
                                                fontSize: 12,
                                                lineHeight: 1.4,
                                                display: 'flex',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                WebkitLineClamp: 3,
                                                lineClamp: 3,
                                                gap: 'clamp(0.6px, 10px, 6px)',
                                                height: 89
                                            }}>
                                                {project.tags.map((tag) => (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            '& .MuiChip-label': { fontWeight: 500 }, fontSize: 'clamp(0.4rem, 1vw, 1rem)'
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        )).splice(0, 3) : null}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};