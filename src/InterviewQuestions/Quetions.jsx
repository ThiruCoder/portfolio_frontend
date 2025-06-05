import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, Paper, Grid, Select, MenuItem, Box, Container } from '@mui/material';
import { Search, ArrowUpward, ArrowDownward, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Header } from '../HomePage/Header';
import Footer from '../HomePage/Footer';

const questions = [
    {
        id: 1,
        category: 'JavaScript',
        difficulty: 'Hard',
        title: 'Implement Promise.all() from scratch',
        views: 2400,
        answers: 42,
    },
    {
        id: 2,
        category: 'React',
        difficulty: 'Medium',
        title: 'Explain React Hooks and Their Use Cases',
        views: 3100,
        answers: 56,
    },
    {
        id: 3,
        category: 'System Design',
        difficulty: 'Hard',
        title: 'Design a URL Shortening Service',
        views: 1800,
        answers: 35,
    },
    // Add more questions here
];

const Interview = () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(event.target.value);
        setPage(1);
    };

    const paginatedQuestions = questions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ minHeight: '100vh', color: 'white' }}>
            <Header />

            <Container sx={{ py: 5, pt: 12 }}>
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" sx={{ fontWeight: 600, color: 'white', opacity: 0.8 }} gutterBottom>
                        Find Your Interview Questions
                    </Typography>
                    <Box sx={{ maxWidth: '600px', mx: 'auto', position: 'relative' }}>
                        <TextField
                            fullWidth
                            placeholder="Search interview questions..."
                            variant="outlined"
                            sx={{ backgroundColor: '#2D3748', borderRadius: '8px', input: { color: 'white' } }}
                        />
                        <IconButton sx={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>
                            <Search />
                        </IconButton>
                    </Box>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                    {['JavaScript', 'React', 'Node.js', 'System Design'].map((category) => (
                        <Grid item key={category}>
                            <Button variant="contained" sx={{ backgroundColor: '#2D3748', '&:hover': { backgroundColor: '#4A5568' } }}>
                                {category}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {paginatedQuestions.map((question) => (
                        <Grid item key={question.id} xs={12} md={6} lg={4}>
                            <Paper sx={{ backgroundColor: '#2D3748', p: 3, borderRadius: '8px' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="body2" sx={{ backgroundColor: '#4A5568', px: 1.2, pt: 0.5, borderRadius: '4px', color: 'white', fontWeight: 500, opacity: 0.9, }}>
                                        {question.category}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'white', background: 'purple', py: 0.5, px: 1.3, borderRadius: 1 }}>
                                        {question.difficulty}
                                    </Typography>
                                </Box>
                                <Typography variant="h6" sx={{ cursor: 'pointer', mb: 2, fontWeight: 600, color: 'white', opacity: 0.8 }}>
                                    {question.title}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'gray' }}>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mr: 2, fontWeight: 600, color: 'white', opacity: 0.8 }}>
                                        <Search sx={{ fontSize: '16px', mr: 1 }} /> {question.views} views
                                    </Typography>
                                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', fontWeight: 600, color: 'white', opacity: 0.8 }}>
                                        <ArrowUpward sx={{ fontSize: '16px', mr: 1 }} /> {question.answers} answers
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 2 }}>
                            Show
                        </Typography>
                        <Select value={itemsPerPage} onChange={handleItemsPerPageChange} sx={{ backgroundColor: '#2D3748', color: 'white' }}>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            per page
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                            <ChevronLeft />
                        </IconButton>
                        <Button variant="contained" sx={{ mx: 1 }}>
                            {page}
                        </Button>
                        <IconButton onClick={() => handlePageChange(page + 1)} disabled={page * itemsPerPage >= questions.length}>
                            <ChevronRight />
                        </IconButton>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default Interview;