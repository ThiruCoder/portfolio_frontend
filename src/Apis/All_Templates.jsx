import React, { useContext } from 'react';
import { color, motion } from 'framer-motion';
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
    Checkbox,
    FormControlLabel,
    Slider,
    Divider,
    CardHeader,
} from '@mui/material';
import {
    Search as SearchIcon,
    Star as StarIcon,
    StarHalf as StarHalfIcon,
    StarBorder as StarBorderIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Twitter as TwitterIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    GitHub as GitHubIcon,
    Favorite,
} from '@mui/icons-material';
import { Header } from '../HomePage/Header';
import Footer from '../HomePage/Footer';
import temp1 from '../assets/template1.png'
import { useNavigate } from 'react-router-dom';
import { FetchContext } from '../Context';

const TemplateMarketplace = () => {
    const navigate = useNavigate();
    const { projects } = useContext(FetchContext)
    console.log(projects);


    const handleParams = (id) => {
        navigate(`/ProjectView/${id}`)

    }
    return (
        <Box sx={{ backgroundColor: '#111827', color: '#F3F4F6', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, width: '100%', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4, position: 'relative', top: 50 }}>
                <Grid container spacing={2}>
                    {/* Filters Sidebar */}
                    <Grid item xs={12} md={3} >
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, opacity: 0.7 }}>
                                Categories
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'relative', top: 7 }}>
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: 'white', fontWeight: 700 }} />} label="Landing Pages" />
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: 'white', fontWeight: 700 }} />} label="E-commerce" />
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: 'white', fontWeight: 700 }} />} label="Portfolios" />
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: 'white', fontWeight: 700 }} />} label="Admin Dashboards" />
                            </Box>

                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, opacity: 0.7, mt: 4, mb: 1 }}>
                                Price Range
                            </Typography>
                            <Slider
                                defaultValue={[0, 100]}
                                min={0}
                                max={100}
                                valueLabelDisplay="auto"
                                sx={{ color: '#1B9AF5' }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Typography sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} variant="body2">$0</Typography>
                                <Typography sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} variant="body2">$100</Typography>
                            </Box>

                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, opacity: 0.7, position: 'relative', top: 10, pb: 1 }}>
                                Features
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: '#1B9AF5' }} />} label="Responsive" />
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: '#1B9AF5' }} />} label="Dark Mode" />
                                <FormControlLabel sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }} control={<Checkbox sx={{ color: '#1B9AF5' }} />} label="RTL Support" />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Templates Grid */}
                    <Grid item xs={12} md={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 700, color: 'white', opacity: 0.8 }}>
                                All Templates
                            </Typography>
                            <Select
                                defaultValue="popular"
                                sx={{
                                    backgroundColor: '#374151',
                                    color: '#F3F4F6',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1B9AF5' },
                                }}
                            >
                                <MenuItem value="popular">Most Popular</MenuItem>
                                <MenuItem value="newest">Newest First</MenuItem>
                                <MenuItem value="price-low">Price: Low to High</MenuItem>
                                <MenuItem value="price-high">Price: High to Low</MenuItem>
                            </Select>
                        </Box>
                        <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                            {projects.map((template, index) => (
                                <Paper key={index} sx={{ backgroundColor: '#1F2937', borderRadius: 2, overflow: 'hidden', width: 430 }}>
                                    <motion.div whileHover={{ scale: 1.02 }}>
                                        <Box sx={{ position: 'relative' }}>
                                            <img src={template.image} alt={template.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    '&:hover': { opacity: 1 },
                                                }}
                                            >
                                                <Button onClick={() => handleParams(template?.id)} variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                                    Preview
                                                </Button>
                                            </Box>
                                        </Box>
                                        <Box sx={{ p: 3 }}>
                                            <CardHeader
                                                title={<Typography variant="h6" sx={{ color: 'white', fontWeight: 600, opacity: 0.7 }}>
                                                    {template?.title}
                                                </Typography>}
                                                subheader={<Typography variant="h6" sx={{ color: 'ivory', opacity: 0.6, fontWeight: 700 }}>
                                                    {template?.price}
                                                </Typography>}
                                                action={
                                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, position: 'relative', top: 12 }}>
                                                        <Favorite sx={{ color: 'white', fontWeight: 700, opacity: 0.8 }} />
                                                        <Typography sx={{ color: 'ivory', opacity: 0.6, fontWeight: 700 }}>{template?.rating}</Typography>
                                                    </Box>
                                                } />
                                        </Box>
                                    </motion.div>
                                </Paper>
                            ))}
                        </Grid>


                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton sx={{ backgroundColor: '#374151', '&:hover': { backgroundColor: '#1B9AF5' } }} disabled>
                                    <ChevronLeftIcon />
                                </IconButton>
                                <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                    1
                                </Button>
                                <Button variant="outlined" sx={{ color: '#F3F4F6', borderColor: '#374151', '&:hover': { borderColor: '#1B9AF5' } }}>
                                    2
                                </Button>
                                <Button variant="outlined" sx={{ color: '#F3F4F6', borderColor: '#374151', '&:hover': { borderColor: '#1B9AF5' } }}>
                                    3
                                </Button>
                                <IconButton sx={{ backgroundColor: '#374151', '&:hover': { backgroundColor: '#1B9AF5' } }}>
                                    <ChevronRightIcon />
                                </IconButton>
                            </Box>
                            <Select
                                defaultValue="12"
                                sx={{
                                    backgroundColor: '#374151',
                                    color: '#F3F4F6',
                                    borderRadius: 1,
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1B9AF5' },
                                }}
                            >
                                <MenuItem value="12">12 per page</MenuItem>
                                <MenuItem value="24">24 per page</MenuItem>
                                <MenuItem value="48">48 per page</MenuItem>
                            </Select>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Footer */}
            <Footer />
        </Box >
    );
};

export default TemplateMarketplace;

const tempates = [
    {
        name: 'Modern Landing Page',
        image: temp1,
        price: '$49',
        rating: 5,
        reviews: 128,
        id: 1
    },
    {
        name: 'E-commerce Pro',
        image: 'https://creatie.ai/ai/api/search-image?query=A sleek e-commerce template showcasing product grid layouts, shopping cart interface, and checkout process. The design features a dark mode aesthetic with accent colors and product cards with hover effects.&width=600&height=400&orientation=landscape&flag=3e9bf261-f440-4db4-a030-676847a4b7d0',
        price: '$79',
        rating: 4,
        reviews: 94,
        id: 2
    },
    {
        name: 'Portfolio Plus',
        image: 'https://creatie.ai/ai/api/search-image?query=A creative portfolio template with masonry grid layout, project showcase sections, and about me page. The design incorporates subtle animations, full-width imagery, and professional typography for artists and designers.&width=600&height=400&orientation=landscape&flag=54d1a2df-af2d-45ed-818c-437e072317e1',
        price: '$39',
        rating: 4.5,
        reviews: 156,
        id: 3
    },
]
