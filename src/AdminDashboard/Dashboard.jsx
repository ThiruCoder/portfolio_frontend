import React, { Fragment, useEffect, useState } from 'react';
import { AppBar, styled, Toolbar, Typography, IconButton, Avatar, Button, Grid, Paper, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, hexToRgb, Box, Tooltip, LinearProgress } from '@mui/material';
import { Notifications, People, Work, Help, Business, Add, ChevronRight, ArrowLeft, Instagram, Upload, Logout } from '@mui/icons-material';
import { color, motion } from 'framer-motion';
import { auth, database } from '../Firebase/Firebase_config';
import { onAuthStateChanged } from 'firebase/auth';
import { get, push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Footer from '../HomePage/Footer';
import axios from 'axios'
import './dashboard.css'
import FileUploadComponent from './GetDocument';
import { jwtDecode } from 'jwt-decode'
import TagsInput from './TagsInput';
import FileAndArrayUpload from './base';
import UploadLibrary from './UploadLibrary';

const availableTags = [
    'React', 'JavaScript', 'TypeScript', 'Node.js',
    'Express', 'MongoDB', 'Material-UI', 'CSS',
    'HTML', 'Redux', 'GraphQL', 'REST API', 'JWT', 'Bcript.js', 'Framer motion', 'GSAP', 'Soket.Io',
    '@reduxjs/toolkit', 'Axios', 'React-dom', 'React-router-dom', 'Formik', 'yup', 'Classnames', 'React-hook-form',
    'Chakra-ui', 'Ant-design', 'Bootstrap', 'React-spring', 'Animate.css', 'Lottie-react', 'React-query (now TanStack Query)',
    'React-icons', 'React-toastify', 'Sweetalert2', 'React-helmet', 'Dayjs / Moment', 'Html-to-markdown',
    'Dompurify (XSS protection)', 'Cors', 'Dotenv', 'Mongoose', 'Jsonwebtoken', 'Bcryptjs', 'Multer (file uploads)',
    'Cookie-parser', 'Express-validator', 'Morgan (logging)', 'firebase', 'react-firebase-hooks', 'vite or webpack',
    'babel', 'eslint', 'prettier', 'jest', 'react-testing-library', 'supertest', 'cypress', 'vercel-cli (for Vercel deploys)',
    'pm2 (production process manager for Node)', 'firebase-tools', 'netlify-cli', 'dotenv-cli', 'three.js (3D UI)',
    'next.js (React SSR/SSG framework)', 'remix (full-stack React framework)', 'WebSockets', 'AI Chatbot', 'Real-time Chat',
    'HTML5 / CSS3', 'HTML / CSS', 'Responsive Design', 'Web Animations'
];


const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [formData, setFormData] = useState([])
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [projects, setProjects] = useState([])
    const [adminDetails, setAdminDetails] = useState([])
    const [preview, setPreview] = useState('')
    const [projectData, setProjectData] = useState([])
    const [imageFile, setImageFile] = useState(null)
    const [projectError, setProjectError] = useState('')

    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);

                const currentTime = Date.now() / 1000; // in seconds
                if (decoded.exp < currentTime) {
                    console.log("Token expired");

                    localStorage.removeItem("token");
                    localStorage.removeItem('loggedData')
                    navigate("/login");
                }
            } catch (err) {
                console.log("Invalid token", err);
                localStorage.removeItem("token");
                navigate("/login");
            }
        } else {
            console.log("No token");
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        const unSubcriber = onAuthStateChanged(auth, (urrentUser) => {
            setIsLoggedIn(urrentUser)
        })
        return () => unSubcriber()
    }, [])

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { question, answer, category } = formData;

        if (category === 'react') {
            const geta = await get(ref(database, `Interview/${category}`))
            if (geta.exists()) {
                try {
                    push(ref(database, `Interview/${category}`), {
                        ...formData
                    })
                    console.log('Submitted!');

                } catch (error) {
                    console.log(error);

                }
            } else {
                set(ref(database, `Interview/${category}`), { placeholder: true })
            }
        } else {
            console.log('no react');

        }
        if (category === 'html') {
            const geta = await get(ref(database, `Interview/${category}`))
            if (geta.exists()) {
                try {
                    push(ref(database, `Interview/${category}`), {
                        ...formData
                    })
                    console.log('Submitted!');

                } catch (error) {
                    console.log(error);

                }
            } else {
                set(ref(database, `Interview/${category}`), { placeholder: true })
            }
        } else {
            console.log('no html');

        }
        if (category === 'css') {
            const geta = await get(ref(database, `Interview/${category}`))
            if (geta.exists()) {
                try {
                    push(ref(database, `Interview/${category}`), {
                        ...formData
                    })
                    console.log('Submitted!');

                } catch (error) {
                    console.log(error);

                }
            } else {
                set(ref(database, `Interview/${category}`), { placeholder: true })
            }
        } else {
            console.log('no css');

        }
    }

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(() => ({
            ...formData,
            [name]: value
        }))
    }

    const handleProjects = (e) => {
        const { name, value } = e.target;
        setProjects(() => ({
            ...projects,
            [name]: value
        }))
    }

    // console.log('projects1212', projects);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]); // Store the file object directly
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };


    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        setUploadProgress(0);
        setProjectError('')

        try {
            const { title, description, status, url } = projects;
            if (title.length < 5 || title.length > 60) {
                setProjectError(`Title min:5 and max:60 but your  title is ${title.length}`)
                return;
            }
            if (description.length < 5 || description.length > 600) {
                setProjectError(`Title min:5 and max:600 but your description is ${description.length}`)
                return;
            }
            if (!title || !description || !status || !url || !selectedTags || !imageFile) {
                setProjectError('Above fields are required! Please fill.')
                return;
            }

            const checkUrl = new URL(url);
            if (!checkUrl) {
                setProjectError('Url is not valid!, Please check and try again.')
                return;
            }

            setProjectError('')
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("status", status);
            formData.append("url", url);
            formData.append("image", imageFile); // IMPORTANT: this is where the file goes
            selectedTags.forEach(tag => formData.append("tags", tag));
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);
            console.log('formData', formData);

            // const { title, description, status, url } = projects;
            // const tags = JSON.stringify(selectedTags);
            // const image = imageFile;
            await axios.post(`${backendUrl}/project/detail`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then((d) => console.log('postTheData.data', d.data))
                .catch((err) => setProjectError(err.response?.data?.message || err?.message))

            setTimeout(() => {
                clearInterval(interval);
                setIsUploading(false);
                console.log('FormData contents:', {
                    image: imageFile.name,
                    tags: selectedTags
                });
            }, 3000);
        } catch (error) {
            setProjectError('')
            console.log(error);

        }
    }
    // console.log('pp', projects.title);


    useEffect(() => {
        const getProjectDetails = async () => {
            await axios.get(`${backendUrl}/project/get`)
                .then((res) => {
                    const data = res.data.data
                    setProjectData(data)
                })
                .catch((er) => {
                    console.log(er);
                })
        }
        getProjectDetails()
    }, [])


    // console.log('pp', projectData.data.map((ite, index) => ite.image));

    // console.log('projects', projects);
    useEffect(() => {
        const getLocalstorageData = JSON.parse(localStorage.getItem('loggedData'))
        setAdminDetails(getLocalstorageData)
    }, [])
    // console.log('isLoggedIn', adminDetails?.userInfo);

    const handleLogout = async () => {
        try {

            const token = localStorage.getItem('token')
            const getLogout = await axios.post(`${backendUrl}/auth/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (getLogout.data) {
                navigate('/LoginForm')
                localStorage.removeItem('loggedData')
                localStorage.removeItem('token')
            }
        } catch (error) {
            console.log(error?.response?.data?.message || error?.message);
        }
    }

    return (
        <div style={{ backgroundColor: '#1A202C', minHeight: '100vh', color: '#E2E8F0' }}>
            {/* Navbar */}

            <AppBar position="static" style={{ backgroundColor: '#2D3748', borderBottom: '1px solid #4A5568' }}>
                <Toolbar>
                    <Tooltip title='BACK TO HOME'>
                        <Button onClick={() => navigate('/')} startIcon={<ArrowLeft />} sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }}>Back to Home</Button>
                    </Tooltip>
                    <div style={{ flexGrow: 1 }} />
                    <Typography sx={{ mr: 2, fontWeight: 700 }}>{adminDetails?.userInfo?.username}</Typography>
                    <Tooltip title="LOGOUT">
                        <IconButton color="inherit" onClick={handleLogout}>
                            <Logout />
                        </IconButton>
                    </Tooltip>
                    <Button color="inherit" startIcon={<Avatar src="" />} endIcon={<ChevronRight />}>
                        {isLoggedIn?.email}
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <div style={{ padding: '24px' }}>
                <Grid container spacing={3}>
                    {/* Stats Cards */}
                    {[
                        { icon: <People />, title: 'Total Users', value: '2,543', color: '#1B9AF5' },
                        { icon: <Work />, title: 'Projects', value: '182', color: '#9F7AEA' },
                        { icon: <Help />, title: 'Q&A Entries', value: '856', color: '#48BB78' },
                        { icon: <Business />, title: 'Employees', value: '124', color: '#ECC94B' },
                    ].map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: `${stat.color}10`, padding: '8px', borderRadius: '8px' }}>
                                        {React.cloneElement(stat.icon, { style: { color: stat.color, fontSize: '24px' } })}
                                    </div>
                                    <div style={{ marginLeft: '16px' }}>
                                        <Typography variant="body2" sx={{ color: 'white', fontWeight: 700, opacity: 0.8 }}>{stat.title}</Typography>
                                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, opacity: 0.8 }}>{stat.value}</Typography>
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Q&A Management and Recent Projects */}
                <Grid container spacing={3} style={{ marginTop: '24px' }}>
                    <Grid item xs={12} md={6}>
                        <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px' }}>
                            <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 700, opacity: 0.8 }}>Q&A Management</Typography>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ color: 'white' }}>
                                        <TextField fullWidth label="Question" variant="outlined" sx={{
                                            backgroundColor: '#4A5568', borderRadius: '4px', color: 'white', fontWeight: 700, opacity: 0.8,
                                            input: { color: "#ffffff", fontSize: "18px", padding: "12px" }, // Text color (white)
                                            label: { color: "white" }, // Label color (grayish)
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "#4caf50" }, // Default border color (green)
                                                "&:hover fieldset": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                "&.Mui-focused fieldset": { borderColor: "#2196f3" }, // Focused border color (blue)
                                            },
                                        }}
                                            name='question'
                                            onChange={handleFormData} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ color: 'white' }}>
                                        <TextField fullWidth label="Answer" variant="outlined" multiline rows={4} sx={{
                                            backgroundColor: '#4A5568', borderRadius: '4px', color: 'white', fontWeight: 700, opacity: 0.8,
                                            input: { color: "white", fontSize: "18px", padding: "12px" }, // Text color (white)
                                            label: { color: "white" }, // Label color (grayish)
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "#4caf50", color: 'white' }, // Default border color (green)
                                                "&:hover fieldset": { borderColor: "#ff9800", color: 'white' }, // Hover border color (orange)
                                                "&.Mui-focused fieldset": { borderColor: "#2196f3", color: 'white' }, // Focused border color (blue)
                                            },
                                        }}
                                            name='answer'
                                            onChange={handleFormData} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined" style={{
                                            backgroundColor: '#4A5568', borderRadius: '4px',
                                            input: { color: "#ffffff" }, // Text color (white)
                                            label: { color: "white" }, // Label color (grayish)
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "#4caf50" }, // Default border color (green)
                                                "&:hover fieldset": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                "&.Mui-focused fieldset": { borderColor: "#2196f3" }, // Focused border color (blue)
                                            },
                                        }}>
                                            <InputLabel sx={{
                                                input: { color: "#ffffff" }, // Text color (white)
                                                label: { color: "white" }, // Label color (grayish)
                                                "& .MuiOutlinedInput-root": {
                                                    "& fieldset": { borderColor: "#4caf50" }, // Default border color (green)
                                                    "&:hover fieldset": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                    "&.Mui-focused fieldset": { borderColor: "#2196f3" }, // Focused border color (blue)
                                                },
                                            }}>Category</InputLabel>
                                            <Select label="Category"
                                                defaultValue=""
                                                onChange={handleFormData}
                                                name='category'
                                                sx={{
                                                    color: "#ffffff", // Selected text color (white)
                                                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4caf50" }, // Default border color (green)
                                                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2196f3" }, // Focused border color (blue)
                                                }}>
                                                <MenuItem value="react">React</MenuItem>
                                                <MenuItem value="html">HTML</MenuItem>
                                                <MenuItem value="css">CSS</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" type='submit' style={{ backgroundColor: '#1B9AF5' }}>Submit Q&A</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px', height: '100%', width: '100%' }}>
                            <Box
                                sx={{
                                    backgroundColor: "#4A5568", // Dark theme
                                    borderRadius: "4px",
                                    width: "100%",
                                    height: "100%",
                                    padding: "10px", // Add padding for spacing
                                    overflowX: "auto", // Enable horizontal scrolling
                                }}
                            >
                                <pre
                                    style={{
                                        backgroundColor: "transparent", // Keeps the same background
                                        borderRadius: "4px",
                                        margin: 0,
                                        padding: "10px",
                                        color: "#ffffff", // White text for readability
                                        fontFamily: "Courier New, monospace",
                                    }}
                                >

                                </pre>
                            </Box>

                        </Paper>
                    </Grid>
                </Grid>


                <Grid container sx={{ mt: 2 }} spacing={3}>
                    {/* Add Projects */}
                    <Grid item md={6} xs={12}>
                        <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px' }}>
                            <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 700, opacity: 0.8 }}>Project Manage</Typography>
                            <form onSubmit={handleProjectSubmit} encType='multipart/form-data'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sx={{ color: 'white' }}>
                                        <TextField fullWidth label="Title" variant="outlined" sx={{
                                            backgroundColor: '#4A5568', borderRadius: '4px', color: 'white', fontWeight: 700, opacity: 0.8,
                                            input: { color: "#ffffff", fontSize: "18px", padding: "12px" }, // Text color (white)
                                            label: { color: "white" }, // Label color (grayish)
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "#4caf50" }, // Default border color (green)
                                                "&:hover fieldset": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                "&.Mui-focused fieldset": { borderColor: "#2196f3" }, // Focused border color (blue)
                                            },
                                            '& .MuiInputBase-root': {
                                                color: 'white', // Input text color
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white', // Label text color
                                            },
                                        }}
                                            name='title'
                                            onChange={handleProjects} />
                                    </Grid>
                                    <Grid item xs={12} sx={{ color: 'white' }}>
                                        <TextField fullWidth label="Description" variant="outlined" multiline rows={4} sx={{
                                            backgroundColor: '#4A5568', borderRadius: '4px', color: 'white', fontWeight: 700, opacity: 0.8,
                                            input: { color: "white", fontSize: "18px", padding: "12px" }, // Text color (white)
                                            label: { color: "white" }, // Label color (grayish)
                                            "& .MuiOutlinedInput-root": {
                                                "& fieldset": { borderColor: "#4caf50", color: 'white' }, // Default border color (green)
                                                "&:hover fieldset": { borderColor: "#ff9800", color: 'white' }, // Hover border color (orange)
                                                "&.Mui-focused fieldset": { borderColor: "#2196f3", color: 'white' }, // Focused border color (blue)
                                            },
                                            '& .MuiInputBase-root': {
                                                color: 'white', // Input text color
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: 'white', // Label text color
                                            },
                                        }}
                                            name='description'
                                            onChange={handleProjects} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item md={6} xs={12}>
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <FormControl fullWidth variant="outlined" style={{
                                                        backgroundColor: '#4A5568', borderRadius: '4px',
                                                        input: { color: "#ffffff" }, // Text color (white)
                                                        label: { color: "white" }, // Label color (grayish)
                                                        "& .MuiOutlinedInput-root": {
                                                            "& fieldset": { borderColor: "#4caf50" }, // Default border color (green)
                                                            "&:hover fieldset": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                            "&.Mui-focused fieldset": { borderColor: "#2196f3" }, // Focused border color (blue)
                                                        },
                                                    }}>
                                                        <InputLabel sx={{
                                                            input: { color: "#ffffff" }, // Text color (white)
                                                            label: { color: "white" }, // Label color (grayish)
                                                            "& .MuiOutlinedInput-root": {
                                                                "& fieldset": { borderColor: "#4caf50" }, // Default border color (green)
                                                                "&:hover fieldset": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                                "&.Mui-focused fieldset": { borderColor: "#2196f3" }, // Focused border color (blue)
                                                            },
                                                        }}>Status</InputLabel>
                                                        <Select label="Status"
                                                            defaultValue=""
                                                            onChange={handleProjects}
                                                            name='status'
                                                            sx={{
                                                                color: "#ffffff", // Selected text color (white)
                                                                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4caf50" }, // Default border color (green)
                                                                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ff9800" }, // Hover border color (orange)
                                                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#2196f3" }, // Focused border color (blue)
                                                            }}>
                                                            <MenuItem value="Pending">Pending</MenuItem>
                                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                                            <MenuItem value="Completed">Completed</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </Box>
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField fullWidth label="Url" variant="outlined" type='url' sx={{
                                                    backgroundColor: '#4A5568', borderRadius: '4px', color: 'white', fontWeight: 700, opacity: 0.8,
                                                    input: { color: "white", fontSize: "18px", padding: "12px" }, // Text color (white)
                                                    label: { color: "white" }, // Label color (grayish)
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": { borderColor: "#4caf50", color: 'white' }, // Default border color (green)
                                                        "&:hover fieldset": { borderColor: "#ff9800", color: 'white' }, // Hover border color (orange)
                                                        "&.Mui-focused fieldset": { borderColor: "#2196f3", color: 'white' }, // Focused border color (blue)
                                                    },
                                                    '& .MuiInputBase-root': {
                                                        color: 'white', // Input text color
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: 'white', // Label text color
                                                    },
                                                }}
                                                    name='url'
                                                    onChange={handleProjects} />
                                            </Grid>
                                        </Grid>
                                        <FileAndArrayUpload file={imageFile} setFile={setImageFile} />
                                        {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.4 }}>
                                            <Images handleImageChange={handleImageChange} />
                                        </Box> */}
                                        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3 }}>
                                            <Typography variant="h6" component={motion.h5} sx={{ color: 'white', opacity: 0.8, fontWeight: 600 }} gutterBottom>
                                                Project Skills
                                            </Typography>

                                            <TagsInput
                                                allTags={availableTags}
                                                initialTags={selectedTags}
                                                onTagsChange={setSelectedTags}
                                                placeholder="Search or add skills..."
                                                maxTags={10}
                                                tagColor="secondary"
                                                sx={{ mb: 2, color: 'white' }}
                                            />

                                            <Typography variant="body2" sx={{ color: 'white', opacity: 0.6, fontWeight: 600 }}>
                                                Selected skills: {selectedTags.join(', ')}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography sx={{ color: 'white', fontWeight: 700, opacity: 0.7 }}>{projectError}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" type='submit' style={{ backgroundColor: '#1B9AF5' }}>Submit Project</Button>
                                    </Grid>
                                </Grid>
                                {isUploading && (
                                    <Box sx={{ mt: 2 }}>
                                        <LinearProgress variant="determinate" value={uploadProgress} />
                                        <Typography variant="caption" sx={{ mt: 0.5 }}>
                                            {uploadProgress}% complete
                                        </Typography>
                                    </Box>
                                )}
                            </form>
                        </Paper>
                    </Grid>

                    {/* Recent Projects */}
                    <Grid item md={6} xs={12}>
                        <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px' }}>
                            <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 600, opacity: 0.7 }}>Recent Projects</Typography>
                            <Grid container spacing={2}>
                                {projectData && projectData.length > 0 ? projectData.map((project, index) => (
                                    <Grid item xs={12} sm={12} key={index}>
                                        <Paper style={{ backgroundColor: '#4A5568', padding: '16px', borderRadius: '8px' }}>
                                            <a href={project?.url}>
                                                <img src={project?.image?.url} alt={project?.title} style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '8px' }} />
                                            </a>
                                            <Typography variant="subtitle1" style={{ marginTop: '8px', color: 'white', fontWeight: 600, opacity: 0.7 }}>{project?.title}</Typography>
                                            <Typography variant="body2" style={{ color: '#A0AEC0' }}>Progress: {project?.description}</Typography>
                                            <Box sx={{ display: 'block', mt: 1.3 }}>
                                                {project?.tags?.map((tag, ind) => (
                                                    <Typography component={motion.button} sx={{ m: 0.3 }} key={ind}>{tag}</Typography>
                                                ))}
                                            </Box>
                                            <div style={{ width: '100%', backgroundColor: '#718096', borderRadius: '4px', height: '8px', marginTop: '8px' }}>
                                                <div style={{ width: `${project?.status === 'In Progress' ? '50' : "100"}%`, backgroundColor: '#1B9AF5', borderRadius: '4px', height: '8px' }} />
                                            </div>
                                        </Paper>
                                    </Grid>
                                )).splice(0, 2) : null}
                            </Grid>
                            {/* {projectData.data.map((ite, index) => (
                                <img src={ite.image} alt="image" />
                            )
                            )} */}
                        </Paper>
                    </Grid>
                </Grid>

                {/* Upload Library */}
                <UploadLibrary />

                {/* Resume Information */}
                {/* <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px', marginTop: '24px' }}>
                    <Typography variant="h6" style={{ marginBottom: '16px' }}>Resume Information</Typography>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Full Name" variant="outlined" style={{ backgroundColor: '#4A5568', borderRadius: '4px' }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Email" variant="outlined" style={{ backgroundColor: '#4A5568', borderRadius: '4px' }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Experience (Years)" variant="outlined" type="number" style={{ backgroundColor: '#4A5568', borderRadius: '4px' }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth label="Skills" variant="outlined" multiline rows={4} style={{ backgroundColor: '#4A5568', borderRadius: '4px' }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <input type="file" style={{ display: 'none' }} id="profile-photo" />
                                <label htmlFor="profile-photo">
                                    <Button variant="outlined" component="span" fullWidth style={{ backgroundColor: '#4A5568', color: '#E2E8F0', borderColor: '#4A5568' }}>
                                        Upload Profile Photo
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" style={{ backgroundColor: '#1B9AF5' }}>Save Resume</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper> */}

                <FileUploadComponent />
                {/* <PDFManager /> */}
                {/* <PDFPreview /> */}
                {/* Employee Data */}
                <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px', marginTop: '24px' }}>
                    <Typography variant="h6" style={{ marginBottom: '16px' }}>Employee Data</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Employee</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Project</TableCell>
                                    <TableCell>Performance</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[
                                    { image: 'https://creatie.ai/ai/api/search-image?query=A professional headshot of a young business woman with a confident expression&width=80&height=80&orientation=squarish&flag=2b071cf6-3fa5-445c-81b5-e383494a43b7', name: 'Sarah Johnson', department: 'Development', project: 'Analytics Dashboard', performance: 'Excellent' },
                                    { image: 'https://creatie.ai/ai/api/search-image?query=A professional headshot of a middle-aged business man with glasses&width=80&height=80&orientation=squarish&flag=124892a6-3f59-413d-832a-71acbf4c0052', name: 'Michael Chen', department: 'Design', project: 'Mobile App', performance: 'Good' },
                                ].map((employee, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar src={employee.image} style={{ marginRight: '8px' }} />
                                                {employee.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>{employee.project}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" style={{ backgroundColor: employee.performance === 'Excellent' ? '#48BB7810' : '#ECC94B10', color: employee.performance === 'Excellent' ? '#48BB78' : '#ECC94B', padding: '4px 8px', borderRadius: '12px', display: 'inline-block' }}>
                                                {employee.performance}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>


            <Footer />
        </div >
    );
};

export default AdminDashboard;


// title: 'Modern Landing Page',
//         description: 'A Modern Landing Page is a visually appealing and highly optimized web page designed to capture user attention, generate leads, and drive conversions. It follows a minimalistic, fast, and responsive design approach while incorporating interactive elements for enhanced user engagement.',
//         image: temp1,
//         price: '$49',
//         rating: 5,
//         reviews: 128,
//         id: 1,
//         tags: ['React', 'Firebase.js', 'Material UI'],




const CustomFileUpload = ({ handleProjects }) => {

    return (
        <motion.label
            htmlFor="file"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                height: '57px',
                width: '290px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                cursor: 'pointer',
                border: '2px dashed #e8e8e8',
                backgroundColor: '#212121',
                padding: '1.5rem',
                borderRadius: '10px',
                // boxShadow: '0px 48px 35px gray',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Upload sx={{ height: 20, width: 20, color: '#e8e8e8' }} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 400, color: '#e8e8e8' }}>
                    Click to upload image
                </Typography>
            </Box>
            <input
                id="file"
                type="file"
                style={{ display: 'none' }}
                name='project'
                onChange={handleProjects}
            />
        </motion.label>
    );
};

const Images = ({ handleImageChange }) => {
    // <!-- From Uiverse.io by csemszepp --> 
    return (
        <label for="file" className="custum-file-upload">
            <div className="icon">
                <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
            </div>
            <div className="text">
                <span>Click to upload image</span>
            </div>
            <input id="file" type="file" name='image' onChange={handleImageChange} />
        </label>
    )
}