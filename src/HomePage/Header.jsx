import { useEffect, useMemo, useState } from 'react';
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
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material';
// import { Menu as MenuIcon, Moon, User } from 'lucide-react';
import { LinearScale, Person } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from 'axios';
import lightTheme from '../theme/lightTheme';
import darkTheme from '../theme/darkTheme';
import { useThemeContext } from '../theme/themeContext';
import { LayoutDashboard, LogIn, LogOut, Sun, SunMoon } from 'lucide-react';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import { page } from './Routes';




export const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [userData, setUserData] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('')

    const { mode, toggleTheme } = useThemeContext();

    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const matches = useMediaQuery('(min-width:600px)');

    useEffect(() => {
        try {
            const raw = localStorage.getItem('loggedData');
            if (!raw) {
                console.log('Logged Data is not found');
                return;
            }

            const getLocalstorageData = JSON.parse(raw);

            if (getLocalstorageData?.userInfo?.role === 'admin') {
                setUserData(getLocalstorageData);
                setIsLoggedIn(getLocalstorageData?.userInfo?.loggedIn);
            } else {
                setUserData(getLocalstorageData);
                setIsLoggedIn(getLocalstorageData?.loggedIn);
            }
        } catch (err) {
            console.error('Failed to parse loggedData from localStorage:', err);
        }
    }, []);


    const handleLogOut = async () => {
        try {
            if (userData?.userInfo?.role === 'admin') {
                const tok = JSON.parse(localStorage.getItem('token'))
                setToken(tok)
            } else {
                const tok1 = localStorage.getItem('token')
                setToken(tok1)
            }
            console.log(token);

            await apiIntance.post(`/auth/logout`, {})
                .then((res) => {
                    navigate('/LoginForm')
                    localStorage.removeItem('loggedData')
                    localStorage.removeItem('token')
                })
                .catch((err) => {
                    console.log(err.response?.data?.message || err?.message);
                })
        } catch (err) {
            console.log(err.response?.data?.message || err?.message);
        }
        // navigate('/LoginForm')
    }

    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role);
    }, [])

    const handleLogIn = () => {
        navigate('/LoginForm')
    }

    const handleDashboard = () => {
        if (role === 'admin') {
            navigate('/Dashboard')
        }
    }

    return (
        <AppBar position="fixed" sx={{
            backdropFilter: 'blur(1.4px)',
            WebkitBackdropFilter: 'blur(1.4px)',
            backgroundColor: mode === 'light'
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(0, 0, 0, 0.4)',
        }} >
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
                            {page?.map((it, ina) => (
                                <MenuItem onClick={() => navigate(it?.link)}>
                                    <Typography key={`${ina}-${it}`} textAlign="center">{it.title}</Typography>
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
                                {page.map(link => (
                                    <Button
                                        onClick={() => navigate(link.link)}
                                        sx={{ color: 'text.primary', display: 'block', fontWeight: 600 }}
                                    >
                                        {link.title}
                                    </Button>
                                ))}
                            </Box>
                        </motion.div>
                    </Box>

                    <Box sx={{ display: 'flex', gap: { xs: 0, md: 2 } }}>
                        {/* <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <IconButton color="primary"> */}
                        {/* <DarkMode size={20} /> */}
                        {/* </IconButton>
                        </motion.div> */}
                        <Tooltip title='Theme'>
                            <IconButton
                                variant="contained"
                                color="default"
                                onClick={toggleTheme}
                            >
                                {mode === 'light' ?
                                    <SunMoon />
                                    : <Sun />}
                            </IconButton>
                        </Tooltip>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: { xs: 0, md: 2 } }}>
                                {/* <div style={{ display: role ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                    <Typography sx={{ color: 'black', fontWeight: 800, opacity: 0.6 }}>Username: </Typography>
                                    <Typography sx={{ color: 'black', fontWeight: 700, opacity: 0.6 }}>{isLoggedIn?.username}</Typography>
                                </div> */}
                                {/* <Button onClick={() => localStorage.removeItem('loggedData')}>remove</Button> */}
                                {role ?
                                    <>
                                        <Tooltip title={role && "Dashboard"}>
                                            <Button sx={{ display: { xs: 'none', md: 'flex' } }} variant='outlined' disabled={role !== 'admin'} onClick={handleDashboard}>Dashboard</Button>
                                            <IconButton sx={{ display: { xs: 'flex', md: 'none' } }} >
                                                <LayoutDashboard size={22} />
                                            </IconButton>
                                        </Tooltip>
                                    </>
                                    : null}
                                <Box>
                                    <Tooltip title={role ? "LogOut" : 'LogIn'}>
                                        <Button
                                            variant="contained"
                                            startIcon={<Person size={20} />}
                                            sx={{ px: 3, display: { xs: 'none', md: 'flex' } }}
                                            onClick={role ? handleLogOut : handleLogIn}
                                        >
                                            {role ? 'LogOut' : 'LogIn'}
                                        </Button>
                                        <IconButton sx={{ display: { xs: 'flex', md: 'none' } }}>
                                            {role ? <LogOut size={22} /> : <LogIn size={22} />}
                                        </IconButton>
                                    </Tooltip>
                                </Box>

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
    { title: 'Api Derectory', ref: '/ApiDirectory' },
    { title: 'LibraryPoint', ref: '/LibraryPoint' },
    { title: 'Interview', ref: '/Interview' },
]