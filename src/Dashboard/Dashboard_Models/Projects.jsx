import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    Chip,
    Grid,
    Stack,
    Divider,
    Container,
    Modal,
} from '@mui/material';
import { Plus, Grid as GridIcon, List as ListIcon, Filter, Search } from 'lucide-react';
import ProjectCard from '../UI/ProjectCard';
import { useTheme } from '../UI/ThemeContext';
import CrudForm from '../UI/CrudForm';
import { apiIntance } from '../../middlewares/Url_GlobalErrorHandler';

const initialProjects = [
    {
        id: 'p1',
        title: 'E-Commerce Dashboard',
        description: 'A complete admin dashboard for online store management with sales analytics and inventory tracking.',
        thumbnail: 'https://images.pexels.com/photos/6956903/pexels-photo-6956903.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        status: 'completed',
        github: 'https://github.com/user/ecommerce-dashboard',
        demo: 'https://ecommerce-dashboard.example.com',
        created: '2023-05-15',
        updated: '2023-09-20'
    },
    {
        id: 'p2',
        title: 'Personal Finance Tracker',
        description: 'Mobile-first web app to track personal expenses, set budgets, and visualize spending habits.',
        thumbnail: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        techStack: ['Vue.js', 'Firebase', 'Chart.js', 'Sass'],
        status: 'in-progress',
        github: 'https://github.com/user/finance-tracker',
        created: '2023-07-10',
        updated: '2023-10-05'
    },
    {
        id: 'p3',
        title: 'AI Image Generator',
        description: 'Web application that leverages machine learning to create unique images from text descriptions.',
        thumbnail: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        techStack: ['Next.js', 'Python', 'TensorFlow', 'AWS'],
        status: 'completed',
        github: 'https://github.com/user/ai-image-generator',
        demo: 'https://ai-image-gen.example.com',
        created: '2023-02-20',
        updated: '2023-06-18'
    },
    {
        id: 'p4',
        title: 'Task Management System',
        description: 'Collaborative task manager with real-time updates, team assignments, and progress tracking.',
        thumbnail: 'https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        techStack: ['Angular', 'Express', 'PostgreSQL', 'Socket.io'],
        status: 'in-progress',
        github: 'https://github.com/user/task-management',
        created: '2023-08-05',
        updated: '2023-10-12'
    },
    {
        id: 'p5',
        title: 'Weather Dashboard',
        description: 'Interactive weather forecast application with location-based data and historical trends.',
        thumbnail: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        techStack: ['React', 'Redux', 'OpenWeather API', 'Styled Components'],
        status: 'completed',
        github: 'https://github.com/user/weather-app',
        demo: 'https://weather-app.example.com',
        created: '2023-04-12',
        updated: '2023-08-30'
    },
    {
        id: 'p6',
        title: 'Social Media Analytics',
        description: 'Dashboard to track and analyze social media performance across multiple platforms.',
        thumbnail: 'https://images.pexels.com/photos/4125670/pexels-photo-4125670.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        techStack: ['Next.js', 'GraphQL', 'MongoDB', 'D3.js'],
        status: 'planned',
        github: 'https://github.com/user/social-analytics',
        created: '2023-09-28',
        updated: '2023-10-01'
    }
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const Projects = ({ top, projects = [], setRefresh, open, setOpen }) => {
    const theme = useTheme();

    const [view, setView] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const filterOpen = Boolean(filterAnchorEl);

    const [updatedId, setUpdatedId] = useState(null)




    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (id) => {
        console.log('Edit project:', id);
    };

    const handleDelete = async (id) => {
        try {
            if (!id) return;
            console.log(id)
            await apiIntance.delete(`/project/deleteProject/${id}`)
                .then(() => {
                    setRefresh((prev) => !prev)
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 6, pt: 12 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mx: 3
            }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: 'black' }}>
                    Projects
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={handleOpen}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 1,
                        textTransform: 'none'
                    }}
                >
                    New Project
                </Button>
            </Box>
            <CrudForm
                open={open}
                handleClose={handleClose}
                style={style}
                setRefresh={setRefresh}
                updatedId={updatedId}
                setUpdatedId={setUpdatedId}
                setOpen={setOpen}
            />

            <Card>
                <CardContent sx={{ p: 2 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField
                            fullWidth
                            placeholder="Search projects..."
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={18} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 1,
                                    '& fieldset': {
                                        borderColor: 'divider'
                                    }
                                }
                            }}
                        />

                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                startIcon={<Filter size={18} />}
                                onClick={handleFilterClick}
                                sx={{
                                    px: 2,
                                    py: 1,
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    borderColor: 'divider'
                                }}
                            >
                                Filter
                            </Button>

                            <Menu
                                anchorEl={filterAnchorEl}
                                open={filterOpen}
                                onClose={handleFilterClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        setFilterStatus('all');
                                        handleFilterClose();
                                    }}
                                    selected={filterStatus === 'all'}
                                >
                                    All Projects
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setFilterStatus('completed');
                                        handleFilterClose();
                                    }}
                                    selected={filterStatus === 'completed'}
                                >
                                    Completed
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setFilterStatus('in-progress');
                                        handleFilterClose();
                                    }}
                                    selected={filterStatus === 'In Progress'}
                                >
                                    In Progress
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setFilterStatus('planned');
                                        handleFilterClose();
                                    }}
                                    selected={filterStatus === 'planned'}
                                >
                                    Planned
                                </MenuItem>
                            </Menu>

                            <Stack direction="row" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
                                <Button
                                    onClick={() => setView('grid')}
                                    sx={{
                                        px: 1.5,
                                        py: 1,
                                        minWidth: 'auto',
                                        bgcolor: view === 'grid' ? 'primary.main' : 'background.paper',
                                        color: view === 'grid' ? 'primary.contrastText' : 'text.primary',
                                        '&:hover': {
                                            bgcolor: view === 'grid' ? 'primary.dark' : 'action.hover',
                                        }
                                    }}
                                >
                                    <GridIcon size={18} />
                                </Button>
                                <Divider orientation="vertical" flexItem />
                                <Button
                                    onClick={() => setView('list')}
                                    sx={{
                                        px: 1.5,
                                        py: 1,
                                        minWidth: 'auto',
                                        bgcolor: view === 'list' ? 'primary.main' : 'background.paper',
                                        color: view === 'list' ? 'primary.contrastText' : 'text.primary',
                                        '&:hover': {
                                            bgcolor: view === 'list' ? 'primary.dark' : 'action.hover',
                                        }
                                    }}
                                >
                                    <ListIcon size={18} />
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>

            {filteredProjects.length === 0 ? (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 6
                }}>
                    <Typography variant="body1" color="text.secondary">
                        No projects found
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                        Try adjusting your search or filters
                    </Typography>
                </Box>
            ) : (
                view === 'grid' ? (
                    <Container>
                        <Grid container spacing={2}>
                            {filteredProjects.map(project => (
                                <Grid item xs={12} sm={6} md={4} key={project.id}>
                                    <ProjectCard
                                        project={project}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        setUpdatedId={setUpdatedId}
                                        setOpen={setOpen}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                ) : (

                    <Container>
                        <Grid container spacing={2}>
                            {filteredProjects.map(project => (
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} key={project.id}>
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        setUpdatedId={setUpdatedId}
                                        setOpen={setOpen}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>

                )
            )}
        </Box>
    );
};

export default Projects;