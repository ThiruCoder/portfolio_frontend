import React from 'react';
import { motion } from 'framer-motion';
import { Box, Grid, Typography, Link, TextField, Button, Tooltip } from '@mui/material';
import { GitHub, Twitter, LinkedIn, Email, Mail } from '@mui/icons-material';
import pass from '../assets/logo.png'

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear()


    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'rgba(28, 34, 42, 0.5)',
                py: 6,
                color: 'text.secondary',
            }}
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
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <img
                                src={pass}
                                alt="Logo"
                                style={{ height: '32px', width: 'auto', marginBottom: '16px' }}
                            />
                        </motion.div>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'white', opacity: 0.7 }}>
                            Building modern web experiences with cutting-edge technologies.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', opacity: 0.7 }} gutterBottom>
                            Quick Links
                        </Typography>
                        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                            {['Home', 'Projects', 'Templates', 'Api Directory'].map((link) => (
                                <motion.li key={link} whileHover={{ x: 5 }}>
                                    <Link href="#" color="inherit" underline="hover" sx={{ display: 'block', py: 0.5, fontWeight: 700, color: 'white', opacity: 0.7 }}>
                                        {link}
                                    </Link>
                                </motion.li>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', opacity: 0.7 }} gutterBottom>
                            Connect
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {[
                                { icon: <GitHub sx={{ fontWeight: 700, color: 'white', opacity: 0.7, '&:hover': { color: 'aquamarine' } }} />, title: 'GitHub', label: 'GitHub', ref: 'https://github.com/ThiruCoder' },
                                { icon: <Mail sx={{ fontWeight: 700, color: 'white', opacity: 0.7, '&:hover': { color: 'aquamarine' } }} />, title: 'Mail to', label: 'Twitter', ref: 'mailto:thiruthedeveloper@gmail.com' },
                                { icon: <LinkedIn sx={{ fontWeight: 700, color: 'white', opacity: 0.7, '&:hover': { color: 'aquamarine' } }} />, title: 'Linkdin', label: 'LinkedIn', ref: 'www.linkedin.com/in/thirumalesh-charipalli-a7a127350' },
                            ].map((item) => (
                                <motion.div key={item.label} whileHover={{ scale: 1.2 }}>
                                    <Tooltip title={item?.title}>
                                        <Link href={item?.ref} color="inherit">
                                            {item.icon}
                                        </Link>
                                    </Tooltip>
                                </motion.div>
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', opacity: 0.7 }} gutterBottom>
                            Newsletter
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                type="email"
                                placeholder="Enter your email"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    backgroundColor: 'rgba(165, 167, 170, 0.7)',
                                    input: { color: 'text.secondary' },
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                        '&:hover fieldset': { borderColor: 'primary.main' },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<Email />}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    '&:hover': { backgroundColor: 'primary.dark' },
                                }}
                            >
                                Subscribe
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
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'white', opacity: 0.7 }} >
                        &copy; {year} Portfolio. All rights reserved ( Charipalli Thirumalesh ).
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;