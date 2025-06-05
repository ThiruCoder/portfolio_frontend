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
import { useDispatch, useSelector } from 'react-redux';
import { libData } from '../ReduxPalace/Reducer';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';

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
    const [currentPage, setCurrentPage] = useState(1)
    const [showItems, setShowItems] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [research, setResearch] = useState(false)

    const { data } = useSelector((state) => state.libs)
    const dispatch = useDispatch();


    useEffect(() => {
        const getLibraryData = async () => {
            try {
                const response = await apiIntance.get(`/postLib/getLib`)
                if (response && response.data) {
                    const data = response.data
                    setLibraryData(data)
                    // console.log('response.data.data', response.data.data);
                    // dispatch(libData(response.data.data))
                    // data.forEach(element => dispatch(libData(element)));
                    // console.log('isarray', isarray);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getLibraryData()
    }, [refresh, research])


    const itemsPerpage = 6;
    const startIndex = (currentPage - 1) * itemsPerpage;
    const endIndex = startIndex + itemsPerpage;
    const LibraryData = libraryData?.length > 0 ? libraryData?.slice(startIndex, endIndex) : null
    const handlePagination = (event, value) => {
        setCurrentPage(value)
    }


    const debouncing = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
    const DeBouncing = (value) => {
        if (value === '') return setRefresh((prev) => !prev)

        const filtered = libraryData.filter(item =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        setLibraryData(filtered)

    }


    const HandleDebouncing = debouncing(DeBouncing, 250)
    const handleChange = (e) => {
        const { value } = e.target;
        if (value) setResearch((prev) => !prev)
        HandleDebouncing(value)
    }
    return (
        <>
            <Header />
            {/* <ThemeProvider theme={theme}> */}
            <CssBaseline />

            <Box sx={{ flexGrow: 1, pt: 12 }}>

                <Container maxWidth="lg" sx={{ mb: 8 }}>
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
                            onKeyUp={handleChange}
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
                        {showItems ?
                            <>

                                {LibraryData && LibraryData.length > 0 ? LibraryData.map((lib, index) => (
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
                                                    <Typography variant="h6" sx={{ ml: 2, textOverflow: 'ellipsis', overflow: 'hidden', lineClamp: 1, whiteSpace: 'nowrap' }}>
                                                        {lib.title}
                                                    </Typography>
                                                </Box>
                                                <Typography color="text.secondary" sx={{ textOverflow: 'ellipsis', overflow: 'hidden', lineClamp: 4, whiteSpace: 'wrap', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', boxOrient: 'vertical' }} paragraph>
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
                                )) :
                                    <Box sx={{ position: 'relative', top: '100%', left: '50%', transform: 'translate(-50%, -50%)', mt: 8 }}>
                                        <Typography variant='h4'>No data is available</Typography>
                                    </Box>
                                }
                            </>
                            : null}
                    </Grid>

                </Container>
                <Stack spacing={2} sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {LibraryData && LibraryData?.length > 0 ?
                        <Pagination count={Math.floor(libraryData?.length / itemsPerpage)} onChange={handlePagination} color="primary" />
                        : null}
                </Stack>
            </Box>
            <Footer />
            {/* </ThemeProvider> */}
        </>
    );
}

export default LibraryPoint;