import React, { useState } from 'react';
import { clamp, motion } from 'framer-motion';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    Paper,
    IconButton,
    Grid,
    Tooltip,
    CardMedia
} from '@mui/material';
import {
    Email,
    LinkedIn,
    GitHub,
    Twitter,
    Instagram,
    YouTube,
    Phone,
    Work,
    WorkOutline
} from '@mui/icons-material';
import './contact.css'
import thiruqr from '../assets/thiruqr.png'

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    const socialLinks = [
        { icon: <Instagram />, url: "https://www.instagram.com/thiru_king1/", tool: 'Instagram' },
        { icon: <GitHub />, url: "https://github.com/ThiruCoder", tool: 'GitHub' },
        { icon: <YouTube />, url: "www.youtube.com/@ThiruSoftCode", tool: 'YouTube' },
        { icon: <Email />, url: "mailto:thiruthedeveloper@gmail.com", tool: 'Email' },
        { icon: <Phone />, url: "tel:7696583293", tool: 'Phone' },
        { icon: <Work />, url: "https://www.naukri.com/mnjuser/profile?id=&altresid", tool: 'Naukary' },
        { icon: <WorkOutline />, url: "www.linkedin.com/in/thirumalesh-charipalli-a7a127350", tool: 'LinkedIn' },

    ];

    return (
        <Box sx={{ py: 4 }} className="py-16">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="h3" component="h2" className="text-center mb-12" sx={{ textAlign: 'center', fontWeight: 700, color: 'white', opacity: 0.8, my: 4 }}>
                    Get in Touch
                </Typography>

                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
                    <Grid md={6}>
                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Paper elevation={3} className="p-6">
                                <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', fontWeight: 700, opacity: 0.6, color: 'black', position: 'relative', py: 3 }} gutterBottom>
                                    Connect With Me
                                </Typography>
                                {/* <Typography variant="body1" sx={{ fontWeight: 700, opacity: 0.6, color: 'black', ml: 3 }} paragraph>
                                    Feel free to reach out through any of these platforms:
                                </Typography> */}
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <CardMedia component={'img'} sx={{ width: 'clamp(255px, 100px,4rem)' }} image={thiruqr} />
                                </Box>

                                <Box className="flex gap-4 justify-center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    {socialLinks.map((link, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Tooltip title={link?.tool}>
                                                <IconButton
                                                    color="primary"
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    size="large"
                                                >
                                                    {link.icon}
                                                </IconButton>
                                            </Tooltip>
                                        </motion.div>
                                    ))}
                                </Box>
                            </Paper>
                        </motion.div>
                    </Grid>
                    <Grid md={6} class="form-card1">
                        <div class="form-card2">
                            <form class="form">
                                <p class="form-heading">Get In Touch</p>

                                <div class="form-field">
                                    <input required="" placeholder="Name" class="input-field" type="text" />
                                </div>

                                <div class="form-field">
                                    <input
                                        required=""
                                        placeholder="Email"
                                        class="input-field"
                                        type="email"
                                    />
                                </div>

                                <div class="form-field">
                                    <input
                                        required=""
                                        placeholder="Subject"
                                        class="input-field"
                                        type="text"
                                    />
                                </div>

                                <div class="form-field">
                                    <textarea
                                        required=""
                                        placeholder="Message"
                                        cols="30"
                                        rows="3"
                                        class="input-field"
                                    ></textarea>
                                </div>

                                <button class="sendMessage-btn">Send Message</button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </motion.div>
        </Box>
    );
};

export default ContactSection;