import React, { useState } from 'react';
import { motion, transform } from 'framer-motion';
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Button,
    IconButton,
    Avatar,
    Grid,
    Paper,
    TextField,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Pagination,
    Stack,
    CardHeader,
} from '@mui/material';
import {
    Search as SearchIcon,
    CheckCircle as CheckCircleIcon,
    SyncAlt as SyncAltIcon,
    AccessTime as AccessTimeIcon,
    ShoppingCart as ShoppingCartIcon,
    TrendingUp as TrendingUpIcon,
    Lock as LockIcon,
    Public as PublicIcon,
    Key as KeyIcon,
    Add as AddIcon,
    Help as HelpIcon,
    GitHub as GitHubIcon,
    Twitter as TwitterIcon,
    Person,
    Storage,
    NightsStay,
    Newspaper,
    Book,
    Movie,
    Pets,
    SportsSoccer,
    FormatQuote,
    SentimentVerySatisfied,
    Park,
    Image,
    Public,
    Collections,
    Google,
    BugReport,
    CurrencyBitcoin,
    Hotel,
    Assessment,
    LocationOn,
    AttachMoney
} from '@mui/icons-material';
import { Header } from '../HomePage/Header';
import { LineChart } from '@mui/x-charts'
import Footer from '../HomePage/Footer';

