import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { Mail, Instagram, Twitter, GitHub } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const Card = styled(motion.div)(({ theme }) => ({
    width: 280,
    height: 280,
    background: 'white',
    borderRadius: 32,
    padding: 3,
    position: 'relative',
    boxShadow: `${theme.palette.grey[400]}30 0px 70px 30px -50px`,
    transition: 'all 0.5s ease-in-out',
}));

const ProfilePic = styled(motion.div)(({ theme }) => ({
    position: 'absolute',
    width: 'calc(100% - 6px)',
    height: 'calc(100% - 6px)',
    top: 3,
    left: 3,
    borderRadius: 29,
    zIndex: 1,
    border: `0px solid ${theme.palette.primary.light}`,
    overflow: 'hidden',
}));

const Bottom = styled(motion.div)(({ theme }) => ({
    position: 'absolute',
    bottom: 3,
    left: 3,
    right: 3,
    background: theme.palette.primary.light,
    top: '80%',
    borderRadius: 29,
    zIndex: 2,
    boxShadow: `${theme.palette.grey[400]}30 0px 5px 5px 0px inset`,
    overflow: 'hidden',
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
    color: 'white',
    '&:hover': {
        color: theme.palette.primary.dark,
        transform: 'scale(1.2)',
    },
}));

const ContactButton = styled(Button)(({ theme }) => ({
    background: 'white',
    color: theme.palette.primary.light,
    borderRadius: 20,
    fontSize: '0.6rem',
    padding: '0.4rem 0.6rem',
    boxShadow: `${theme.palette.grey[400]}22 0px 5px 5px 0px`,
    textTransform: 'none',
    '&:hover': {
        background: theme.palette.primary.dark,
        color: 'white',
    },
}));



export const ProfileCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const name = "John Doe"
    const about = "Frontend developer passionate about creating beautiful and user-friendly interfaces"
    const imageUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

    return (
        <Card
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            animate={{
                borderTopLeftRadius: isHovered ? 55 : 32,
            }}
        >
            <IconButton
                sx={{
                    position: 'absolute',
                    right: '2rem',
                    top: '1.4rem',
                    zIndex: 3,
                    color: 'primary.light',
                    '&:hover': {
                        color: 'primary.dark',
                    },
                }}
            >
                <Mail />
            </IconButton>

            <ProfilePic
                animate={{
                    width: isHovered ? 100 : 'calc(100% - 6px)',
                    height: isHovered ? 100 : 'calc(100% - 6px)',
                    top: isHovered ? 10 : 3,
                    left: isHovered ? 10 : 3,
                    borderRadius: isHovered ? '50%' : 29,
                    border: isHovered ? '7px solid' : '0px solid',
                    borderColor: 'primary.light',
                }}
                whileHover={{
                    scale: isHovered ? 1.3 : 1,
                    borderRadius: isHovered ? 0 : 29,
                }}
            >
                {imageUrl ? (
                    <Box
                        component="img"
                        src={imageUrl}
                        alt={name}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transform: isHovered ? 'scale(2.5)' : 'scale(1)',
                            transition: 'transform 0.5s ease-in-out',
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h3" color="white">
                            {name[0].toUpperCase()}
                        </Typography>
                    </Box>
                )}
            </ProfilePic>

            <Bottom
                animate={{
                    top: isHovered ? '20%' : '80%',
                    borderRadius: isHovered ? '80px 29px 29px 29px' : 29,
                }}
            >
                <Box sx={{ p: 3, height: 160 }}>
                    <Typography variant="h6" color="white" fontWeight="bold">
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="white"
                        sx={{ mt: 2, fontSize: '0.9rem' }}
                    >
                        {about}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: '1.5rem',
                        right: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <SocialButton size="small">
                            <Instagram />
                        </SocialButton>
                        <SocialButton size="small">
                            <Twitter />
                        </SocialButton>
                        <SocialButton size="small">
                            <GitHub />
                        </SocialButton>
                    </Box>
                    <ContactButton variant="contained">
                        Contact Me
                    </ContactButton>
                </Box>
            </Bottom>
        </Card>
    );
};