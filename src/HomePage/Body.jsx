import { Box, Button, CardMedia, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Rocket, Send } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { FetchContext } from '../Context';
import temp1 from '../assets/template1.png'
// import { RocketIcon, Send } from 'lucide-react';

export const Body = () => {

    const navigate = useNavigate()

    const { projects, setProjects } = useContext(FetchContext)

    useEffect(() => {
        setProjects(tempates)
    }, [tempates])

    return (
        <Box component="section" sx={{ py: { xs: 10, md: 12 } }}>
            <Container maxWidth="lg">
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Typography
                                variant="h1"
                                gutterBottom
                                sx={{
                                    background: 'linear-gradient(45deg, #1B9AF5, #4CAF50)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                Creative Developer & UI Designer
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} paragraph>
                                Crafting digital experiences with modern technologies. Specialized in React,
                                Node.js, and UI/UX design.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<Rocket />}
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    View Projects
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<Send />}
                                    component={motion.button}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Contact Me
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <CardMedia
                                component="img"
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                                alt="Developer workspace"
                                sx={{
                                    width: '100%',
                                    borderRadius: 4,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                }}
                            />
                        </motion.div>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
};


const tempates = [
    {
        title: 'Modern Landing Page',
        description: 'A Modern Landing Page is a visually appealing and highly optimized web page designed to capture user attention, generate leads, and drive conversions. It follows a minimalistic, fast, and responsive design approach while incorporating interactive elements for enhanced user engagement.',
        image: temp1,
        price: '$49',
        rating: 5,
        reviews: 128,
        id: 1,
        tags: ['React', 'Firebase.js', 'Material UI'],
    },
    {
        title: 'E-commerce Dashboard',
        description: 'A full-featured admin dashboard with React and Material UI.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        tags: ['React', 'Firebase.js', 'Material UI'],
        price: '$49',
        rating: 5,
        reviews: 128,
        id: 2,
    },
    {
        title: 'Social Platform',
        description: 'Social media platform with real-time features.',
        image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
        tags: ['Firebase', 'React', 'WebSocket'],
        price: '$49',
        rating: 5,
        reviews: 128,
        id: 3,
    },
    {
        title: 'Portfolio Template',
        description: 'Modern portfolio template with animations.',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
        tags: ['GSAP', 'CSS Grid', 'React'],
        price: '$49',
        rating: 5,
        reviews: 128,
        id: 4,
    },
]