const ApiDirectory = () => {
    const [pageCount, setPageCount] = useState(1)
    const [relatedApi, setRelatedApi] = useState([])
    const [relative, setRelative] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [graphQl, setGraphQl] = useState(false)

    const itemsPerPage = 3;
    const handleChange = (e, value) => {
        setPageCount(value);
    };


    const startIndex = (pageCount - 1) * itemsPerPage;
    const visibleItems = projects.slice(startIndex, startIndex + itemsPerPage);

    const handleRelatedView = (id) => {
        const filtering = projects.filter(ite => ite?.id == id)
        setRelatedApi(filtering)
        setIsVisible(!isVisible)
        setRelative(!relative)
    }
    const handleBack = () => {
        setIsVisible(!isVisible)
        setRelative(!relative)
    }
    const handleSort = (e) => {
        const { value } = e.target;
        if (value === 'name') {
            projects.sort((a, b) => a.title.localeCompare(b.title));
            setRelatedApi(projects)
        }
        console.log('value', value);

    }
    const handleGraphQl = () => {
        setIsVisible(!isVisible);
        setGraphQl(!graphQl)
    }

    return (
        <Box sx={{ backgroundColor: '#111827', color: '#F3F4F6', minHeight: '100vh' }}>
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <Box sx={{ maxWidth: '1536px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4, mt: 8 }}>
                {/* Page Container */}
                <Typography variant='h4' sx={{ fontWeight: 700, opacity: 0.9, position: 'relative', bottom: 9 }}>API Collections</Typography>

                {/* Stats Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {preview.map((stat, index) => (
                        <Grid item xs={12} sm={6} lg={3} key={index}>
                            <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', opacity: 0.8 }}>
                                        {stat.title}
                                    </Typography>
                                    {stat.icon}
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 700, color: 'white', opacity: 0.6 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 1 }}>
                                    {stat.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Filter and Sort Bar */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                            All APIs
                        </Button>
                        <Button variant="outlined" sx={{ color: '#9CA3AF', borderColor: '#374151', '&:hover': { borderColor: '#1B9AF5' } }}>
                            REST
                        </Button>
                        <Button onClick={handleGraphQl} variant="outlined" sx={{ color: '#9CA3AF', borderColor: '#374151', '&:hover': { borderColor: '#1B9AF5' } }}>
                            GraphQL
                        </Button>
                        <Button variant="outlined" sx={{ color: '#9CA3AF', borderColor: '#374151', '&:hover': { borderColor: '#1B9AF5' } }}>
                            WebSocket
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Select
                            defaultValue="latest"
                            sx={{
                                backgroundColor: '#374151',
                                color: '#F3F4F6',
                                borderRadius: 1,
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1B9AF5' },
                            }}
                            onChange={handleSort}
                        >
                            <MenuItem value="latest">Sort by: Latest</MenuItem>
                            <MenuItem value="name">Sort by: Name</MenuItem>
                            <MenuItem value="popular">Sort by: Popular</MenuItem>
                        </Select>
                    </Box>
                </Box>

                {/* API Cards Grid */}
                <Grid container spacing={3}>

                    {visibleItems.map((api, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index} sx={{ display: isVisible ? 'none' : 'block' }}>
                            <motion.div whileHover={{ scale: 1.02, transform: 'translateY(15px)' }} initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 10 }}
                                exit={{ opacity: 0, y: 0 }}
                                transition={{ duration: 0.2 }}>
                                <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                {api.icon}
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', opacity: '0.8' }}>
                                                    {api.title}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor: '#10B981',
                                                    color: '#FFFFFF',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    mt: 1,
                                                    fontSize: 12,
                                                    width: 'fit-content',
                                                }}
                                            >
                                                {api.status}
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                            {api.version}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{
                                        color: '#9CA3AF', mt: 2, overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        lineClamp: 2,
                                        webkitBoxOrient: 'vertical'
                                    }}>
                                        {api.description}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {api.auth === 'OAuth 2.0' ? <LockIcon sx={{ color: '#9CA3AF', fontSize: 16 }} /> : <KeyIcon sx={{ color: '#9CA3AF', fontSize: 16 }} />}
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                {api.auth}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <PublicIcon sx={{ color: '#9CA3AF', fontSize: 16 }} />
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                {api.endpoint[0]}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                            {api.tags.map((tag, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        backgroundColor: tag === 'REST' ? '#DBEAFE' : tag === 'Auth' ? '#F3E8FF' : tag === 'Commerce' ? '#D1FAE5' : '#FEE2E2',
                                                        color: tag === 'REST' ? '#1E40AF' : tag === 'Auth' ? '#6B21A8' : tag === 'Commerce' ? '#065F46' : '#991B1B',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {tag}
                                                </Box>
                                            ))}
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'end', position: 'relative', top: 5 }}>
                                            <Button onClick={() => handleRelatedView(api?.id)}>{api?.more}</Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                    <Grid sx={{ ...styles?.pageBtn, mb: 8 }}>
                        <Stack marginBottom={2}>
                            <Pagination
                                onChange={handleChange}
                                page={pageCount}
                                sx={{
                                    "& .MuiPaginationItem-root": { color: "white", backgroundColor: 'Scrollbar' }, // Default text color
                                    "& .Mui-selected": { backgroundColor: "#1976d2", color: "white" }, // Active page styling
                                    "& .MuiPaginationItem-ellipsis": { color: "red" }, // Dots color
                                    position: 'relative',
                                    top: 50,
                                    display: isVisible ? 'none' : 'block'
                                }}
                                count={visibleItems?.length !== 0 ? Math.ceil(projects.length / itemsPerPage) : 3}
                                variant="outlined" color="primary" about='adf' />
                        </Stack>
                    </Grid>
                </Grid>

                {/* API View Cards Grid */}
                <Grid container spacing={3} >

                    {relatedApi.map((api, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={index} sx={{ position: 'relative', top: 16, display: relative ? 'block' : 'none' }}>
                            <motion.div whileHover={{ scale: 1.02, transform: 'translateX(15px)' }} initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                exit={{ opacity: 0, x: -100, y: -100 }}
                                transition={{ duration: 0.2 }}>
                                <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                {api.icon}
                                                <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', opacity: '0.8' }}>
                                                    {api.title}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    backgroundColor: '#10B981',
                                                    color: '#FFFFFF',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    mt: 1,
                                                    fontSize: 12,
                                                    width: 'fit-content',
                                                }}
                                            >
                                                {api.status}
                                            </Box>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                            {api.version}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{
                                        color: '#9CA3AF', mt: 2, overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        lineClamp: 2,
                                        webkitBoxOrient: 'vertical'
                                    }}>
                                        {api.description}
                                    </Typography>
                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {api.auth === 'OAuth 2.0' ? <LockIcon sx={{ color: '#9CA3AF', fontSize: 16 }} /> : <KeyIcon sx={{ color: '#9CA3AF', fontSize: 16 }} />}
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                {api.auth}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                            <PublicIcon sx={{ color: '#9CA3AF', fontSize: 16 }} />
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                {api.endpoint}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                            {api.tags.map((tag, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        backgroundColor: tag === 'REST' ? '#DBEAFE' : tag === 'Auth' ? '#F3E8FF' : tag === 'Commerce' ? '#D1FAE5' : '#FEE2E2',
                                                        color: tag === 'REST' ? '#1E40AF' : tag === 'Auth' ? '#6B21A8' : tag === 'Commerce' ? '#065F46' : '#991B1B',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    {tag}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>
                    ))}
                    <Grid item md={8} sx={{ position: 'relative', top: 16, display: relative ? 'block' : 'none', height: '100%' }}>
                        <motion.div whileHover={{ scale: 1.02, transform: 'translateX(-15px)' }} initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: -100, y: -100 }}
                            transition={{ duration: 0.2 }}>
                            <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2, height: '100%' }}>
                                {relatedApi.map((api, index) => (
                                    <>
                                        <CardHeader
                                            title={<Typography key={index} variant='h5' sx={{ fontWeight: 700, color: 'white', opacity: 0.8 }}>{api?.title}'s</Typography>}
                                            subheader={<Typography variant='body1' sx={{ fontWeight: 400, color: 'white', opacity: 0.4 }}>{api?.version}</Typography>}
                                            action={
                                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 8 }}>
                                                    <KeyIcon sx={{ color: '#9CA3AF', fontSize: 16 }} />
                                                    <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                        {api.auth}
                                                    </Typography>
                                                </span>

                                            }
                                        />
                                        <Paper sx={{ bgcolor: 'gainsboro', opacity: 0.8, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))' }}>
                                            {api?.endpoint?.map((it, ind) => (
                                                <Box sx={{ p: 2 }}>
                                                    <a style={{ width: 100, backgroundColor: 'rgb(34, 34, 34)', color: 'white', opacity: 0.8, padding: 5.2, borderRadius: 5 }} key={ind} href={`https://${it}`}>{api?.title}</a>
                                                </Box>
                                            ))}
                                        </Paper>
                                    </>
                                ))}
                            </Paper>
                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', backgroundPositionX: 'right 90px', position: 'relative', top: 20, right: 8 }}>
                                <Button variant='contained' sx={{ bgcolor: 'ButtonHighlight' }} onClick={handleBack}>Back</Button>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Stack sx={{ width: '100%', display: graphQl ? 'block' : 'none' }}>
                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    area: true,
                                },
                            ]}
                            width={1000}
                            height={300}
                        />
                    </Stack>

                </Grid>
            </Box>

            {/* Floating Buttons */}
            <Box sx={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <IconButton sx={{ backgroundColor: '#1B9AF5', color: '#FFFFFF', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                    <AddIcon />
                </IconButton>
                <IconButton sx={{ backgroundColor: '#374151', color: '#FFFFFF', '&:hover': { backgroundColor: '#1B9AF5' } }}>
                    <HelpIcon />
                </IconButton>
            </Box>

            {/* Footer */}
            <Footer />

        </Box>
    );
};

export default ApiDirectory;

const projects = [
    {
        id: 1,
        title: "User's Management API",
        version: 'v2.1.0',
        description: 'A User Management API allows administrators to programmatically manage user accounts, roles, and permissions within a system, enabling tasks like creating, updating, and deleting users, as well as managing their access to resources.',
        icon: <Person sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['REST', 'Auth'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['https://dummyjson.com/users'],
        more: 'More'
    },
    {
        id: 2,
        title: "E-commerce's API",
        version: 'v3.0.1',
        description: 'E-commerce APIs are sets of tools and protocols that enable different applications and systems to communicate and exchange data with e-commerce platforms, facilitating seamless integration and data sharing.',
        icon: <ShoppingCartIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['REST', 'Commerce'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['shopyify.dev/docs/api', 'woocommerce.com/document/woocommerce-rest-api/'],
        more: 'More'
    },
    {
        id: 3,
        title: "Weather's API",
        version: 'v1.5.0',
        description: 'A Weather API provides real-time and forecasted weather data, including temperature, humidity, wind speed, and precipitation. Developers can use it to integrate weather updates into applications, websites, and smart devices.',
        icon: <NightsStay sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['GraphQL', 'Analytics'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['openweathermap.org', 'wunderground.com', 'rapidapi.com/weatherbit/api/weather'],
        more: 'More'
    },
    {
        id: 4,
        title: "News API",
        version: 'v1.5.0',
        description: 'A news API is a tool that allows developers to access and integrate live news data from various sources into their applications and websites, providing real-time access to headlines, articles, images, and videos.',
        icon: <Newspaper sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['GraphQL', 'Analytics'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developer.nytimes.com/api'],
        more: 'More'
    },
    {
        id: 5,
        title: "Book's API",
        version: 'v1.5.0',
        description: 'Books APIs are interfaces that allow developers to access and integrate book-related data and functionality into their applications, enabling features like full-text search, book information retrieval, and managing bookshelves.',
        icon: <Book sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['GraphQL', 'Analytics'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developers.google.com/books', 'openlibrary.org/developers/api'],
        more: 'More'
    },
    {
        id: 6,
        title: "Movie's API",
        version: 'v1.5.0',
        description: 'Movie APIs are tools that allow developers to access and integrate movie data (titles, descriptions, cast, ratings, etc.) into their applications, enabling features like movie searches, reviews, and showtime displays.',
        icon: <Movie sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['GraphQL', 'Analytics'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developers.themoviedb.org/docs/getting-starting', 'rapidapi.com/collection/rotten-tomatoees-api'],
        more: 'More'
    },
    {
        id: 7,
        title: "Dictionary's API",
        version: 'v1.5.0',
        description: 'A Dictionary API provides word definitions, antonyms, pronunciations, and translations.',
        icon: <Newspaper sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['GraphQL', 'Analytics'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developers.themoviedb.org/docs/getting-starting', 'dictionaryapi.com', 'developer.oxforddictionaries.com'],
        more: 'More'
    },
    {
        id: 8,
        title: "Google Search API",
        version: 'v3.0.0',
        description: "Retrieve Google search results programmatically, including web pages, images, and videos.",
        icon: <SearchIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['REST', 'Search'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developers.google.com/custom-search/v1/introduction'],
        more: 'More'
    },
    {
        id: 9,
        title: "Dog API",
        version: 'v2.2.0',
        description: "Get random dog images, facts, and breed information with this fun API.",
        icon: <Pets sx={{ color: '#F59E0B', fontSize: 32 }} />,
        tags: ['REST', 'Animals'],
        status: 'Active',
        auth: 'None',
        endpoint: ['thedogapi.com', 'dog.ceo/dog-api'],
        more: 'More'
    },
    {
        id: 10,
        title: "Cat API",
        version: 'v2.0.0',
        description: "Provides information, images, and facts about various cat breeds.",
        icon: <Pets sx={{ color: '#F87171', fontSize: 32 }} />,
        tags: ['REST', 'Animals'],
        status: 'Active',
        auth: 'None',
        endpoint: ['thecatapi.com'],
        more: 'More'
    },
    {
        id: 11,
        title: "Sports API",
        version: 'v3.1.0',
        description: "Access real-time and historical sports data including scores, teams, and player stats.",
        icon: <SportsSoccer sx={{ color: '#10B981', fontSize: 32 }} />,
        tags: ['REST', 'Sports'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['sportsdata.io', 'developer.sportradar.com/docs/read/home', 'api-sports.io', 'developer.nfi.com/get-started/overview'],
        more: 'More'
    },
    {
        id: 12,
        title: "Quotes API",
        version: 'v1.4.0',
        description: "Fetch famous quotes, author details, and inspirational sayings.",
        icon: <FormatQuote sx={{ color: '#1E40AF', fontSize: 32 }} />,
        tags: ['REST', 'Inspiration'],
        status: 'Active',
        auth: 'None',
        endpoint: ['quotable.io', 'zenquotes.io'],
        more: 'More'
    },
    {
        id: 13,
        title: "Joke API",
        version: 'v1.2.0',
        description: "Provides random jokes, programming humor, and dad jokes.",
        icon: <SentimentVerySatisfied sx={{ color: '#F59E0B', fontSize: 32 }} />,
        tags: ['REST', 'Fun'],
        status: 'Active',
        auth: 'None',
        endpoint: ['official-joke-api.appspot.com', 'sv443.net/jokeapi/v2/', 'dadjokes.io'],
        more: 'More'
    },
    {
        id: 14,
        title: "National Parks API",
        version: 'v2.1.0',
        description: "Explore national park details, including locations, activities, and images.",
        icon: <Park sx={{ color: '#065F46', fontSize: 32 }} />,
        tags: ['REST', 'Nature'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['nps.gov/developers/api', 'nps.gov/subjects/developer/api-documentation.htm'],
        more: 'More'
    },
    {
        id: 15,
        title: "Giphy SDK",
        version: 'v1.6.0',
        description: "Integrate trending and search-based GIFs in your app with Giphy SDK.",
        icon: <Image sx={{ color: '#DB2777', fontSize: 32 }} />,
        tags: ['REST', 'GIFs'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developers.giphy.com/branch/master/docs/sdk/'],
        more: 'More'
    },
    {
        id: 16,
        title: "REST Countries API",
        version: 'v2.5.0',
        description: "Get country data including population, languages, currency, and flags.",
        icon: <Public sx={{ color: '#0284C7', fontSize: 32 }} />,
        tags: ['REST', 'Geography'],
        status: 'Active',
        auth: 'None',
        endpoint: ['restcountries.com'],
        more: 'More'
    },
    {
        id: 17,
        title: "Gallery API",
        version: 'v1.0.0',
        description: "Fetch beautiful art and photography collections from various sources.",
        icon: <Collections sx={{ color: '#A855F7', fontSize: 32 }} />,
        tags: ['REST', 'Media'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['unsplash.com/developers', 'flickr.com/services/api/', 'developers.gettyimages.com', 'pexels.com/api'],
        more: 'More'
    },
    {
        id: 18,
        title: "Google API",
        version: 'v3.0.0',
        description: "Google APIs offer access to various services including Maps, Drive, and Calendar.",
        icon: <Google sx={{ color: '#EA4335', fontSize: 32 }} />,
        tags: ['REST', 'Search', 'Utilities'],
        status: 'Active',
        auth: 'OAuth 2.0',
        endpoint: ['developers.google.com/apis-explorer'],
        more: 'More'
    },
    {
        id: 19,
        title: "Test API",
        version: 'v1.0.0',
        description: "A free API for testing HTTP requests and responses.",
        icon: <BugReport sx={{ color: '#EF4444', fontSize: 32 }} />,
        tags: ['REST', 'Development'],
        status: 'Active',
        auth: 'None',
        endpoint: ['jsonplaceholder.typicode.com'],
        more: 'More'
    },
    {
        id: 20,
        title: "Coinbase API",
        version: 'v2.3.0',
        description: "Access cryptocurrency exchange rates, wallet balances, and transactions.",
        icon: <CurrencyBitcoin sx={{ color: '#FBBF24', fontSize: 32 }} />,
        tags: ['REST', 'Finance'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['developers.coinbase.com'],
        more: 'More'
    },
    {
        id: 21,
        title: "Hotels API",
        version: 'v2.7.0',
        description: "Search hotel listings, availability, and pricing from multiple sources.",
        icon: <Hotel sx={{ color: '#1B9AF5', fontSize: 32 }} />,
        tags: ['REST', 'Travel'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['rapidapi.com//apidojo/api/hotels4'],
        more: 'More'
    },
    {
        id: 22,
        title: "Data USA API",
        version: 'v2.0.0',
        description: "Access US government open data on demographics, economy, and education.",
        icon: <Assessment sx={{ color: '#9333EA', fontSize: 32 }} />,
        tags: ['REST', 'Data'],
        status: 'Active',
        auth: 'None',
        endpoint: ['datausa.io/about/api'],
        more: 'More'
    },
    {
        id: 23,
        title: "IP Info API",
        version: 'v1.3.0',
        description: "Retrieve location, ISP, and device details based on an IP address.",
        icon: <LocationOn sx={{ color: '#DC2626', fontSize: 32 }} />,
        tags: ['REST', 'Networking'],
        status: 'Active',
        auth: 'API Key',
        endpoint: ['ipinfo.io'],
        more: 'More'
    },
    {
        id: 24,
        title: "Money Transfer API",
        version: 'v2.0.1',
        description: 'A money transfer API enables secure and seamless transactions between bank accounts.',
        icon: <AttachMoney sx={{ color: '#4CAF50', fontSize: 32 }} />,
        tags: ['Payments', 'Finance', 'Banking', 'Remittance'],
        status: 'Active',
        auth: 'OAuth 2.0',
        endpoint: ['api.moneytransfer.com/v2', 'fixer.io'],
        more: 'More'
    }
]



const preview = [
    { title: 'Total APIs', value: '156', icon: <Storage sx={{ color: '#1B9AF5', fontSize: 32 }} />, description: '+12 this month' },
    { title: 'Active APIs', value: '142', icon: <CheckCircleIcon sx={{ color: '#10B981', fontSize: 32 }} />, description: '98% uptime' },
    { title: 'Total Requests', value: '2.4M', icon: <SyncAltIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, description: 'Last 30 days' },
    { title: 'Response Time', value: '245ms', icon: <AccessTimeIcon sx={{ color: '#FBBF24', fontSize: 32 }} />, description: 'Average' },
]

const remainingApi = [
    { id: 1, title: "Google Search API", endpoint: ["developers.google.com/custom-search",] },
    { id: 2, title: "Dog API", endpoint: ["thedogapi.com"] },
    { id: 3, title: "Cat API", endpoint: ["thecatapi.com"] },
    { id: 4, title: "Sports API", endpoint: ["sportsdata.io"] },
    { id: 5, title: "Quotes API", endpoint: ["quotable.io"] },
    { id: 6, title: "Joke API", endpoint: ["official-joke-api.appspot.com"] },
    { id: 7, title: "National Parks API", endpoint: ["nps.gov/developers/api"] },
    { id: 8, title: "Giphy SDK", endpoint: ["developers.giphy.com"] },
    { id: 9, title: "REST Countries API", endpoint: ["restcountries.com"] },
    { id: 10, title: "Gallery API", endpoint: ["unsplash.com/developers"] },
    { id: 11, title: "Google API", endpoint: ["developers.google.com/apis-explorer"] },
    { id: 12, title: "Test API", endpoint: ["jsonplaceholder.typicode.com"] },
    { id: 13, title: "Coinbase API", endpoint: ["developers.coinbase.com"] },
    { id: 14, title: "Hotels API", endpoint: ["rapidapi.com/hotels"] },
    { id: 15, title: "Data USA API", endpoint: ["datausa.io/api"] },
    { id: 16, title: "IP Info API", endpoint: ["ipinfo.io"] },
    { id: 17, title: "Weather API", endpoint: ["weatherapi.com"] },
    { id: 18, title: "Crypto Prices API", endpoint: ["cryptoprices.com"] },
    { id: 19, title: "Stock Market API", endpoint: ["stockapi.com"] },
    { id: 20, title: "Movie Database API", endpoint: ["themoviedb.org"] },
    { id: 21, title: "Music Streaming API", endpoint: ["musicstreamingapi.com"] },
    { id: 22, title: "Recipe API", endpoint: ["recipeapi.com"] },
    { id: 23, title: "Space Data API", endpoint: ["spacedataapi.com"] },
    { id: 24, title: "Language Translation API", endpoint: ["translationapi.com"] }
]


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pagination: {
        color: 'white',
        fontFamily: "Roboto, sans-serif",
        fontOpticalSizing: 'auto',
        fontWeight: 508,
        fontStyle: 'normal',
        fontVariationSettings:
            'wdth 75',
    },
    pageBtn: {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        gap: 6,
    }
}