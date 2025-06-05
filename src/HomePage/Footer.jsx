import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Grid, Typography, Link, TextField, Button, Tooltip } from '@mui/material';
import { GitHub, Twitter, LinkedIn, Email, Mail } from '@mui/icons-material';
import pass from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { page } from './Routes';
import { useTheme } from '@mui/material/styles';
import { Send } from 'lucide-react';
import Swal from 'sweetalert2'
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()
    const theme = useTheme();
    const navigte = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    function fromDataLoad(e) {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const res = await apiIntance.post('/send/mail', formData);
        if (res) {
            setFormData({
                name: '',
                email: '',
                message: ''
            })
            Swal.fire({
                title: 'Message sent!',
                text: 'Thanks for reaching out!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }
    return (
        <Box
            component="footer"
            sx={{ backgroundColor: theme.footer.primary, color: theme.footer.secondary, py: 6 }}
        >
            <Box
                sx={{
                    maxWidth: '1536px',
                    mx: 'auto',
                    px: { xs: 2, sm: 3, lg: 4 },
                }}
            >
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <motion.div whileHover={{ scale: 1.1 }} style={{ width: 62, height: 62 }}>
                            <img
                                src={pass}
                                alt="Logo"
                                style={{ height: 62, width: 62, marginBottom: '16px', borderRadius: 50 }}
                            />
                        </motion.div>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7, pt: 2 }}>
                            Building modern web experiences with cutting-edge technologies.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7 }} gutterBottom>
                            Quick Links
                        </Typography>

                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            {page.map((link, index) => (
                                <motion.li key={index} whileHover={{ x: 5, backgroundColor: 'transparent' }}>
                                    <Link href={link.link} color="inherit" underline="hover" sx={{ display: 'block', py: 0.5, fontWeight: 700, opacity: 0.7 }}>
                                        {link.title}
                                    </Link>
                                </motion.li>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7 }} gutterBottom>
                            Connect
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {[
                                { icon: <GitHub sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7, '&:hover': { color: 'aquamarine' } }} />, title: 'GitHub', label: 'GitHub', ref: 'https://github.com/ThiruCoder' },
                                { icon: <Mail sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7, '&:hover': { color: 'aquamarine' } }} />, title: 'Mail to', label: 'Twitter', ref: 'mailto:thiruthedeveloper@gmail.com' },
                                { icon: <LinkedIn sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7, '&:hover': { color: 'aquamarine' } }} />, title: 'Linkdin', label: 'LinkedIn', ref: 'www.linkedin.com/in/thirumalesh-charipalli-a7a127350' },
                            ].map((item) => (
                                <motion.div key={item.label} whileHover={{ scale: 1.2, backgroundColor: 'transparent' }} style={{ backgroundColor: 'transparent' }}>
                                    <Tooltip title={item?.title}>
                                        <Link href={item?.ref} sx={{ color: 'theme.footer.secondary', ':hover': { backgroundColor: 'transparent' } }}>
                                            {item.icon}
                                        </Link>
                                    </Tooltip>
                                </motion.div>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7 }} gutterBottom>
                            Newsletter
                        </Typography>
                        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                type="text"
                                placeholder="Enter your Fullname"
                                variant="outlined"
                                name='name'
                                fullWidth
                                onChange={fromDataLoad}
                                value={formData.name}
                                sx={{
                                    backgroundColor: theme.footer.primary,
                                    input: { color: theme.footer.secondary, height: 10, },
                                    '& label': { color: '#aaaaaa' },            // Label color
                                    '& label.Mui-focused': { color: '#90caf9' },// Label on focus
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#90caf9' },
                                        '&:hover fieldset': { borderColor: '#f48fb1' },
                                        '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                                    },
                                }}
                            />
                            <TextField
                                type="email"
                                placeholder="Enter your email"
                                variant="outlined"
                                fullWidth
                                onChange={fromDataLoad}
                                value={formData.email}
                                name='email'
                                sx={{
                                    backgroundColor: theme.footer.primary,
                                    input: { color: theme.footer.secondary, height: 10, },
                                    '& label': { color: '#aaaaaa' },            // Label color
                                    '& label.Mui-focused': { color: '#90caf9' },// Label on focus
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#90caf9' },
                                        '&:hover fieldset': { borderColor: '#f48fb1' },
                                        '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                                    },
                                }}
                            />
                            <TextField
                                type="text"
                                placeholder="Enter message"
                                variant="outlined"
                                fullWidth
                                onChange={fromDataLoad}
                                value={formData.message}
                                name='message'
                                sx={{
                                    backgroundColor: theme.footer.primary,
                                    input: { color: theme.footer.secondary, height: 10, },
                                    '& label': { color: '#aaaaaa' },            // Label color
                                    '& label.Mui-focused': { color: '#90caf9' },// Label on focus
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#90caf9' },
                                        '&:hover fieldset': { borderColor: '#f48fb1' },
                                        '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<Send size={15} />}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    '&:hover': { backgroundColor: 'primary.dark' },
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        mt: 4,
                        pt: 4,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'theme.footer.secondary', opacity: 0.7 }} >
                        &copy; {year} Portfolio. All rights reserved ( Charipalli Thirumalesh ).
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;