import React from 'react';
import { Card, Box, Typography, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '../UI/ThemeContext';

const Contact = ({ top }) => {
    const { theme } = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 12, px: 3, }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
            }}>
                <Typography variant="h5" component="h6" sx={{ fontWeight: 700 }}>
                    Contact Management
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 3,
                        py: 1,
                        bgcolor: 'primary.main',
                        '&:hover': { bgcolor: 'primary.dark' }
                    }}
                >
                    Save Changes
                </Button>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 3
            }}>
                <Card sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'semibold' }}>
                        Contact Information
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box>
                            <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                Email Address
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                <Mail size={18} style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                                }} />
                                <TextField
                                    type="email"
                                    id="email"
                                    defaultValue="alex.morgan@example.com"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            pl: 4.5,
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                Phone Number
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                <Phone size={18} style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                                }} />
                                <TextField
                                    type="tel"
                                    id="phone"
                                    defaultValue="(123) 456-7890"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            pl: 4.5,
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                Location
                            </Typography>
                            <Box sx={{ position: 'relative' }}>
                                <MapPin size={18} style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                                }} />
                                <TextField
                                    type="text"
                                    id="location"
                                    defaultValue="New York, NY"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            pl: 4.5,
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ pt: 2, borderTop: 1, borderColor: theme === 'dark' ? 'grey.700' : 'grey.200' }}>
                            <Typography variant="body1" component="h4" sx={{ fontWeight: 'medium', mb: 1.5 }}>
                                Social Media
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                        GitHub
                                    </Typography>
                                    <Box sx={{ position: 'relative' }}>
                                        <Github size={18} style={{
                                            position: 'absolute',
                                            left: 12,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                                        }} />
                                        <TextField
                                            type="text"
                                            id="github"
                                            defaultValue="github.com/alexmorgan"
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pl: 4.5,
                                                    bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                                    color: theme === 'dark' ? 'common.white' : 'text.primary',
                                                    '& fieldset': {
                                                        borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                                    }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                        LinkedIn
                                    </Typography>
                                    <Box sx={{ position: 'relative' }}>
                                        <Linkedin size={18} style={{
                                            position: 'absolute',
                                            left: 12,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                                        }} />
                                        <TextField
                                            type="text"
                                            id="linkedin"
                                            defaultValue="linkedin.com/in/alexmorgan"
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pl: 4.5,
                                                    bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                                    color: theme === 'dark' ? 'common.white' : 'text.primary',
                                                    '& fieldset': {
                                                        borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                                    }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>

                                <Box>
                                    <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                        Twitter
                                    </Typography>
                                    <Box sx={{ position: 'relative' }}>
                                        <Twitter size={18} style={{
                                            position: 'absolute',
                                            left: 12,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                                        }} />
                                        <TextField
                                            type="text"
                                            id="twitter"
                                            defaultValue="twitter.com/alexmorgan"
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    pl: 4.5,
                                                    bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                                    color: theme === 'dark' ? 'common.white' : 'text.primary',
                                                    '& fieldset': {
                                                        borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                                    }
                                                }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ pt: 2, borderTop: 1, borderColor: theme === 'dark' ? 'grey.700' : 'grey.200' }}>
                            <Typography variant="body1" component="h4" sx={{ fontWeight: 'medium', mb: 1.5 }}>
                                Availability Status
                            </Typography>

                            <Select
                                fullWidth
                                defaultValue="Available for work"
                                sx={{
                                    bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                    color: theme === 'dark' ? 'common.white' : 'text.primary',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                    }
                                }}
                            >
                                <MenuItem value="Available for work">Available for work</MenuItem>
                                <MenuItem value="Open to freelance">Open to freelance</MenuItem>
                                <MenuItem value="Not currently available">Not currently available</MenuItem>
                                <MenuItem value="Available for contract">Available for contract</MenuItem>
                            </Select>
                        </Box>
                    </Box>
                </Card>

                <Card sx={{ p: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'semibold' }}>
                        Contact Form Preview
                    </Typography>

                    <Box sx={{
                        p: 3,
                        borderRadius: 1,
                        border: 1,
                        borderColor: theme === 'dark' ? 'grey.700' : 'grey.200',
                        bgcolor: theme === 'dark' ? 'grey.900' : 'grey.100'
                    }}>
                        <Typography variant="h6" component="h4" sx={{ mb: 2, fontWeight: 'semibold' }}>
                            Get in Touch
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box>
                                <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                    Your Name
                                </Typography>
                                <TextField
                                    type="text"
                                    id="preview-name"
                                    placeholder="John Doe"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                    Your Email
                                </Typography>
                                <TextField
                                    type="email"
                                    id="preview-email"
                                    placeholder="john@example.com"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                    Subject
                                </Typography>
                                <TextField
                                    type="text"
                                    id="preview-subject"
                                    placeholder="Job Opportunity"
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography variant="body2" component="label" sx={{ display: 'block', mb: 1, fontWeight: 'medium' }}>
                                    Message
                                </Typography>
                                <TextField
                                    id="preview-message"
                                    rows={5}
                                    placeholder="Your message here..."
                                    multiline
                                    fullWidth
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            bgcolor: theme === 'dark' ? 'grey.800' : 'background.paper',
                                            color: theme === 'dark' ? 'common.white' : 'text.primary',
                                            '& fieldset': {
                                                borderColor: theme === 'dark' ? 'grey.600' : 'grey.300'
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                fullWidth
                                sx={{
                                    px: 3,
                                    py: 1,
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                            >
                                Send Message
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1" component="h4" sx={{ fontWeight: 'medium', mb: 1.5 }}>
                            Form Settings
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: 'primary.main',
                                            '&.Mui-checked': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    />
                                }
                                label="Send form submissions to my email"
                                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: 'primary.main',
                                            '&.Mui-checked': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    />
                                }
                                label="Save form submissions in database"
                                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: 'primary.main',
                                            '&.Mui-checked': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    />
                                }
                                label="Enable CAPTCHA protection"
                                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: 'primary.main',
                                            '&.Mui-checked': {
                                                color: 'primary.main',
                                            },
                                        }}
                                    />
                                }
                                label="Send auto-reply to sender"
                                sx={{ '& .MuiTypography-root': { fontSize: '0.875rem' } }}
                            />
                        </Box>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

export default Contact;