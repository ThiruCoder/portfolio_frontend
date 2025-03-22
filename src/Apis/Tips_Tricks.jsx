import React, { useEffect, useRef } from 'react';
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
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Notifications as NotificationsIcon,
    Add as AddIcon,
    Code as CodeIcon,
    DataObject as DataObjectIcon,
    Person as PersonIcon,
    CopyAll as CopyIcon,
} from '@mui/icons-material';
import { Header } from '../HomePage/Header';
// import * as echarts from 'echarts';

export const Tips_Tricks = () => {
    const chartRef = useRef(null);


    return (
        <Box sx={{ backgroundColor: '#111827', color: '#F3F4F6', minHeight: '100vh' }}>
            {/* Navbar */}
            <Header />

            {/* Main Content */}
            <Box sx={{ maxWidth: '1536px', mx: 'auto', px: { xs: 2, sm: 3, lg: 4 }, py: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        E-commerce Platform API
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                        <Box sx={{ width: 8, height: 8, backgroundColor: '#10B981', borderRadius: '50%', mr: 1 }} />
                        <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                            Active
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid item xs={12} lg={8}>
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3, mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
                                    Code Snippets
                                </Typography>
                                <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: '#1B9AF5' }}>
                                    Add Snippet
                                </Button>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                {/* Code Snippet 1 */}
                                <Paper sx={{ backgroundColor: '#111827', p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CodeIcon sx={{ color: '#FBBF24' }} />
                                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                Authentication.js
                                            </Typography>
                                        </Box>
                                        <IconButton color="inherit">
                                            <CopyIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#9CA3AF', overflowX: 'auto' }}>
                                        <pre>
                                            {`const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id })
    
    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}`}
                                        </pre>
                                    </Typography>
                                </Paper>

                                {/* Code Snippet 2 */}
                                <Paper sx={{ backgroundColor: '#111827', p: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <DataObjectIcon sx={{ color: '#3B82F6' }} />
                                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                data_processor.py
                                            </Typography>
                                        </Box>
                                        <IconButton color="inherit">
                                            <CopyIcon />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#9CA3AF', overflowX: 'auto' }}>
                                        <pre>
                                            {`def process_data(raw_data):
    try:
        validated_data = validate_input(raw_data)
        transformed_data = transform_data(validated_data)
        return {
            'status': 'success',
            'data': transformed_data
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e)
        }`}
                                        </pre>
                                    </Typography>
                                </Paper>
                            </Box>
                        </Paper>

                        {/* API Performance Chart */}
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 3 }}>
                                API Performance
                            </Typography>
                            <Box ref={chartRef} sx={{ height: '320px' }} />
                        </Paper>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} lg={4}>
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3, mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 3 }}>
                                API Endpoints
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {[
                                    { method: 'GET', path: '/api/v1/users', description: 'Retrieve user list with pagination' },
                                    { method: 'POST', path: '/api/v1/auth', description: 'User authentication endpoint' },
                                    { method: 'PUT', path: '/api/v1/products', description: 'Update product information' },
                                ].map((endpoint, index) => (
                                    <Paper key={index} sx={{ backgroundColor: '#111827', p: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                            <Box
                                                sx={{
                                                    backgroundColor:
                                                        endpoint.method === 'GET'
                                                            ? '#10B981'
                                                            : endpoint.method === 'POST'
                                                                ? '#3B82F6'
                                                                : '#FBBF24',
                                                    color: '#FFFFFF',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                }}
                                            >
                                                <Typography variant="body2">{endpoint.method}</Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                                {endpoint.path}
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: '#9CA3AF' }}>
                                            {endpoint.description}
                                        </Typography>
                                    </Paper>
                                ))}
                            </Box>
                        </Paper>

                        {/* Team Members */}
                        <Paper sx={{ backgroundColor: '#1F2937', p: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 3 }}>
                                Team Members
                            </Typography>
                            <List>
                                {[
                                    {
                                        name: 'John Smith',
                                        role: 'Lead Developer',
                                        avatar:
                                            'https://creatie.ai/ai/api/search-image?query=A professional headshot of a male developer with glasses, wearing a casual shirt, against a neutral background&width=100&height=100&orientation=squarish&flag=f9f263c4-f931-4a6c-8804-e28b2dfa1fdd',
                                    },
                                    {
                                        name: 'Sarah Johnson',
                                        role: 'Backend Engineer',
                                        avatar:
                                            'https://creatie.ai/ai/api/search-image?query=A professional headshot of a female developer with a confident smile, wearing business casual attire, against a neutral background&width=100&height=100&orientation=squarish&flag=18afcb74-d890-438f-8894-e1d2c64b6c3c',
                                    },
                                    {
                                        name: 'Michael Chen',
                                        role: 'Frontend Developer',
                                        avatar:
                                            'https://creatie.ai/ai/api/search-image?query=A professional headshot of a young male developer with a friendly expression, wearing a modern outfit, against a neutral background&width=100&height=100&orientation=squarish&flag=a494b5ca-0683-453a-8459-4b50e7bddb0d',
                                    },
                                ].map((member, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={member.avatar} alt={member.name} />
                                            </ListItemAvatar>
                                            <ListItemText primary={member.name} secondary={member.role} />
                                        </ListItem>
                                        {index < 2 && <Divider sx={{ backgroundColor: '#374151' }} />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};





