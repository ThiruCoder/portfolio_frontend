import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Paper, TextField, Avatar, IconButton, Modal } from '@mui/material';
import { Email, GitHub, Code, Html, Javascript, DataObject, KeyboardArrowDown } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ContactSection from './ContactSection';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectSection';
import Footer from '../HomePage/Footer';
import { Header } from '../HomePage/Header';
import programmer from '../assets/programmer2.png'
import { ProfileCard } from './profile';
import Resume from './resume';
import axios from 'axios';

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
            {/* <ExperienceSection /> */}

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
    const [open, setOpen] = React.useState(false);
    const [docsData, setDocsData] = useState(null)

    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'

    const handleOpen = async () => {
        try {
            await axios.get(`${backendUrl}/postpdf/getPdf`)
                .then((res) => setDocsData(res.data.data.map(ite => ite.pdf).join()))
                .catch((err) => console.log(err))
        } catch (err) {
            console.log(err);

        }
    }
    console.log('docsData', docsData);
    handleOpen()
    const handleClose = () => setOpen(false);

    return (
        <Box id="hero" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ width: '100%' }}>
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', opacity: 0.9, mb: 3, mt: 3, }}>Hi, I'm Charipalli Thirumalesh</Typography>
                            <Typography variant="h5" color="white" sx={{ mb: 4, fontWeight: 600, opacity: 0.7 }}>Fullstack Developer specialized in building exceptional digital experiences</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button sx={{ width: 'clamp(150px, 30%, 150px)', fontSize: 'clamp(9px, 16%, 30px)', height: '30%' }} variant="contained" color="primary" startIcon={<Email />} href='tel:7569583293'>Contact Me</Button>
                                <Button sx={{ width: 'clamp(150px, 30%, 150px)', fontSize: 'clamp(8px, 16%, 30px)', height: '30%' }} variant="outlined" color="primary" startIcon={<GitHub />} href='https://github.com/ThiruCoder'>View Projects</Button>
                                <a href={docsData !== null ? `${backendUrl}/postpdf/getPdf/${docsData}` : ''}>
                                    <Button
                                        component={motion.button}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05, backgroundColor: '#111827' }}
                                        transition={{ duration: 0.5 }}
                                        // onClick={handleOpen}
                                        href=''
                                        sx={{
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            bgcolor: 'grey.800',
                                            px: 3,
                                            py: 2,
                                            borderRadius: '9999px',
                                            color: 'white',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            fontFamily: 'monospace',
                                            boxShadow: 3,
                                            width: 'clamp(150px, 30%, 150px)', fontSize: 'clamp(13px, 16%, 30px)', height: '30%',
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
                                </a>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Resume />
                        </Box>
                    </Modal>

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
        icon: '🎨🖥️',
        items: [
            { name: 'React', progress: 95, icon: '⚛️' },
            { name: 'Material UI', progress: 90, icon: '🎨' },
            { name: 'Framer Motion', progress: 85, icon: '🎞️' },
            { name: 'Redux', progress: 90, icon: '📦' },
            { name: 'React-router-dom', progress: 88, icon: '🧭' },
            { name: 'Axios', progress: 90, icon: '📡' },
            { name: 'Tailwind CSS', progress: 80, icon: '💨' },
        ],
    },
    {
        title: 'Backend',
        icon: '🔧🖥️',
        items: [
            { name: 'Node.js', progress: 90, icon: '🟢' },
            { name: 'Express.js', progress: 90, icon: '🚂' },
            { name: 'Firebase', progress: 95, icon: '🔥' },
            { name: 'MongoDB', progress: 92, icon: '🍃' },
            { name: 'Mongoose', progress: 90, icon: '🐁' },
            { name: 'Python', progress: 78, icon: '🔑' },
            { name: 'Django', progress: 88, icon: '🔑' },

        ],
    },
    {
        title: 'Libraries',
        icon: '🌈 🏗️',
        items: [
            { name: 'Socket.IO', progress: 78, icon: '🔌' },
            { name: 'Joi (Validation)', progress: 80, icon: '📏' },
            { name: 'dotenv', progress: 90, icon: '🌱' },
            { name: 'cors', progress: 88, icon: '🔄' },
            { name: 'Multer (File Uploads)', progress: 75, icon: '🧺' },
            { name: 'nodemailer', progress: 70, icon: '📬' },
            { name: 'Morgan (Logger)', progress: 80, icon: '📝' },
        ]
    },
    {
        title: 'Libraries',
        icon: '🌈 🏗️',
        items: [
            { name: 'Swagger (API Docs)', progress: 65, icon: '📘' },
            { name: 'Cloudinary (File store)', progress: 75, icon: '📘' },
            { name: 'Twillio', progress: 68, icon: '🔑' },
            { name: 'JWT', progress: 85, icon: '🔐' },
            { name: 'bcryptjs', progress: 88, icon: '🔑' },
        ]
    }
    // Add other skills here
];

// Similarly, create components for ExperienceSection, ProjectsSection, TestimonialsSection, ContactSection, and Footer.

export default About;


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

