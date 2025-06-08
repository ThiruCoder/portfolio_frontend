import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Stack,
    IconButton,
    Divider
} from '@mui/material';
import { Github, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { useTheme } from './ThemeContext';

const ProjectCard = ({ project, onEdit, onDelete, setUpdatedId, setOpen }) => {
    const theme = useTheme();

    const statusColors = {
        completed: { bg: 'success.light', text: 'success.dark' },
        'In Progress': { bg: 'info.light', text: 'info.dark' },
        planned: { bg: 'warning.light', text: 'warning.dark' }
    };

    const statusText = {
        completed: 'Completed',
        'in-progress': 'In Progress',
        planned: 'Planned'
    };


    return (
        <Card sx={{
            overflow: 'hidden',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme
            }
        }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={project?.image?.url}
                    alt={project.title}
                    sx={{ objectFit: 'cover' }}
                />

                <Typography sx={{ fontSize: '.8em', position: 'absolute', left: 10 }}>Created at: {project?.createdAt.split('T')[0]}</Typography>
            </Box>

            <CardContent sx={{ p: 3 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2
                }}>
                    <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {project.title}
                    </Typography>
                    <Chip
                        label={project.status}
                        size="small"
                        sx={{
                            // backgroundColor: statusColors[project.status].bg,
                            // color: statusColors[project.status].text,
                            '& .MuiChip-label': {
                                fontSize: '0.75rem'
                            }
                        }}
                    />
                </Box>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {project.description}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', rowGap: 1 }}>
                    {project?.tags?.slice(0, 3).map((tag, tagIndex) => (
                        <Box>
                            <Chip
                                key={`${tag}-${tagIndex}`}
                                label={tag}
                                size="small"
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                                    height: '24px',
                                    '& .MuiChip-label': {
                                        fontWeight: 500,
                                        px: 1,
                                        overflow: 'hidden'
                                    },
                                }}
                            />
                        </Box>
                    ))}
                    {project?.tags?.length > 4 && (
                        <Box >
                            <Chip
                                label={`+${project.tags.length - 4}`}
                                size="small"
                                variant="outlined"
                                className='typi'
                                sx={{
                                    fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                                    height: '24px',

                                }}
                            />
                        </Box>
                    )}
                </Stack>

                <Divider sx={{ my: 2, borderColor: 'divider' }} />

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Stack direction="row" spacing={1.5}>
                        {project.github && (
                            <IconButton
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                color="inherit"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                <Github size={18} />
                            </IconButton>
                        )}

                        {project.url && (
                            <IconButton
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                color="inherit"
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        color: 'text.primary'
                                    }
                                }}
                            >
                                <ExternalLink size={18} />
                            </IconButton>
                        )}

                    </Stack>

                    <Stack direction="row" spacing={1.5}>
                        <IconButton
                            onClick={() => {
                                setUpdatedId(project._id)
                                setOpen((prev) => !prev)
                            }}
                            size="small"
                            sx={{
                                color: 'primary.main',
                                '&:hover': {
                                    color: 'primary.dark'
                                }
                            }}
                        >
                            <Edit size={18} />
                        </IconButton>

                        <IconButton
                            onClick={() => onDelete(project._id)}
                            size="small"
                            sx={{
                                color: 'error.main',
                                '&:hover': {
                                    color: 'error.dark'
                                }
                            }}
                        >
                            <Trash2 size={18} />
                        </IconButton>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;