import React from 'react';
import { Box, Typography, IconButton, Paper, Tooltip } from '@mui/material';
import { GitHub, Email, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import './hover.css'

const HoverCard = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '50vh',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                bgcolor: 'background.default',
            }}

        >


            <Paper
                component={motion.div}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
                transition={{ duration: 0.5 }}
                className='hoverBody'
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    textAlign: 'center',
                    p: 4,
                    maxWidth: 400,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                }}
            >
                <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    sx={{ color: 'text.secondary' }}
                >
                    <svg
                        width="64"
                        height="64"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </Box>

                <Box
                    component={motion.div}
                    initial={{ paddingBottom: 0 }}
                    whileHover={{ paddingBottom: 40 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='hoverer'
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        Charipalli Thirumalesh
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'black', fontWeight: 700, opacity: 0.8 }}>
                        @Frontend_developer
                    </Typography>
                    <Typography className='expe' sx={{ color: 'black', fontWeight: 700, opacity: 0.8, position: 'relative', top: 6, visibility: 'hidden' }}>2+ Experience</Typography>
                </Box>

                <Box
                    component={motion.div}
                    initial={{ bottom: '-100%' }}
                    whileHover={{ bottom: 12 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='openHover'
                    sx={{

                        display: 'flex',
                        visibility: 'hidden',
                        gap: 2,
                        justifyContent: 'center',
                        transition: '0.3s ease-in-out',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,

                            color: 'common.white',
                            p: 1,
                        }}
                    >
                        <Tooltip title='GitHub'>
                            <IconButton
                                component={motion.a}
                                href="https://github.com/ThiruCoder"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                sx={{ color: 'purple' }}
                            >
                                <GitHub />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Mail to'>
                            <IconButton
                                component={motion.a}
                                href="mailto:thiruthedeveloper@gmail.com"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                sx={{ color: 'purple' }}
                            >
                                <Email />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='LinkedIn'>
                            <IconButton
                                component={motion.a}
                                href="www.linkedin.com/in/thirumalesh-charipalli-a7a127350"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                sx={{ color: 'purple' }}
                            >
                                <LinkedIn />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default HoverCard;