import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { LogIn, Sun, SunMoon } from 'lucide-react';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
// import { LocalRoute } from '@/app/Components/LocalRoutes';
import { Divider, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../theme/themeContext';
import { page } from '../../HomePage/Routes';
import logo from '../../assets/logo.png'
import { motion } from 'framer-motion';

const settings = ['projects', 'skills', 'resume', 'contact', 'analytics', 'settings'];

const LocalRoute = [
    { title: 'Home', link: '/' },
    { title: 'About', link: '/About' },
    { title: 'Projects', link: '/Projects' },
    { title: 'Templates', link: '/All_Templates' },
    { title: 'Api Directory', link: '/ApiDirectory' },
    { title: 'Interview', link: '/Interview' },
    { title: 'Libraries', link: '/Libraries' },
    { title: 'Dashboard', link: '/Dashboard' },
]

export const DashboardHeader = ({ setActivePage }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const navigate = useNavigate();
    const { mode, toggleTheme } = useThemeContext();

    {/*'analytics'*/ }
    const pages = ['projects', 'skills', 'resume', 'contact', 'settings'];
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    console.log('anchorElNav', anchorElNav);

    const matches = useMediaQuery('(min-width:1200px)')
    return (
        <AppBar position="fixed" sx={{
            backdropFilter: 'blur(1.4px)',
            WebkitBackdropFilter: 'blur(1.4px)',
            backgroundColor: mode === 'light'
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(0, 0, 0, 0.4)',
        }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ marginRight: matches ? 0 : 10, position: 'relative', left: matches ? 4 : 16, }}
                    >
                        <Link href='/'>
                            <Avatar src={logo} alt="Logo" sx={{ height: 32, width: 32, position: 'relative', mr: 3 }} />
                        </Link>
                    </motion.div>
                    {/* { sm: 'none', lg: 'flex' } */}
                    <Box sx={{ flexGrow: 1, display: { sm: 'flex', lg: 'none', md: 'flex', xs: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="text.primary"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            PaperProps={{
                                sx: {
                                    maxHeight: '88vh',         // Max height of screen
                                    height: '88vh',            // Full height of screen
                                    overflowY: 'auto',          // Scroll if content overflows
                                    mt: 2,                      // Optional: spacing from button
                                    borderRadius: 0,            // Optional: remove border radius
                                }
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'block', lg: 'none', sm: 'block' }, height: 'auto', }}
                        >
                            {page.map(link => (
                                <MenuItem key={link.title} onClick={() => {
                                    navigate(link.link);
                                    handleCloseNavMenu();
                                }} sx={{ width: 250 }}>
                                    <Typography textAlign="center">{link.title}</Typography>
                                </MenuItem>
                            ))}
                            <Divider />
                            {pages.map(page => (
                                <MenuItem key={page} onClick={() => {
                                    setActivePage(page);
                                    handleCloseNavMenu();
                                }}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                    </Box>
                    <Box sx={{ flexGrow: 1, display: { sm: 'none', lg: 'flex', xs: 'none' }, alignItems: 'center' }}>

                        {page.map(link => (
                            <Button
                                key={link.title}
                                onClick={() => navigate(link.link)}
                                sx={{ my: 2, color: 'text.primary', display: 'block', fontWeight: 600 }}
                            >
                                {link.title}
                            </Button>
                        ))}
                        <Divider orientation='vertical' sx={{ width: 12, height: 40, }} />
                        <Box sx={{ ml: 2, display: 'flex', flexDirection: 'row' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => setActivePage(page)}
                                    sx={{ my: 2, color: 'text.primary', display: 'block', fontWeight: 700, }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    <IconButton
                        variant="contained"
                        color="default"
                        onClick={toggleTheme}
                    >
                        {mode === 'light' ?
                            <SunMoon />
                            : <Sun />}
                    </IconButton>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="SignIn">
                            <Link to="/LoginForm" onClick={handleOpenUserMenu} style={{ backgroundColor: 'transparent' }}>

                                <IconButton sx={{ bgcolor: 'transparent' }}>
                                    <LogIn width={20} />
                                </IconButton>

                            </Link>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default DashboardHeader;
