import React from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Phone,
    Email,
    Language,
    LinkedIn,
    Circle
} from '@mui/icons-material';

const Portfolio = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                py: 4
            }}
        >
            <Container maxWidth="md">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            color: 'text.primary',
                            mb: 1,
                            fontSize: { xs: '2.5rem', md: '3rem' }
                        }}
                    >
                        Ician Mesquita
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}
                    >
                        Iciam ipsum dolor sit amet, consectetur adipiscing elit. Sed est in orn isolatius in efficitur vel eget metus.
                    </Typography>
                </Box>

                {/* Main CTA */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h4"
                        component="h2"
                        sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}
                    >
                        BAIXAR CURRÍCULO
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: 'primary.main',
                            py: 1.5,
                            px: 4,
                            fontSize: '1.1rem',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'scale(1.05)'
                            },
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Download CV
                    </Button>
                </Box>

                {/* About Section */}
                <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 4,
                                bgcolor: 'primary.main',
                                borderRadius: 4,
                                mr: 2
                            }}
                        />
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            SOBRE
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Conheça um pouco sobre mim
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Icrem ipsum nibh gravida proesent posuere sodales mi, donee platea elementum proin integer donee primis quam, sed mattis aptent suspendisse nostro curae.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Bibendum semper arcu suscipit temp <Box component="span" sx={{ fontWeight: 'bold' }}>attis</Box> aptent suspendisse nostro curae, bibendum semper arcu suscipit temp
                    </Typography>
                </Paper>

                {/* Skills Section */}
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 4,
                                bgcolor: 'primary.main',
                                borderRadius: 4,
                                mr: 2
                            }}
                        />
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            Skills
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                        <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                Laboratório
                            </Typography>
                            <List>
                                {['SABER', 'PORTER', 'CURTIS', 'MUSICA', 'AQUILTA', 'VOLUME', 'SALUT'].map((skill, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <Circle sx={{ fontSize: 10, color: 'primary.main' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={skill} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 'semibold', mb: 2 }}>
                                Laboratório
                            </Typography>
                            <List>
                                {['Saber', 'PORTER', 'CURTIS', 'MUSICA', 'AQUILTA', 'VOLUME', 'SALUT'].map((skill, index) => (
                                    <ListItem key={index} sx={{ px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <Circle sx={{ fontSize: 10, color: 'primary.main' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={skill} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Box>
                </Box>

                {/* Contact Section */}
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 4,
                                bgcolor: 'primary.main',
                                borderRadius: 4,
                                mr: 2
                            }}
                        />
                        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                            Contato
                        </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                        Contato iso non entero om contato compte ante um, praunt aeneio te, rispontei totem en efe.
                    </Typography>

                    <Paper elevation={3} sx={{ p: 3 }}>
                        <List>
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <Phone color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="(10) 9 9999 9999" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <Email color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="sendomassadoloscon.br" />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <Language color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <a
                                            href="#"
                                            style={{
                                                color: theme.palette.primary.main,
                                                textDecoration: 'none'
                                            }}
                                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                        >
                                            http://john.ac.com/ponto
                                        </a>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem sx={{ px: 0 }}>
                                <ListItemIcon>
                                    <LinkedIn color="primary" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <a
                                            href="#"
                                            style={{
                                                color: theme.palette.primary.main,
                                                textDecoration: 'none'
                                            }}
                                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                        >
                                            http://friendsrhiv/iciammesquita
                                        </a>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Paper>
                </Box>

                {/* Footer */}
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 3,
                        borderTop: 1,
                        borderColor: 'divider',
                        color: 'text.secondary'
                    }}
                >
                    <Typography variant="body2">
                        © 2023 Ician Mesquita - Design by Lucinda Sales
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Portfolio;