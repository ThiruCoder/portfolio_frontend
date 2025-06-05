import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    FormControl,
    Box,
    IconButton
} from '@mui/material';

import {
    User,
    Shield,
    BellRing,
    Globe,
    Palette,
    Moon,
    Sun,
    Save
} from 'lucide-react';
import { useTheme } from '../UI/ThemeContext';


const Settings = ({ top }) => {
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { id: 'profile', label: 'Profile', icon: <User size={18} /> },
        { id: 'security', label: 'Security', icon: <Shield size={18} /> },
        { id: 'notifications', label: 'Notifications', icon: <BellRing size={18} /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
        { id: 'domains', label: 'Domains', icon: <Globe size={18} /> }
    ];

    return (
        <Box sx={{ p: 3, pt: 12 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">Settings</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Save size={18} />}
                >
                    Save Changes
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Settings
                            </Typography>
                            <List>
                                {navItems.map((item, index) => (
                                    <ListItemButton
                                        key={item.id}
                                        selected={item.id === 'appearance'}
                                    >
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={9}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Appearance</Typography>
                            <Typography variant="body2" color="text.secondary" mb={3}>
                                Customize how your dashboard looks and feels
                            </Typography>

                            <Box mb={4}>
                                <Typography fontWeight="bold" mb={1}>Theme Mode</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} md={4}>
                                        <Button
                                            variant={theme === 'light' ? 'outlined' : 'contained'}
                                            fullWidth
                                            onClick={() => theme === 'dark' && toggleTheme()}
                                            startIcon={<Sun size={18} />}
                                        >
                                            Light
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} md={4}>
                                        <Button
                                            variant={theme === 'dark' ? 'outlined' : 'contained'}
                                            fullWidth
                                            onClick={() => theme === 'light' && toggleTheme()}
                                            startIcon={<Moon size={18} />}
                                        >
                                            Dark
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Button
                                            variant="text"
                                            fullWidth
                                        >
                                            System
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mb={4}>
                                <Typography fontWeight="bold" mb={1}>Primary Color</Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {['blue', 'indigo', 'purple', 'teal', 'green', 'amber', 'red', 'gray'].map((color, i) => (
                                        <IconButton
                                            key={i}
                                            sx={{
                                                bgcolor: `${color}.main`,
                                                color: '#fff',
                                                width: 40,
                                                height: 40,
                                                '&:hover': { opacity: 0.8 }
                                            }}
                                        >
                                            {color === 'blue' && (
                                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </IconButton>
                                    ))}
                                </Box>
                            </Box>

                            <Box mb={4}>
                                <Typography fontWeight="bold" mb={1}>Sidebar Position</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <Card variant="outlined">
                                            <CardContent align="center">
                                                <Typography fontWeight="bold">Left Sidebar</Typography>
                                                <Typography variant="caption" color="text.secondary">Default layout</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Card variant="outlined">
                                            <CardContent align="center">
                                                <Typography fontWeight="bold">Right Sidebar</Typography>
                                                <Typography variant="caption" color="text.secondary">Alternative layout</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box mb={4}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" sx={{ fontWeight: 'bold', mb: 1 }}>Content Density</FormLabel>
                                    <RadioGroup defaultValue="default" name="density">
                                        <FormControlLabel value="default" control={<Radio />} label="Default - Standard spacing between elements" />
                                        <FormControlLabel value="compact" control={<Radio />} label="Compact - Reduced spacing for more content" />
                                        <FormControlLabel value="comfortable" control={<Radio />} label="Comfortable - More spacing for readability" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>

                            <Box>
                                <Typography fontWeight="bold" mb={1}>Animation Settings</Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="body2">Enable animations</Typography>
                                    <Switch defaultChecked />
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2">Reduce motion</Typography>
                                    <Switch />
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Settings;
