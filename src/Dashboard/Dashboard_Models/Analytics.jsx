import React from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    LinearProgress
} from '@mui/material';
import {
    Calendar,
    Download,
    TrendingUp,
    TrendingDown,
    BarChart3
} from 'lucide-react';
import { useTheme } from '../UI/ThemeContext';

const Analytics = ({ top }) => {
    const theme = useTheme();

    const renderCard = (iconBgColor, iconColor, title, value, change, isPositive) => (
        <Grid size={{ xs: 12, md: 3 }}>
            <Card>
                <CardContent sx={{ display: 'flex', gap: 2 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: iconBgColor,
                            color: iconColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <BarChart3 size={20} />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="textSecondary">{title}</Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5" fontWeight="600" mr={1}>{value}</Typography>
                            <Box display="flex" alignItems="center" color={isPositive ? 'success.main' : 'error.main'}>
                                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                <Typography variant="caption" ml={0.5}>{change}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );

    const placeholderChart = (title, subtitle) => (
        <Box textAlign="center">
            <BarChart3 size={48} style={{ opacity: 0.5, marginBottom: 8 }} />
            <Typography>{title}</Typography>
            <Typography variant="caption">{subtitle}</Typography>
        </Box>
    );

    const topProjects = [
        { name: 'E-Commerce Dashboard', value: 2356, percent: 85 },
        { name: 'AI Image Generator', value: 1824, percent: 65 },
        { name: 'Weather Dashboard', value: 1245, percent: 45 },
        { name: 'Task Management System', value: 982, percent: 35 },
        { name: 'Personal Finance Tracker', value: 756, percent: 25 },
    ];

    return (
        <Box p={3}>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2} mb={3}>
                <Typography variant="h5" fontWeight="600">User Analytics</Typography>
                <Box display="flex" gap={2}>
                    <Button variant="outlined" startIcon={<Calendar size={18} />}>Last 30 Days</Button>
                    <Button variant="contained" color="primary" startIcon={<Download size={18} />}>Download Report</Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {renderCard('rgba(33, 150, 243, 0.1)', '#2196f3', 'Total Visitors', '3,842', '12%', true)}
                {renderCard('rgba(0, 150, 136, 0.1)', '#009688', 'Avg. Session Duration', '2:45', '8%', true)}
                {renderCard('rgba(255, 193, 7, 0.1)', '#FFC107', 'Project Views', '12,568', '24%', true)}
                {renderCard('rgba(244, 67, 54, 0.1)', '#F44336', 'Bounce Rate', '23.4%', '3%', false)}
            </Grid>

            <Grid container spacing={3} mt={1}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={2}>Visitors Over Time</Typography>
                            <Box height={256} display="flex" alignItems="center" justifyContent="center">
                                {placeholderChart("Visitor statistics chart would be displayed here", "Showing daily visitors for the past 30 days")}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={2}>Top Projects</Typography>
                            {topProjects.map((proj, idx) => (
                                <Box key={idx} mb={2}>
                                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                                        <Typography variant="body2">{proj.name}</Typography>
                                        <Typography variant="body2">{proj.value}</Typography>
                                    </Box>
                                    <LinearProgress variant="determinate" value={proj.percent} />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3} mt={1}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={2}>Traffic Sources</Typography>
                            <Box height={256} display="flex" alignItems="center" justifyContent="center">
                                {placeholderChart("Traffic sources chart would be displayed here", "Showing breakdown of visitor referrals")}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={2}>Popular Skills</Typography>
                            <Box height={256} display="flex" alignItems="center" justifyContent="center">
                                {placeholderChart("Skills chart would be displayed here", "Showing most viewed skills in your profile")}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Analytics;
