import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box, Hidden, Container } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';



const ProjectsSection = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjectDetails = async () => {
            await apiIntance.get(`/project/get`)
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
            <Typography variant="h3" component="h1" sx={{ textAlign: 'center', fontWeight: 700, opacity: 0.8, mt: 8, mb: 5 }}>
                <strong style={{ fontSize: 42 }}>Projects</strong>
            </Typography>
            <Container>
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
                                    sx={{ position: 'relative' }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={project.image.url}
                                        alt={project.title}
                                    />
                                    <Box display="flex" justifyContent="flex-end" sx={{ position: 'absolute', top: 20, right: 20 }} gap={1}>
                                        <a href={project.url} style={{ backgroundColor: 'transparent' }}>
                                            <IconButton
                                                component={motion.button}
                                                whileHover={{ scale: 1.2 }}

                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ bgcolor: 'transparent', }}
                                            >
                                                <Launch sx={{ ':hover': { borderRadius: 50 }, color: 'white' }} />
                                            </IconButton>
                                        </a>
                                    </Box>
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

                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    )).splice(0, 3)}
                </Grid>
            </Container>
        </motion.div>
    );
};

export default ProjectsSection;