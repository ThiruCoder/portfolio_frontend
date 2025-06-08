import React, { useEffect, useState, useCallback } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
    Chip,
    CircularProgress,
    Alert,
    Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [makeHoverColor, setMakeHoverColor] = useState(false);

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
        const controller = new AbortController();
        const getProjectDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await apiIntance.get('/project/get',);

                setProjects(
                    res.data.data
                        .map((item, index) => ({ ...item, index }))
                        .sort((a, b) => b.index - a.index)
                        .slice(0, 3)
                );
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError('Failed to load projects. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        getProjectDetails();
        return () => {
            controller.abort(); // Cleanup
        };
    }, []);

    const ProjectCard = ({ project, index }) => (
        <Grid item xs={12} sm={6} md={4} key={project.id || index}>
            <motion.div variants={itemVariants}>
                <Card
                    className='card'
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: (theme) => theme.shadows[8],
                        },
                        textDecoration: 'none'
                    }}
                    component={Link}
                    to={project?.url || '#'}
                >
                    <Box
                        sx={{
                            aspectRatio: '16/9',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <CardMedia
                            component="img"
                            height="100%"
                            width="100%"
                            image={project?.image?.url || '/placeholder-image.jpg'}
                            alt={project?.title || 'Project image'}
                            sx={{
                                objectFit: 'cover',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                }
                            }}
                            onError={(e) => {
                                e.target.src = '/placeholder-image.jpg';
                            }}
                        />
                    </Box>

                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                                fontWeight: 600,
                                lineHeight: 1.3,
                                minHeight: '2.6em'
                            }}
                        >
                            {project?.title || 'Untitled Project'}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className='typo'
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                                lineHeight: 1.4,
                                mb: 2,
                                flexGrow: 1,
                                ":hover": {
                                    color: 'white'
                                }
                            }}
                        >
                            {project?.description || 'No description available'}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 0.5,
                                mt: 'auto',

                            }}
                        >
                            {project?.tags?.slice(0, 3).map((tag, tagIndex) => (
                                <Chip
                                    key={`${tag}-${tagIndex}`}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                                        height: '24px',
                                        '& .MuiChip-label': {
                                            fontWeight: 500,
                                            px: 1,
                                            overflow: 'hidden'
                                        }
                                    }}
                                />
                            ))}
                            {project?.tags?.length > 4 && (
                                <Chip
                                    label={`+${project.tags.length - 4}`}
                                    size="small"
                                    variant="outlined"
                                    className='typi'
                                    sx={{
                                        fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                                        height: '24px',

                                    }}
                                />
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </motion.div>
        </Grid>
    );

    const LoadingState = () => (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
        </Box>
    );

    // const ErrorState = () => (
    //     <Box sx={{ py: 4 }}>
    //         <Alert
    //             severity="error"
    //             action={
    //                 <Button onClick={getProjectDetails} size="small">
    //                     Retry
    //                 </Button>
    //             }
    //         >
    //             {error}
    //         </Alert>
    //     </Box>
    // );

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 4, md: 8 },
                bgcolor: 'background.default'
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 4,
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2
                    }}
                >
                    <Typography
                        variant="h2"
                        component={motion.h2}
                        initial={{ opacity: 0, y: -20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        sx={{
                            fontSize: { xs: '2rem', md: '2.5rem' },
                            fontWeight: 700,
                            color: 'text.primary'
                        }}
                    >
                        Projects
                    </Typography>

                    <Link
                        to="/Projects"
                        style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            backgroundColor: 'transparent',
                        }}
                    >
                        <Box
                            component={motion.div}
                            whileHover={{ x: 5, backgroundColor: 'transparent' }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                color: 'primary.main',
                                fontSize: { xs: '0.9rem', md: '1rem' },
                                fontWeight: 500,
                                transition: 'color 0.2s ease-in-out',
                                fontWeight: 700,
                                '&:hover': {
                                    color: 'primary.dark',
                                },

                            }}
                        >
                            View All Projects
                            <MoveRight size={18} />
                        </Box>
                    </Link>
                </Box>

                {loading && <LoadingState />}
                {/* {error && <ErrorState />} */}

                {!loading && !error && (
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            {projects.length > 0 ? (
                                projects.map((project, index) => (
                                    <ProjectCard
                                        key={project.id || index}
                                        project={project}
                                        index={index}
                                    />
                                ))
                            ) : (
                                <Grid item xs={12}>
                                    <Box sx={{ textAlign: 'center', py: 8 }}>
                                        <Typography variant="h6" color="text.secondary">
                                            No projects available at the moment.
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </motion.div>
                )}
            </Container>
        </Box>
    );
};