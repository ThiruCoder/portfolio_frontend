import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    Pagination,
    Stack,
    TextField,
    ThemeProvider,
    Toolbar,
    Typography,
    createTheme,
} from '@mui/material';
import {
    Android,
    ArrowForward,
    GitHub,
    Javascript,
    Language,
    LinkedIn,
    Search,
    Twitter,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Header } from '../HomePage/Header';
import Footer from '../HomePage/Footer';
import axios from 'axios';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1B9AF5',
        },
        background: {
            default: '#111827',
            paper: '#1F2937',
        },
    },
});

const MotionCard = motion(Card);

function LibraryPoint() {
    const [libraryData, setLibraryData] = useState([])

    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'

    useEffect(() => {
        const getLibraryData = async () => {
            try {
                await axios.get(`${backendUrl}/postLib/getLib`)
                    .then((res) => setLibraryData(res.data.data))
                    .catch((err) => console.log(err))
            } catch (error) {
                console.log(error);
            }
        }
        getLibraryData()
    }, [])


    return (
        <>
            <Header />
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <Box sx={{ flexGrow: 1 }}>

                    <Container maxWidth="lg" sx={{ mt: 15, mb: 8 }}>
                        <Typography
                            component={motion.h1}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            variant="h2"
                            align="center"
                            gutterBottom
                        >
                            Popular Development Libraries
                        </Typography>
                        <Typography
                            component={motion.p}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            variant="h6"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            A curated list of popular development libraries with detailed documentation and integration guides
                        </Typography>

                        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search libraries..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Grid container spacing={4}>
                            {libraryData && libraryData.length > 0 ? libraryData.map((lib, index) => (
                                <Grid item xs={12} sm={12} md={6} lg={6} key={lib.name}>
                                    <MotionCard
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                <Typography variant="h6" sx={{ ml: 2 }}>
                                                    {lib.title}
                                                </Typography>
                                            </Box>
                                            <Typography color="text.secondary" paragraph>
                                                {lib.description}
                                            </Typography>
                                            <Link
                                                href={lib.url}
                                                target="_blank"
                                                rel="noopener"
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    color: 'primary.main',
                                                    textDecoration: 'none',
                                                    '&:hover': { textDecoration: 'underline' },
                                                }}
                                            >
                                                Learn more
                                                <ArrowForward sx={{ ml: 1, fontSize: 16 }} />
                                            </Link>
                                        </CardContent>
                                    </MotionCard>
                                </Grid>
                            )) : null}
                        </Grid>

                    </Container>
                    <Stack spacing={2} sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Pagination count={10} color="primary" />
                    </Stack>
                </Box>
                <Footer />
            </ThemeProvider>
        </>
    );
}

export default LibraryPoint;