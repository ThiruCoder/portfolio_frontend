import React from 'react';
import { motion } from 'framer-motion';
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
} from '@mui/material';
import {
    Search as SearchIcon,
    ShoppingCart as ShoppingCartIcon,
    Star as StarIcon,
    StarHalf as StarHalfIcon,
    StarBorder as StarBorderIcon,
    Facebook as FacebookIcon,
    Twitter as TwitterIcon,
    Instagram as InstagramIcon,
    LocalShipping as LocalShippingIcon,
    CardGiftcard as CardGiftcardIcon,
    Percent as PercentIcon,
    AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import logo from '../assets/logo.png'

const ECommerceStore = () => {
    return (
        <Box sx={{ backgroundColor: '#111827', color: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Navbar */}
            <AppBar position="static" sx={{ backgroundColor: '#1F2937', borderBottom: '1px solid #374151' }}>
                <Toolbar>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Avatar src={logo} alt="Logo" sx={{ height: 32, width: 32 }} />
                        <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
                            <Button color="inherit" sx={{ color: '#1B9AF5' }}>
                                Home
                            </Button>
                            <Button color="inherit">Shop</Button>
                            <Button color="inherit">Categories</Button>
                            <Button color="inherit">Deals</Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            placeholder="Search products..."
                            variant="outlined"
                            size="small"
                            sx={{
                                backgroundColor: '#374151',
                                borderRadius: 1,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'transparent' },
                                    '&:hover fieldset': { borderColor: '#1B9AF5' },
                                },
                                '& .MuiInputBase-input': { color: '#F3F4F6' },
                            }}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ color: '#9CA3AF', mr: 1 }} />,
                            }}
                        />
                        <IconButton sx={{ color: '#F3F4F6', position: 'relative' }}>
                            <ShoppingCartIcon />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    backgroundColor: '#1B9AF5',
                                    color: '#FFFFFF',
                                    borderRadius: '50%',
                                    fontSize: 12,
                                    width: 20,
                                    height: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                3
                            </Box>
                        </IconButton>
                        <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                            Sign In
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, maxWidth: '1536px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
                {/* Hero Section */}
                <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', height: 400, mb: 4 }}>
                    <img
                        src="https://creatie.ai/ai/api/search-image?query=A modern and minimalist 3D scene showcasing premium electronics and gadgets arranged elegantly against a clean, gradient background. The composition includes sleek laptops, smartphones, and headphones with subtle lighting effects&width=1440&height=480&orientation=landscape&removebg=true&flag=e03535c0-347f-4755-bbc0-2c962ce5f5cf"
                        alt="Hero banner"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to right, #111827, transparent)',
                            display: 'flex',
                            alignItems: 'center',
                            pl: 6,
                        }}
                    >
                        <Box sx={{ maxWidth: 500 }}>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                                New Tech Arrivals
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Discover the latest in technology with up to 40% off on selected items.
                            </Typography>
                            <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' }, px: 4, py: 2 }}>
                                Shop Now
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* Filters and Products */}
                <Grid container spacing={4}>
                    {/* Filters Sidebar */}
                    <Grid item xs={12} md={3}>
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3, borderRadius: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 3 }}>
                                Filters
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 2 }}>
                                        Categories
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <FormControlLabel control={<Checkbox sx={{ color: '#1B9AF5' }} />} label="Electronics (24)" />
                                        <FormControlLabel control={<Checkbox sx={{ color: '#1B9AF5' }} />} label="Computers (18)" />
                                        <FormControlLabel control={<Checkbox sx={{ color: '#1B9AF5' }} />} label="Smartphones (32)" />
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 2 }}>
                                        Price Range
                                    </Typography>
                                    <Slider
                                        defaultValue={[0, 1000]}
                                        min={0}
                                        max={1000}
                                        step={10}
                                        valueLabelDisplay="auto"
                                        sx={{ color: '#1B9AF5' }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                        <Typography variant="body2">$0</Typography>
                                        <Typography variant="body2">$1000</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Products Grid */}
                    <Grid item xs={12} md={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'semibold' }}>
                                Featured Products
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
                                <MenuItem value="newest">Newest</MenuItem>
                                <MenuItem value="price-low">Price: Low to High</MenuItem>
                                <MenuItem value="price-high">Price: High to Low</MenuItem>
                            </Select>
                        </Box>
                        <Grid container spacing={3}>
                            {[
                                {
                                    name: 'Premium Wireless Headphones',
                                    image: 'https://creatie.ai/ai/api/search-image?query=A professional product shot of a premium wireless headphone with metallic finish against a clean, minimal light gray background. The headphone is positioned at a 3/4 angle showing both ear cups and headband details&width=400&height=300&orientation=landscape&flag=802b0286-5f1c-44a8-a0cd-51631f0c0be5',
                                    price: '$299.99',
                                    rating: 4.5,
                                    reviews: 128,
                                },
                                {
                                    name: 'Latest Smartphone Pro',
                                    image: 'https://creatie.ai/ai/api/search-image?query=A sleek and modern smartphone displayed at an angle on a minimalist light gray surface, showing its edge-to-edge display and premium design details&width=400&height=300&orientation=landscape&flag=cfcd9d39-dcfa-4d09-b259-937cdf726fc9',
                                    price: '$999.99',
                                    rating: 5,
                                    reviews: 256,
                                },
                                {
                                    name: 'Ultra Slim Laptop',
                                    image: 'https://creatie.ai/ai/api/search-image?query=A premium laptop computer positioned at a 45-degree angle on a clean light gray surface, showcasing its slim design and high-resolution display&width=400&height=300&orientation=landscape&flag=9fa4bdab-941e-45f3-b0d8-fd3da831a1ad',
                                    price: '$1,299.99',
                                    rating: 4,
                                    reviews: 89,
                                },
                            ].map((product, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <motion.div whileHover={{ scale: 1.02 }}>
                                        <Paper sx={{ backgroundColor: '#1F2937', borderRadius: 2, overflow: 'hidden' }}>
                                            <img src={product.image} alt={product.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                                            <Box sx={{ p: 3 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 1 }}>
                                                    {product.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Box key={star} sx={{ color: '#FBBF24' }}>
                                                            {star <= Math.floor(product.rating) ? (
                                                                <StarIcon fontSize="small" />
                                                            ) : star === Math.ceil(product.rating) && product.rating % 1 !== 0 ? (
                                                                <StarHalfIcon fontSize="small" />
                                                            ) : (
                                                                <StarBorderIcon fontSize="small" />
                                                            )}
                                                        </Box>
                                                    ))}
                                                    <Typography variant="body2" sx={{ color: '#9CA3AF', ml: 1 }}>
                                                        ({product.reviews})
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                        {product.price}
                                                    </Typography>
                                                    <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                                        Add to Cart
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                {/* Special Offers */}
                <Box sx={{ backgroundColor: '#1F2937', borderRadius: 2, p: 4, mt: 4 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Special Offers
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#9CA3AF' }}>
                            Limited time deals you don't want to miss!
                        </Typography>
                    </Box>
                    <Grid container spacing={3}>
                        {[
                            { icon: <AccessTimeIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, title: 'Flash Sale', description: '24 hours only - Up to 70% off' },
                            { icon: <LocalShippingIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, title: 'Free Shipping', description: 'On orders over $50' },
                            { icon: <CardGiftcardIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, title: 'Special Bundle', description: 'Buy 2 Get 1 Free' },
                            { icon: <PercentIcon sx={{ color: '#1B9AF5', fontSize: 32 }} />, title: 'Student Discount', description: 'Extra 10% off with ID' },
                        ].map((offer, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper sx={{ backgroundColor: '#111827', p: 3, borderRadius: 2 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        {offer.icon}
                                        <Typography variant="h6" sx={{ fontWeight: 'semibold', mt: 1 }}>
                                            {offer.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#9CA3AF', mt: 1 }}>
                                            {offer.description}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>

            {/* Footer */}
            <Box sx={{ backgroundColor: '#1F2937', mt: 4, py: 4 }}>
                <Box sx={{ maxWidth: '1536px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 } }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                About Us
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Our Story
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Careers
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Press
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                Customer Service
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Contact Us
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Shipping Info
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                    Returns
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                Connect
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <IconButton sx={{ color: '#9CA3AF', '&:hover': { color: '#1B9AF5' } }}>
                                    <FacebookIcon />
                                </IconButton>
                                <IconButton sx={{ color: '#9CA3AF', '&:hover': { color: '#1B9AF5' } }}>
                                    <TwitterIcon />
                                </IconButton>
                                <IconButton sx={{ color: '#9CA3AF', '&:hover': { color: '#1B9AF5' } }}>
                                    <InstagramIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                Newsletter
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    placeholder="Your email"
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#374151',
                                        borderRadius: 1,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'transparent' },
                                            '&:hover fieldset': { borderColor: '#1B9AF5' },
                                        },
                                        '& .MuiInputBase-input': { color: '#F3F4F6' },
                                    }}
                                />
                                <Button variant="contained" sx={{ backgroundColor: '#1B9AF5', '&:hover': { backgroundColor: '#1A8FD5' } }}>
                                    Subscribe
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{ borderColor: '#374151', my: 4 }} />
                    <Typography variant="body2" sx={{ color: '#9CA3AF', textAlign: 'center' }}>
                        © 2024 Modern E-commerce Store. All rights reserved.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default ECommerceStore;