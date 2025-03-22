import React from 'react';
import { motion } from 'framer-motion';
import { Grid, Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';

const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React and Node.js",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        github: "https://github.com",
        live: "https://example.com"
    },
    {
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media management",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        github: "https://github.com",
        live: "https://example.com"
    },
    {
        title: "AI Image Generator",
        description: "Web app that generates images using AI",
        image: "https://images.unsplash.com/photo-1525373698358-041e3a460346?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        github: "https://github.com",
        live: "https://example.com"
    }
];

const ProjectsSection = () => {
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
                                    image={project.image}
                                    alt={project.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h3" gutterBottom>
                                        {project.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" paragraph>
                                        {project.description}
                                    </Typography>
                                    <Box display="flex" justifyContent="flex-end" gap={1}>
                                        <IconButton
                                            component={motion.button}
                                            whileHover={{ scale: 1.2 }}
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <GitHub />
                                        </IconButton>
                                        <IconButton
                                            component={motion.button}
                                            whileHover={{ scale: 1.2 }}
                                            href={project.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Launch />
                                        </IconButton>
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