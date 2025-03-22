import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, TextField, Avatar, IconButton } from '@mui/material';
import { Email, GitHub, Code, Html, Javascript, DataObject, KeyboardArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ContactSection from './ContactSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectSection';
import Footer from '../HomePage/Footer';
import { Header } from '../HomePage/Header';
import programmer from '../assets/programmer2.png'

const listModify = [
    'unset', 'color-dodge', 'color-burn', 'color', 'exclusion', 'difference', 'darken', 'hard-light', 'hue', 'inherit', 'luminosity', 'initial', 'lighten',
    'overlay', 'multiply', 'normal', 'plus-lighter', 'revert', 'screen', 'revert-layer', 'saturation', 'soft-light'
]

const About = () => {

    return (
        <Box sx={{ bgcolor: '#111827', color: 'text.primary' }}>
            {/* Navbar */}
            <Header />

            {/* Hero Section */}
            <HeroSection />

            {/* Skills Section */}
            <SkillsSection />

            {/* Experience Section */}
            <ExperienceSection />

            {/* Projects Section */}
            <ProjectsSection />

            {/* Contact Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />
        </Box>
    );
};

const HeroSection = () => {
    const [imageModify, setImageModify] = useState('')
    console.log(imageModify);

    return (
        <Box id="hero" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ width: '100%' }}>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', opacity: 0.9, mb: 3, mt: 3, }}>Hi, I'm Charipalli Thirumalesh</Typography>
                            <Typography variant="h5" color="white" sx={{ mb: 4, fontWeight: 600, opacity: 0.7 }}>Senior Frontend Developer specialized in building exceptional digital experiences</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button variant="contained" color="primary" startIcon={<Email />} href='tel:7569583293'>Contact Me</Button>
                                <Button variant="outlined" color="primary" startIcon={<GitHub />} href='https://github.com/ThiruCoder'>View Projects</Button>
                                <Button
                                    component={motion.button}
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05, backgroundColor: '#111827' }}
                                    transition={{ duration: 0.5 }}
                                    href=''
                                    sx={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        bgcolor: 'grey.800',
                                        px: 3,
                                        py: 1,
                                        borderRadius: '9999px',
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontFamily: 'monospace',
                                        width: '150px',
                                        boxShadow: 3,
                                        '&:hover': {
                                            bgcolor: 'grey.900',
                                            ring: 1,
                                            ringColor: 'grey.500',
                                        },
                                    }}
                                >
                                    Resume
                                    <KeyboardArrowDown
                                        component={motion.svg}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        sx={{ width: 20, height: 20 }}
                                    />
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{}}>
                        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <img
                                src={programmer}
                                alt="Developer illustration"
                                style={{ width: '100%', height: 'auto', objectFit: 'contain', mixBlendMode: imageModify }}
                            />
                        </motion.div>

                        <select name="mixBlend" style={{ padding: '8px 16px', display: 'flex', float: 'right' }} id="" onClick={(e) => setImageModify(e.target.value)}>
                            {listModify?.map((ite, ind) => (
                                <option key={ind} value={ite}>{ite}</option>
                            ))}
                        </select>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
const SkillsSection = () => (
    <Box id="skills" sx={{ py: 10, bgcolor: '#0d121c', backdropFilter: 'blur(10px)', boxShadow: "10px 30px 50px rgba(0, 0, 0, 0.2)" }}>
        <Container>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', opacity: 0.9, mb: 6, textAlign: 'center' }}>Technical Skills</Typography>
            <Grid container spacing={4}>
                {skillsData.map((skill, index) => (
                    <Grid item xs={12} md={3} key={index}>

                        <SkillCard skill={skill} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
);

const SkillCard = ({ skill }) => (
    <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            {skill.icon}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>{skill.title}</Typography>
        </Box>
        {skill.items.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
                <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 4 }}>
                    <Typography>{item?.icon}</Typography>
                    <Typography variant="body2" sx={{ position: 'relative', bottom: 2 }}>{item?.name}</Typography>
                </span>
                <Box sx={{ width: '100%', bgcolor: 'divider', borderRadius: 1, height: 8 }}>
                    <Box sx={{ width: `${item.progress}%`, bgcolor: 'primary.main', height: 8, borderRadius: 1 }} />
                </Box>
            </Box>
        ))}
    </Paper>
);

const skillsData = [
    {
        title: 'Frontend',
        icon: ' 🎨🖥️ ',
        items: [
            { name: 'HTML5', progress: 95, icon: '🌐' },
            { name: 'JavaScript', progress: 90, icon: '⚡️' },
            { name: 'CSS3', progress: 98, icon: ' 🎨 ' },
        ],
    },
    {
        title: 'Backend',
        icon: '🔧🖥️',
        items: [
            { name: 'Django', progress: 95, icon: '🐍' },
            { name: 'MySql', progress: 90, icon: '🔥' },
            { name: 'Firebase', progress: 98, icon: '🐬' },
        ],
    },
    {
        title: 'Libraries',
        icon: '🎬 🚀',
        items: [
            { name: 'React', progress: 95, icon: '⚛️' },
            { name: 'Framer motion', progress: 90, icon: '🎬 ' },
            { name: 'GSAP', progress: 98, icon: '🚀' },
        ],
    },
    {
        title: 'Libraries',
        icon: '🌈 🏗️',
        items: [
            { name: 'Bootstrap', progress: 95, icon: '🏗️' },
            { name: 'Material UI (MUI)', progress: 90, icon: '🎨 ' },
            { name: ' Tailwind CSS', progress: 98, icon: '🌈' },
        ],
    }
    // Add other skills here
];

// Similarly, create components for ExperienceSection, ProjectsSection, TestimonialsSection, ContactSection, and Footer.

export default About;