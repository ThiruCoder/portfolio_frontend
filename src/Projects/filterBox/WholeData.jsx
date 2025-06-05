"use client";
import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Paper,
    Chip,
    Divider,
    CircularProgress,
    Button,
    Grid,
    Avatar,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    CardMedia
} from '@mui/material';
import {
    Calendar,
    Clock,
    Users,
    Tag,
    ArrowLeft,
    Globe,
    Github,
    FileText,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { apiIntance } from '../../middlewares/Url_GlobalErrorHandler';

const WholeData = ({ showId }) => {
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!showId) return;

        const fetchProject = async () => {
            try {
                setLoading(true);
                if (!showId) return console.log('ID is required.');
                await apiIntance.get(`/project/getProjectById/${showId}`)
                    .then((res) => setProjects(res.data))
                    .catch((err) => console.log(err))
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [showId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AlertCircle color="error" size={32} />
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Paper>
            </Container>
        );
    }

    if (!projects) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h6">Project not found</Typography>
            </Container>
        );
    }
    console.log(projects);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={4} key={`$${projects.title}`}>
                    <Grid item xs={12} md={8} >
                        <Stack spacing={3}>
                            <Box sx={{ width: '100%', height: 'auto', position: 'relative' }}>
                                <CardMedia
                                    component={'img'}
                                    src={projects?.image?.url}
                                    alt="Project Image"
                                    layout="responsive"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                />
                            </Box>
                            <Divider />
                            <Box>
                                <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                                    {projects.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    {projects.description}
                                </Typography>
                            </Box>


                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={4}  >
                        <Stack spacing={3}>
                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Tag size={20} /> Details
                                </Typography>

                                <Stack spacing={2} sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calendar size={18} />
                                        <Typography variant="body2" fontWeight={600} >
                                            Created: <span style={{ fontWeight: 400 }}>{new Date(projects.createdAt).toLocaleDateString()}</span>
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Clock size={18} />
                                        <Typography variant="body2" fontWeight={600} >
                                            Last updated: <span style={{ fontWeight: 400 }}>{new Date(projects.updatedAt).toLocaleDateString()}</span>
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Tag size={20} /> Project Status
                                </Typography>

                                <Stack spacing={2} sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calendar size={18} />
                                        <Typography variant="body2" fontWeight={600} >
                                            Status: <span style={{ fontWeight: 400 }}>{projects?.status}</span>
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Clock size={18} />
                                        <Typography variant="body2" fontWeight={600} >
                                            Priority: <span style={{ fontWeight: 400 }}>{projects?.priority}</span>
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>

                            {projects.tags && projects.tags.length > 0 && (
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography variant="h6" gutterBottom fontWeight={600} >
                                        Technologies
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {projects.tags.map((tech, index) => (
                                            <Chip key={index} label={tech} variant="outlined" />
                                        ))}
                                    </Box>
                                </Paper>
                            )}

                            <Paper variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom fontWeight={600} >
                                    Links
                                </Typography>
                                <Stack spacing={1}>
                                    {projects.url && (
                                        <Button
                                            startIcon={<Globe size={18} />}
                                            href={projects.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            fullWidth
                                            variant="outlined"
                                        >
                                            Live Demo
                                        </Button>
                                    )}
                                    {/* {project.githubUrl && (
                                        <Button
                                            startIcon={<Github size={18} />}
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            fullWidth
                                            variant="outlined"
                                        >
                                            GitHub Repository
                                        </Button>
                                    )} */}
                                    {/* {project.documentationUrl && (
                                        <Button
                                            startIcon={<FileText size={18} />}
                                            href={project.documentationUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            fullWidth
                                            variant="outlined"
                                        >
                                            Documentation
                                        </Button>
                                    )} */}
                                </Stack>
                            </Paper>
                        </Stack>
                    </Grid>
                </Grid>

            </Paper>
        </Container>
    );
};

export default WholeData;