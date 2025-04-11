import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, Hidden } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import axios from 'axios';



const ProjectsSection = () => {
    const [projects, setProjects] = useState([])
    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'
    useEffect(() => {
        const getProjectDetails = async () => {
            await axios.get(`${backendUrl}/project/get`)
                .then((res) => {
                    const data = res.data.data
                    setTimeout(() => {
                        setProjects(data)
                    }, 1000)
                })
                .catch((er) => {
                    console.log(er);
                })
        }
        getProjectDetails()
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="py-16"
        >
            <Typography variant="h3" component="h2" className="text-center mb-12" sx={{ textAlign: 'center', fontWeight: 700, color: 'white', opacity: 0.8, my: 4 }}>
                Projects
            </Typography>

            <Grid container spacing={4}>
                {projects.map((project, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <Card
                                elevation={4}
                                component={motion.div}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={project.image.url}
                                    alt={project.title}
                                />
                                <CardContent>
                                    <Typography variant="h6"
                                        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, lineClamp: 1, whiteSpace: 'nowrap', boxOrient: 'vertical', WebkitBoxOrient: 'vertical', }} component="h3" gutterBottom>
                                        {project.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        msTextOverflow: 'ellipsis',
                                        WebkitLineClamp: 4, lineClamp: 4,
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        boxOrient: 'vertical'
                                    }} paragraph>
                                        {project.description}
                                    </Typography>
                                    <Box >
                                        {project?.tags?.map((ite, ind) => (
                                            <Typography sx={{ mx: 0.6, mt: 1 }} component={motion.button} key={ind}>{ite}</Typography>
                                        )).splice(0, 5)}
                                    </Box>
                                    <Box display="flex" justifyContent="flex-end" gap={1}>
                                        {/* <IconButton
                                            component={motion.button}
                                            whileHover={{ scale: 1.2 }}
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <GitHub />
                                        </IconButton> */}
                                        <a href={project.url}>
                                            <IconButton
                                                component={motion.button}
                                                whileHover={{ scale: 1.2 }}

                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Launch />
                                            </IconButton>
                                        </a>
                                    </Box>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    );
};

export default ProjectsSection;