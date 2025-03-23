import React, { Fragment, useEffect, useState } from 'react';
import { AppBar, styled, Toolbar, Typography, IconButton, Avatar, Button, Grid, Paper, TextField, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, hexToRgb, Box } from '@mui/material';
import { Notifications, People, Work, Help, Business, Add, ChevronRight, ArrowLeft, Instagram, Upload } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { auth, database } from '../Firebase/Firebase_config';
import { onAuthStateChanged } from 'firebase/auth';
import { get, push, ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Footer from '../HomePage/Footer';


const AdminDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [formData, setFormData] = useState([])
    useEffect(() => {
        const unSubcriber = onAuthStateChanged(auth, (urrentUser) => {
            setIsLoggedIn(urrentUser)
        })
        return () => unSubcriber()
    }, [])

    const navigate = useNavigate()
    console.log(isLoggedIn?.email);

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


    return (
        <div style={{ backgroundColor: '#1A202C', minHeight: '100vh', color: '#E2E8F0' }}>
            {/* Navbar */}

            <AppBar position="static" style={{ backgroundColor: '#2D3748', borderBottom: '1px solid #4A5568' }}>
                <Toolbar>
                    <Button onClick={() => navigate('/')} startIcon={<ArrowLeft />} sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }}>Back to Home</Button>
                    <div style={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <Notifications />
                        <motion.span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', backgroundColor: '#1B9AF5', borderRadius: '50%' }} />
                    </IconButton>
                    <Button color="inherit" startIcon={<Avatar src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a business person with a warm smile, wearing formal attire, against a neutral background&width=80&height=80&orientation=squarish&flag=effd4f8a-d803-4af5-972a-b1e49e60cc6a" />} endIcon={<ChevronRight />}>
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
                            <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 700, opacity: 0.8 }}>Q&A Management</Typography>
                            <form onSubmit={handleSubmit}>
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
                                        }}
                                            name='title'
                                            onChange={handleFormData} />
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
                                        }}
                                            name='description'
                                            onChange={handleFormData} />
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
                                                        }}>Category</InputLabel>
                                                        <Select label="Tags"
                                                            defaultValue=""
                                                            onChange={handleFormData}
                                                            name='tags'
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

                                                </Box>
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <CustomFileUpload />
                                            </Grid>
                                        </Grid>



                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" type='submit' style={{ backgroundColor: '#1B9AF5' }}>Submit Q&A</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>

                    {/* Recent Projects */}
                    <Grid item md={6} xs={12} sx={{ marginTop: 6 }}>
                        <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px' }}>
                            <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 600, opacity: 0.7 }}>Recent Projects</Typography>
                            <Grid container spacing={2}>
                                {[
                                    { image: 'https://creatie.ai/ai/api/search-image?query=A modern web application interface mockup with clean design elements, showing dashboard analytics and data visualization&width=400&height=300&orientation=landscape&flag=7b0325f9-d6d6-4a09-91d0-cc0c81bdf313', title: 'Analytics Dashboard', progress: 75 },
                                    { image: 'https://creatie.ai/ai/api/search-image?query=A mobile app user interface design showing social media features and interaction elements&width=400&height=300&orientation=landscape&flag=c1e053dc-d864-4a5a-b4ba-b43d9b4f1fcf', title: 'Mobile App', progress: 40 },
                                ].map((project, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Paper style={{ backgroundColor: '#4A5568', padding: '16px', borderRadius: '8px' }}>
                                            <img src={project.image} alt={project.title} style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '8px' }} />
                                            <Typography variant="subtitle1" style={{ marginTop: '8px' }}>{project.title}</Typography>
                                            <Typography variant="body2" style={{ color: '#A0AEC0' }}>Progress: {project.progress}%</Typography>
                                            <div style={{ width: '100%', backgroundColor: '#718096', borderRadius: '4px', height: '8px', marginTop: '8px' }}>
                                                <div style={{ width: `${project.progress}%`, backgroundColor: '#1B9AF5', borderRadius: '4px', height: '8px' }} />
                                            </div>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Resume Information */}
                <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px', marginTop: '24px' }}>
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
                </Paper>

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




const CustomFileUpload = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            // Handle file upload logic here
        }
    };

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
                onChange={handleFileChange}
            />
        </motion.label>
    );
};