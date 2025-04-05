import { useEffect, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material';
// import { Menu as MenuIcon, Moon, User } from 'lucide-react';
import { LinearScale, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from 'axios';

const page = { home: 'Home', about: 'About', project: 'Projects', templates: 'Templates', apiDerectory: 'Api Directory', Interview: 'Interview' }


export const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState([])

    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const matches = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        const getLocalstorageData = JSON.parse(localStorage.getItem('loggedData'))
        setIsLoggedIn(getLocalstorageData)
    }, [])
    console.log('isLoggedIn', isLoggedIn);

    const handleLogOut = async () => {
        try {
            localStorage.removeItem('loggedData')
            const getLogout = await axios.post('https://porfolio-backend-spbi.onrender.com/auth/logout', {})
            if (getLogout.data) {
                navigate('/LoginForm')
            }
        } catch (error) {
            console.log(error.message);
        }
        // navigate('/LoginForm')
    }

    const handleLogIn = () => {
        navigate('/LoginForm')
    }

    return (
        <AppBar position="fixed" sx={{ bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginRight: matches ? 0 : 10, position: 'relative', left: matches ? 0 : 16 }}
                    >
                        <Link href='/'>
                            <Avatar src={logo} alt="Logo" sx={{ height: 32, width: 32, position: 'relative', right: 20 }} />
                        </Link>
                    </motion.div>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <LinearScale />
                        </IconButton>

                        <Menu
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages?.map((it, ina) => (
                                <MenuItem onClick={() => navigate(it?.ref)}>
                                    <Typography key={ina} textAlign="center">{it.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    onClick={() => navigate('/')}
                                    sx={{ color: 'text.primary', display: 'block' }}
                                >
                                    {page?.home}
                                </Button>
                                <Button
                                    onClick={() => navigate('/About')}
                                    sx={{ color: 'text.primary', display: 'block' }}
                                >
                                    {page?.about}
                                </Button>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: 'text.primary', display: 'block' }}
                                >
                                    {page?.project}
                                </Button>
                                <Button
                                    onClick={() => navigate('/All_Templates')}
                                    sx={{ color: 'text.primary', display: 'block' }}
                                >
                                    {page?.templates}
                                </Button>
                                <Button
                                    onClick={() => navigate('/ApiDirectory')}
                                    sx={{ color: 'text.primary', display: 'block' }}
                                >
                                    {page?.apiDerectory}
                                </Button>
                                <Button
                                    onClick={() => navigate('/Interview')}
                                    sx={{ color: 'text.primary', display: 'block' }}
                                >
                                    {page?.Interview}
                                </Button>
                            </Box>
                        </motion.div>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <IconButton color="primary">
                                {/* <DarkMode size={20} /> */}
                            </IconButton>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                <div style={{ display: isLoggedIn?.loggedIn ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Typography sx={{ color: 'black', fontWeight: 800, opacity: 0.6 }}>Username: </Typography>
                                    <Typography sx={{ color: 'black', fontWeight: 700, opacity: 0.6 }}>{isLoggedIn?.username}</Typography>
                                </div>

                                <Button
                                    variant="contained"
                                    startIcon={<Person size={20} />}
                                    sx={{ px: 3 }}
                                    onClick={isLoggedIn?.loggedIn ? handleLogOut : handleLogIn}
                                >
                                    {isLoggedIn?.loggedIn ? 'Logout' : 'Login'}
                                </Button>
                            </Box>
                            {/* <Button onClick={handleLogOut}>loggedOut</Button> */}
                        </motion.div>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const pages = [
    { title: 'Home', ref: '/' },
    { title: 'About', ref: '/About' },
    { title: 'Projects', ref: '' },
    { title: 'Templates', ref: '/All_Templates' },
    { title: 'Api Derectory', ref: '/ApiDirectory' }
]