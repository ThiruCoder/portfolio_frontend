import React, { useEffect, useState } from 'react';
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
import MessageModel from '../HomePage/MessageModel';
import { useGlobalContext } from '../GlobalContext/context';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import Skills from '../Dashboard/Dashboard_Models/Skills';

const listModify = [
    'unset', 'color-dodge', 'color-burn', 'color', 'exclusion', 'difference', 'darken', 'hard-light', 'hue', 'inherit', 'luminosity', 'initial', 'lighten',
    'overlay', 'multiply', 'normal', 'plus-lighter', 'revert', 'screen', 'revert-layer', 'saturation', 'soft-light'
]

const About = () => {
    const [resumeData, setResumeData] = useState([])
    const [frontend, setFrontend] = useState([]);
    const [backend, setBackend] = useState([]);
    const [database, setDatabase] = useState([]);
    const [other, setOther] = useState([]);
    const [tool, setTool] = useState([]);

    const useCase = true

    useEffect(() => {
        const handleResumeData = async () => {
            try {
                await apiIntance.get('/resume/getResume')
                    .then((response) => {
                        setResumeData(response.data.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching resume data:', error);
                    });
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        }
        handleResumeData();
    }, [])

    console.log('resumeData', resumeData)
    // useEffect(() => {

    //     const front = [];
    //     const back = [];
    //     const db = [];
    //     const misc = [];
    //     const util = [];
    //     if (!resumeData) return;
    //     resumeData.forEach(skill => {
    //         switch (skill.category) {
    //             case 'Frontend':
    //                 front.push(skill);
    //                 break;
    //             case 'Backend':
    //                 back.push(skill);
    //                 break;
    //             case 'Database':
    //                 db.push(skill);
    //                 break;
    //             case 'Other':
    //                 misc.push(skill);
    //                 break;
    //             case 'Tools':
    //                 util.push(skill);
    //                 break;
    //         }
    //     });

    //     setFrontend(front);
    //     setBackend(back);
    //     setDatabase(db);
    //     setOther(misc);
    //     setTool(util);

    // }, [resumeData]);

    return (
        <Box sx={{ color: 'text.primary' }}>
            {/* Navbar */}
            <Header />

            {/* Hero Section */}
            <HeroSection />

            {/* Skills Section */}
            <SkillsSection useCase={useCase} resumeData={resumeData} frontend={frontend} backend={backend} tool={tool} database={database} other={other} />

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
    const [openModel, setOpenModel] = React.useState(false);
    const [docsData, setDocsData] = useState(null);


    const handleClose = () => setOpen(false);

    const handleOpenModel = () => setOpenModel(true);
    const handleCloseModel = () => setOpenModel(false);
    const viewButton = 'noView'
    return (
        <Box id="hero" sx={{ py: 10, position: 'relative', overflow: 'hidden' }}>
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8} sx={{ width: '100%' }}>
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ width: '100%' }}>
                            <Typography variant="h3" sx={{ fontWeight: 700, opacity: 0.9, mb: 3, mt: 3, }}>Hi, I'm Charipalli Thirumalesh</Typography>
                            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, opacity: 0.7 }}>Fullstack Developer specialized in building exceptional digital experiences</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <MessageModel style={viewButton} openModel={openModel} setOpenModel={setOpenModel}
                                    handleOpen={handleOpenModel} handleClose={handleCloseModel}
                                />
                                <Button sx={{ width: 'clamp(120px, 30%, 150px)', fontSize: 'clamp(11px, 16%, 30px)', height: '100%' }} variant="outlined" startIcon={<GitHub />} href='https://github.com/ThiruCoder'>View Projects</Button>
                                <Button
                                    component={motion.button}
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05, backgroundColor: '#111827' }}
                                    transition={{ duration: 0.5 }}
                                    onClick={handleOpenModel}
                                    sx={{
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        bgcolor: 'grey.800',
                                        borderRadius: '9999px',
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        fontFamily: 'monospace',
                                        boxShadow: 3,
                                        width: 'clamp(60px, 30%, 110px)',
                                        fontSize: 'clamp(13px, 16%, 30px)', height: '30%',
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
const SkillsSection = ({ resumeData, useCase, frontend, backend, tool, database, other }) => (
    <Box id="skills" sx={{ py: 10, bgcolor: '#0d121c', backdropFilter: 'blur(10px)', boxShadow: "10px 30px 50px rgba(0, 0, 0, 0.2)" }}>
        <Container>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'white', opacity: 0.9, textAlign: 'center' }}>Technical Skills</Typography>
            <Skills resumeData={resumeData} useCase={useCase} />
            {/* <Grid container spacing={4}>
                {[frontend, backend, tool, database, other].map(skill => (
                    <Grid item xs={12} md={3}>
                        <SkillCard skill={skill} />
                    </Grid>
                ))}
            </Grid> */}
        </Container>
    </Box>
);

const SkillCard = ({ skill }) => (
    <Box>
        <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                {/* {skill.icon} */}
                <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2 }}>
                    {skill
                        .map(item => item.category).join(',').split(',')[0]}
                </Typography>
            </Box>
            {skill.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <span style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 4 }}>
                        {/* <Typography>{item?.icon}</Typography> */}
                        <Typography variant="body2" sx={{ position: 'relative', bottom: 2 }}>{item?.name}</Typography>
                    </span>
                    <Box sx={{ width: '100%', bgcolor: 'divider', borderRadius: 1, height: 8 }}>
                        <Box sx={{ width: `${item.progress}%`, bgcolor: 'primary.main', height: 8, borderRadius: 1 }} />
                    </Box>
                </Box>
            ))}
        </Paper>
    </Box>
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

