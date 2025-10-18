import {
    Box, Button, CardMedia, Container, Grid, Typography,
    IconButton, Chip, Stack, alpha, useTheme,
    Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { Instagram, Mail, Rocket, Send, YouTube, LinkedIn, GitHub, Email, Twitter, Facebook } from '@mui/icons-material';
import {
    Instagram as Icon1,
    Mail as Icon2,
    Github as Icon3,
    Linkedin as Icon4,
    Youtube as Icon5,
    Twitter as Icon6,
    Facebook as Icon7
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import { FetchContext } from '../Context';
import temp1 from '../assets/template1.png';
import MessageModel from './MessageModel';

export const Body = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { projects, setProjects } = useContext(FetchContext);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        setProjects(tempates);
    }, []);

    // Text animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: "easeOut"
            }
        })
    };

    return (
        <Box sx={{
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            minHeight: '100vh'
        }}>
            <CardMedia component={'img'} src='./mySiteBg.png'
                sx={{ width: '100vw', height: '100vh', position: 'absolute' }}
            />
            {/* Animated background elements */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 20% 30%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 40%),
                      radial-gradient(circle at 80% 70%, ${alpha(theme.palette.secondary.main, 0.1)} 0%, transparent 40%)`,
                    zIndex: 0
                }}
            />

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: alpha('#fff', 0.5),
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            <Container maxWidth="lg" ref={containerRef} sx={{ position: 'relative', zIndex: 1, mt: 26 }}>
                {/* <Grid container spacing={6} alignItems="center" sx={{ minHeight: '100vh', py: 4 }}>
                    <Grid item xs={12} md={6}> */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <Typography
                        variant="h2"
                        gutterBottom
                        component={motion.div}
                        variants={textVariants}
                        sx={{
                            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            mb: 2
                        }}
                    >
                        Creative Fullstack Developer
                    </Typography>

                    <Typography
                        variant="h6"
                        component={motion.div}
                        variants={textVariants}
                        custom={2}
                        fontSize={15}
                        sx={{
                            fontWeight: 400,
                            opacity: 0.7,
                            mb: 3,
                            color: '#fff'
                        }}
                        paragraph
                    >
                        I architect and engineer <Box component="span" sx={{ color: '#4ECDC4', fontWeight: 600 }}>end-to-end digital solutions</Box> that seamlessly blend cutting-edge frontend experiences with robust, scalable backend systems. With expertise across the entire development stack, I bring ideas to life with precision code and innovative problem-solving.
                    </Typography>

                    <Box
                        sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}
                        component={motion.div}
                        variants={textVariants}
                        custom={2}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Rocket />}
                            component={motion.button}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/Projects')}
                            sx={{
                                background: 'linear-gradient(45deg, #6A11CB 0%, #2575FC 100%)',
                                borderRadius: 3,
                                px: 4,
                                py: 1.5
                            }}
                        >
                            View Projects
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<Send />}
                            component={motion.button}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: alpha(theme.palette.primary.main, 0.1)
                            }}
                            whileTap={{ scale: 0.95 }}
                            href='tel:7569583293'
                            sx={{
                                borderColor: '#fff',
                                color: '#fff',
                                borderRadius: 3,
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1)
                                }
                            }}
                        >
                            Contact Me
                        </Button>
                    </Box>

                    {/* Social links */}
                    <Box
                        sx={{ display: 'flex', gap: 1, mt: 4 }}
                        component={motion.div}
                        variants={textVariants}
                        custom={3}
                    >
                        {[
                            { icon1: <Icon2 color='rgba(223, 223, 248, 1)' />, title: 'Email', icon: <Mail />, color: 'rgba(223, 223, 248, 1)', link: 'mailto:thiruthedeveloper@gmail.com' },
                            { icon1: <Icon3 color='#f47f0bff' />, title: 'GitHub', icon: <GitHub />, color: '#f47f0bff', link: 'https://github.com/ThiruCoder' },
                            { icon1: <Icon4 color='#013f61ff' />, title: 'LinkedIn', icon: <LinkedIn />, color: '#013f61ff', link: 'https://www.linkedin.com/in/charipalli-thirumalesh-a7a127350' },
                            { icon1: <Icon1 color='#850494ff' />, title: 'Instagram', icon: <Instagram />, color: '#850494ff', link: 'https://www.instagram.com/thiru_king1?igsh=ZzB1MGc0ZmE0Nm5u' },
                            { icon1: <Icon5 color='#c90505ff' />, title: 'YouTube', icon: <YouTube />, color: '#c90505ff', link: 'https://www.youtube.com/@ThiruSoftCode' },
                            { icon1: <Icon6 color='#000' />, title: 'Twitter', icon: <Twitter />, color: '#000', link: 'https://x.com/ChThiru143' },
                            { icon1: <Icon7 color='#0077b5' />, title: 'Facebook', icon: <Facebook />, color: '#0077b5', link: 'https://www.facebook.com/profile.php?id=100090141135856' },
                        ].map((social, index) => (
                            <Tooltip title={social.title} key={index}>
                                <IconButton
                                    component="a"
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(null)}
                                    sx={{
                                        border: `1px solid ${alpha('#fff', 0.2)}`,
                                        backgroundColor: alpha('#fff', 0.05),
                                        backdropFilter: 'blur(10px)',
                                        opacity: hover === index ? 0.8 : 0.3,
                                        transition: 'all 0.3s ease-in-out',
                                        transform: 'scale(1)',
                                        color: '#fff',
                                        // Hover effects
                                        '&:hover': {
                                            scale: 1.1,
                                            transform: 'scale(1.1) rotate(7deg)',
                                            backgroundColor: alpha(social.color, 0.2),
                                            color: '#fff'
                                        },
                                        // Active/tap effects
                                        '&:active': {
                                            transform: 'scale(0.9)',
                                        }
                                    }}
                                >
                                    <Box
                                        component="span"
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'opacity 0.3s ease, transform 0.3s ease',
                                            opacity: hover === index ? 1 : 0.7,
                                            transform: hover === index ? 'scale(1.2)' : 'scale(1)',
                                            // Hover effects for the inner box
                                            '&:hover': {
                                                opacity: 1,
                                                transform: 'scale(1.2)',
                                            }
                                        }}
                                    >
                                        {hover === index ? social.icon1 : social.icon}
                                    </Box>
                                </IconButton>
                            </Tooltip>
                        ))}
                    </Box>
                </motion.div>
                {/* </Grid>
                </Grid> */}
            </Container>

            {/* Floating Action Button */}
            <motion.div
                style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}
                whileHover={{ scale: 1.1 }}
            >
                <InstagramButton />
            </motion.div>
        </Box>
    );
};

// Updated InstagramButton with modern design
const InstagramButton = () => {
    const [openModel, setOpenModel] = useState(false);
    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => setOpenModel(false);

    return (
        <>
            <motion.div
                whileHover="hover"
                initial="initial"
                style={{
                    cursor: 'pointer',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 25px rgba(220, 39, 67, 0.5)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                onClick={handleOpenModel}
            >
                <motion.div
                    variants={{
                        initial: { rotate: 0 },
                        hover: { rotate: 360 }
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {['C', 'O', 'N', 'T', 'A', 'C', 'T', ' ', 'M', 'E'].map((letter, i) => (
                        <span
                            key={i}
                            style={{
                                position: 'absolute',
                                transform: `rotate(${36 * i}deg)`,
                                transformOrigin: '0 36px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: '#fff'
                            }}
                        >
                            {letter}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    variants={{
                        initial: { scale: 1 },
                        hover: { scale: 0.9 }
                    }}
                    style={{
                        width: '60%',
                        height: '60%',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#e4405f',
                        fontSize: '24px'
                    }}
                >
                    <Email />
                </motion.div>
            </motion.div>

            <MessageModel
                style="view"
                openModel={openModel}
                setOpenModel={setOpenModel}
                handleOpen={handleOpenModel}
                handleClose={handleCloseModel}
            />
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
];