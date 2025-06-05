import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, LinearProgress, List, ListItem, ListItemText, Chip, Container, Button } from '@mui/material';
import { Award, Clock, Code, FileText, Mail, PenTool, Users } from 'lucide-react';
import ActivityItem from '../UI/ActivityItem';
import StatsCard from '../UI/StatsCard';


// Stats Data
const statsData = [
    {
        title: 'Total Projects',
        value: 24,
        change: 8,
        changeText: 'from last month',
        changeType: 'increase',
        icon: <Code size={20} />,
        color: 'blue'
    },
    {
        title: 'Active Visitors',
        value: 842,
        change: 12,
        changeText: 'from last week',
        changeType: 'increase',
        icon: <Users size={20} />,
        color: 'teal'
    },
    {
        title: 'Skill Mastery',
        value: '78%',
        change: 5,
        changeText: 'improvement',
        changeType: 'increase',
        icon: <Award size={20} />,
        color: 'amber'
    },
    {
        title: 'Contact Requests',
        value: 9,
        change: 2,
        changeText: 'new this week',
        changeType: 'increase',
        icon: <Mail size={20} />,
        color: 'indigo'
    }
];

// Mock Activity Data
const activities = [
    {
        id: 'a1',
        type: 'project',
        title: 'Updated project: AI Image Generator',
        description: 'Added new features and improved performance.',
        time: '2 hours ago',
        icon: <Code size={16} />
    },
    {
        id: 'a2',
        type: 'visit',
        title: 'Portfolio visited by Google recruiter',
        description: 'The user spent 5 minutes reviewing your projects.',
        time: '3 hours ago',
        avatar: 'https://images.pexels.com/photos/5876695/pexels-photo-5876695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100'
    },
    {
        id: 'a3',
        type: 'skill',
        title: 'Added new skill: GraphQL',
        time: 'Yesterday',
        icon: <PenTool size={16} />
    },
    {
        id: 'a4',
        type: 'resume',
        title: 'Updated Resume',
        description: 'Added recent experience and updated skills.',
        time: '2 days ago',
        icon: <FileText size={16} />
    },
    {
        id: 'a5',
        type: 'project',
        title: 'Created new project: Social Media Analytics',
        time: '3 days ago',
        icon: <Code size={16} />
    }
];

const MainPage = ({ top, }) => {
    const [username, setUsername] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('LocalUser');
        if (storedUser) {
            const { username } = JSON.parse(storedUser);
            setUsername(username);
        }
    }, []);

    return (
        <Container sx={{ pt: 8, pb: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                    <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 3, color: 'black', mt: 4 }}>
                        Welcome back, {username}!
                    </Typography>

                    {/* Stats Cards */}
                    <Grid container spacing={3}>
                        {statsData.map((stat, index) => (
                            <Grid item xs={12} md={3} sm={6} key={`${stat}-${index}`}>
                                <StatsCard
                                    title={stat.title}
                                    value={stat.value}
                                    change={stat.change}
                                    changeText={stat.changeText}
                                    changeType={stat.changeType}
                                    icon={stat.icon}
                                    color={stat.color}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>


                <Grid container spacing={3}>
                    {/* Activity Feed */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                    <Typography variant="h6" component="h3">
                                        Recent Activity
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                                        <Clock size={14} style={{ marginRight: '4px' }} />
                                        Last 7 days
                                    </Box>
                                </Box>

                                <List sx={{ py: 0 }}>
                                    {activities.map((activity, index) => (
                                        <ActivityItem
                                            key={`${activity}-${index}`}
                                            icon={activity.icon}
                                            avatar={activity.avatar}
                                            title={activity.title}
                                            description={activity.description}
                                            time={activity.time}
                                            isLast={index === activities.length - 1}
                                        />
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Quick Summary */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="h3" sx={{ mb: 3 }}>
                                    Portfolio Summary
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Frontend Skills
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                80%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={80}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'grey.200',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 'primary.main',
                                                    borderRadius: 4
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Backend Skills
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                75%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={75}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'grey.200',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 'success.main',
                                                    borderRadius: 4
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                Database & DevOps
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                65%
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={65}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: 'grey.200',
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: 'warning.main',
                                                    borderRadius: 4
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ pt: 2, borderTop: 1, borderColor: 'divider' }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 2 }}>
                                            Top Projects
                                        </Typography>
                                        <List sx={{ py: 0 }}>
                                            <ListItem sx={{ px: 0, py: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemText primary="E-Commerce Dashboard" primaryTypographyProps={{ variant: 'body2' }} />
                                                <Chip label="Completed" size="small" color="success" sx={{ fontSize: '0.75rem' }} />
                                            </ListItem>
                                            <ListItem sx={{ px: 0, py: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemText primary="Personal Finance Tracker" primaryTypographyProps={{ variant: 'body2' }} />
                                                <Chip label="In Progress" size="small" color="info" sx={{ fontSize: '0.75rem' }} />
                                            </ListItem>
                                            <ListItem sx={{ px: 0, py: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                                                <ListItemText primary="AI Image Generator" primaryTypographyProps={{ variant: 'body2' }} />
                                                <Chip label="Completed" size="small" color="success" sx={{ fontSize: '0.75rem' }} />
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Box>
        </Container>
    );
};

export default MainPage;