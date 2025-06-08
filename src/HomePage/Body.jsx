import { Box, Button, CardMedia, Container, Grid, styled, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Instagram, Rocket, Send, YouTube } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FetchContext } from '../Context';
import temp1 from '../assets/template1.png'
import MessageModel from './MessageModel';
// import { RocketIcon, Send } from 'lucide-react';

export const Body = () => {

    const navigate = useNavigate()

    const { projects, setProjects } = useContext(FetchContext)

    useEffect(() => {
        setProjects(tempates)
    }, [tempates])

    return (
        <>
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
                                    variant="h2"
                                    gutterBottom
                                    sx={{
                                        background: 'linear-gradient(45deg, #1B9AF5, #4CAF50)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        color: 'transparent',
                                    }}
                                >
                                    Creative Fullstack Developer
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.7 }} paragraph>
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
                                        onClick={() => navigate('/Projects')}
                                    >
                                        View Projects
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        startIcon={<Send />}
                                        component={motion.a}
                                        whileHover={{ scale: 1.05, backgroundColor: 'none' }}
                                        whileTap={{ scale: 0.95 }}
                                        href='tel:7569583293'
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
            {/* Floating Action Button */}
            <motion.div style={{ position: 'fixed', bottom: '24px', right: '24px' }} whileHover={{ scale: 1.1 }}>
                <InstagramButton />
            </motion.div>
        </>
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



// Styled components
const StyledButton = styled(Button)(({ theme }) => ({
    cursor: 'pointer',
    border: 'none',
    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    color: '#fff',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'relative',
    display: 'grid',
    placeContent: 'center',
    transition: 'background 300ms, transform 200ms',
    fontWeight: 600,
    '&:hover': {
        background: '#000',
        transform: 'scale(1.05)',
    },
    '&:active': {
        transform: 'scale(0.95)',
    },
    top: 40
}));

const ButtonText = styled(motion.div)({
    position: 'absolute',
    inset: 0,
    animation: 'text-rotation 8s linear infinite',
});

const ButtonCircle = styled('div')({
    position: 'relative',
    width: '40px',
    height: '40px',
    overflow: 'hidden',
    background: '#212121',
    color: '#dc2743',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const ButtonIcon = styled(motion.div)({
    position: 'absolute',
});

const InstagramButton = () => {
    const [openModel, setOpenModel] = useState(false);
    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => setOpenModel(false);

    const viewButton = 'view'
    return (
        <>
            <StyledButton onClick={handleOpenModel}>
                <ButtonText
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                    {['C', 'O', 'N', 'T', 'A', 'C', 'T', ' ', 'M', 'E', ' ', 'C', 'O', 'N', 'T', 'A', 'C', 'T'].map((letter, i) => (
                        <span
                            key={i}
                            style={{
                                position: 'absolute',
                                transform: `rotate(${18 * i}deg)`,
                                inset: '7px',
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </ButtonText>
                <ButtonCircle>
                    <ButtonIcon />
                </ButtonCircle>
            </StyledButton>

            {/* Put modal here outside */}
            <MessageModel
                style={viewButton}
                openModel={openModel}
                setOpenModel={setOpenModel}
                handleOpen={handleOpenModel}
                handleClose={handleCloseModel}
            />
        </>
    );
};


