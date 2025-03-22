import { Box, Card, CardContent, CardMedia, Container, Grid, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useInView } from 'react-intersection-observer';
import { FetchContext } from '../Context';



export const Projects = () => {

    const { projects, setProjects } = useContext(FetchContext)

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

    return (
        <Box
            component="section"
            sx={{
                py: 10,
                bgcolor: 'InfoBackground',
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    component={motion.h2}
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Featured Projects
                </Typography>
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        {projects.map((project, index) => (
                            <Grid item xs={12} md={4} key={index}>
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
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={project.image}
                                                alt={project.title}
                                            />
                                        </Box>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {project.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '21rem', overflow: 'hidden' }} paragraph>
                                                {project.description}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                {project.tags.map((tag) => (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            '& .MuiChip-label': { fontWeight: 500 },
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};