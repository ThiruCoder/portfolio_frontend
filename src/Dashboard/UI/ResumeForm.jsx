import { Autocomplete, Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react';
import { educationCourses, skillCategories, skillTags } from './skillTags';
import { apiIntance } from '../../middlewares/Url_GlobalErrorHandler';

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
}));

const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));



const ResumeForm = ({ open, handleClose, style, setRefresh, updatedId, setOpen, setUpdatedId }) => {
    const [formData, setFormData] = useState({
        personalData: {
            fname: '',
            lname: '',
            role: '',
            email: '',
            number: '',
            address: {
                city: '',
                state: '',
                country: ''
            }
        },
        summary: '',
        experience: {
            company: '',
            jobType: '',
            joinDate: '',
            lastDate: '',
            performance: []
        },
        education: {
            ug: {
                course: '',
                college: '',
                university: '',
                start: '',
                end: ''
            }
        },
        skills: []
    });
    const [inputTag, setInputTag] = useState('')
    const [newSkill, setNewSkill] = useState({
        name: '',
        category: '',
        proficiency: 1,
        experience: 1,
        certified: false
    });

    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);

    const validate = () => {
        const newErrors = {};

        // Personal Data validation
        if (!formData?.personalData?.fname.trim()) {
            newErrors.fname = 'First name is required';
        } else if (formData?.personalData?.fname.trim().length < 2) {
            newErrors.fname = 'Must be at least 2 characters';
        } else if (formData?.personalData?.fname.trim().length > 30) {
            newErrors.fname = 'Must not exceed 30 characters';
        }

        if (!formData?.personalData?.lname.trim()) {
            newErrors.lname = 'Last name is required';
        } else if (formData?.personalData?.lname.trim().length < 2) {
            newErrors.lname = 'Must be at least 2 characters';
        } else if (formData?.personalData?.lname.trim().length > 30) {
            newErrors.lname = 'Must not exceed 30 characters';
        }

        if (!formData?.personalData?.role.trim()) {
            newErrors.role = 'Role is required';
        } else if (formData?.personalData?.role.trim().length < 2) {
            newErrors.role = 'Must be at least 2 characters';
        } else if (formData?.personalData?.role.trim().length > 60) {
            newErrors.role = 'Must not exceed 60 characters';
        }

        if (!formData?.personalData?.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.personalData?.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData?.personalData?.number) {
            newErrors.number = 'Phone number is required';
        }

        // Address validation
        if (!formData?.personalData?.address?.city.trim()) {
            newErrors.city = 'City is required';
        } else if (formData?.personalData?.address?.city.trim().length < 2) {
            newErrors.city = 'Must be at least 2 characters';
        } else if (formData?.personalData?.address?.city.trim().length > 30) {
            newErrors.city = 'Must not exceed 30 characters';
        }

        if (!formData?.personalData?.address?.state.trim()) {
            newErrors.state = 'State is required';
        } else if (formData?.personalData?.address?.state.trim().length < 2) {
            newErrors.state = 'Must be at least 2 characters';
        } else if (formData?.personalData?.address?.state.trim().length > 30) {
            newErrors.state = 'Must not exceed 30 characters';
        }

        if (!formData?.personalData?.address?.country.trim()) {
            newErrors.country = 'Country is required';
        } else if (formData?.personalData?.address?.country.trim().length < 2) {
            newErrors.country = 'Must be at least 2 characters';
        } else if (formData?.personalData?.address?.country.trim().length > 30) {
            newErrors.country = 'Must not exceed 30 characters';
        }

        // Summary validation
        if (formData?.summary && formData?.summary.trim().length < 5) {
            newErrors.summary = 'Must be at least 5 characters';
        } else if (formData?.summary && formData?.summary.trim().length > 1000) {
            newErrors.summary = 'Must not exceed 1000 characters';
        }

        // Education validation
        if (!formData?.education?.ug?.college.trim()) {
            newErrors.college = 'College name is required';
        } else if (formData?.education?.ug?.college.trim().length < 2) {
            newErrors.college = 'Must be at least 2 characters';
        } else if (formData?.education?.ug?.college.trim().length > 60) {
            newErrors.college = 'Must not exceed 60 characters';
        }

        if (!formData?.education?.ug?.university.trim()) {
            newErrors.university = 'University name is required';
        } else if (formData?.education?.ug?.university?.trim().length < 2) {
            newErrors.university = 'Must be at least 2 characters';
        } else if (formData?.education?.ug?.university.trim().length > 60) {
            newErrors.university = 'Must not exceed 60 characters';
        }

        if (!formData?.education?.ug?.start) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData?.education?.ug?.end) {
            newErrors.endDate = 'End date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // console.log('newSkill', newSkill);


    const handleChange = (path, value) => {
        const keys = path.split('.');
        setFormData(prev => {
            const newData = { ...prev };
            let current = newData;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };
    const handleAddTag = () => {
        const trimmed = inputTag.trim();
        if (trimmed && !formData?.skills.includes(trimmed)) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, trimmed]
            }));
            setInputTag('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };
    const handleAddSkill = () => {
        if (newSkill.name && newSkill.category) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill]
            }));
            setNewSkill({
                name: '',
                category: '',
                proficiency: 1,
                experience: 1,
                certified: false
            });
        }
    };

    const handleRemoveSkill = (index) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };


    const perform = formData?.experience?.performance
    useEffect(() => {
        const per = perform
            .map((item) => item.trim())
            .filter((item) => item !== '');
        setFormData((prev) => ({
            ...prev,
            experience: {
                ...prev.experience,
                performance: per
            }
        }))

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const cleanedPerformance = perform
            .map((item) => item.trim())
            .filter((item) => item !== '');

        // Create a cleaned copy of formData
        const cleanedFormData = {
            ...formData,
            experience: {
                ...formData.experience,
                performance: cleanedPerformance
            },
        };

        console.log('dsafjhlas', cleanedFormData); // ✅ This will show the updated values

        try {
            const endpoint = updatedId ? `/resume/updateById/${updatedId}` : '/resume/createResume';
            const method = updatedId ? 'put' : 'post';

            // Use the cleaned version for the request
            await apiIntance[method](endpoint, cleanedFormData)
                .then((res) => {
                    // resetForm();
                    // setRefresh(prev => !prev);
                    // handleClose();
                    // setRefresh((prev) => !prev)
                    console.log(res);
                })
                .catch(err => console.log('resumeForm', err));
        } catch (error) {
            console.log(error);
        }
    };


    const resetForm = () => {
        setFormData({
            personalData: {
                fname: '',
                lname: '',
                role: '',
                email: '',
                number: '',
                address: {
                    city: '',
                    state: '',
                    country: ''
                }
            },
            summary: '',
            experience: {
                company: '',
                role: '',
                joinDate: '',
                lastDate: '',
                performance: []
            },
            education: {
                ug: {
                    college: '',
                    university: '',
                    start: '',
                    end: ''
                }
            },
            skills: [],
        });
        setNewSkill({
            name: '',
            category: '',
            proficiency: 1,
            experience: 1,
            certified: false
        });
        setErrors({});
        setPreview(null);
        setInputTag('')

    };

    useEffect(() => {
        async function fetchData() {
            if (!updatedId) return;

            try {
                const response = await apiIntance.get(`/resume/getResumeById/${updatedId}`);

                const item = response.data;
                setFormData({
                    personalData: {
                        fname: item.personalData.fname,
                        lname: item.personalData.lname,
                        role: item.personalData.role,
                        email: item.personalData.email,
                        number: item.personalData.number,
                        address: {
                            city: item.personalData.address.city,
                            state: item.personalData.address.state,
                            country: item.personalData.address.country
                        }
                    },
                    summary: item.summary,
                    experience: {
                        company: item.experience.company,
                        jobType: item.experience.jobType,
                        joinDate: item.experience.joinDate.split('T')[0],
                        lastDate: item.experience.lastDate.split('T')[0],
                        performance: item.experience.performance
                    },
                    education: {
                        ug: {
                            course: item.education.ug.course,
                            college: item.education.ug.college,
                            university: item.education.ug.university,
                            start: item.education.ug.start.split('T')[0],
                            end: item.education.ug.end.split('T')[0]
                        }
                    },
                    skills: [...item.skills]
                });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [updatedId]);

    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                resetForm();
                setUpdatedId(null)
            }}
            component={'main'}
            aria-labelledby="resume-modal-title"
            aria-describedby="resume-modal-description"
        >
            <Box component={'main'} sx={{ ...style, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FormContainer elevation={2} sx={{ position: 'relative' }}>
                        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 700, color: 'inherit', fontSize: '2.2em' }} gutterBottom>
                            {updatedId ? 'Update Resume' : 'Create Resume'}
                        </Typography>
                        <IconButton sx={{ position: 'absolute', top: 28, right: 20 }}
                            onClick={() => {
                                handleClose();
                                resetForm();
                                setUpdatedId(null)
                            }}>
                            <X />
                        </IconButton>

                        <form onSubmit={handleSubmit}>
                            {/* Personal Data Section */}
                            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Personal Information</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="First Name"
                                        fullWidth
                                        value={formData?.personalData?.fname}
                                        onChange={(e) => handleChange('personalData.fname', e.target.value)}
                                        error={!!errors.fname}
                                        helperText={errors.fname}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Last Name"
                                        fullWidth
                                        value={formData?.personalData?.lname}
                                        onChange={(e) => handleChange('personalData.lname', e.target.value)}
                                        error={!!errors.lname}
                                        helperText={errors.lname}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Role/Title"
                                        fullWidth
                                        value={formData?.personalData?.role}
                                        onChange={(e) => handleChange('personalData.role', e.target.value)}
                                        error={!!errors.role}
                                        helperText={errors.role}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Email"
                                        fullWidth
                                        type="email"
                                        value={formData?.personalData?.email}
                                        onChange={(e) => handleChange('personalData.email', e.target.value)}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Phone Number"
                                        fullWidth
                                        type="number"
                                        value={formData?.personalData?.number}
                                        onChange={(e) => handleChange('personalData.number', e.target.value)}
                                        error={!!errors.number}
                                        helperText={errors.number}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <Button variant="outlined" component="label" sx={{ height: 56, width: '100%' }}>
                                        {preview ? (
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar src={preview} alt="Preview" sx={{ width: 30, height: 30 }} />
                                                <Typography>Profile Image</Typography>
                                            </Box>
                                        ) : 'Upload Profile Image'}
                                        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Address Section */}
                            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Address</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4} >
                                    <TextField
                                        label="City"
                                        fullWidth
                                        value={formData?.personalData?.address?.city}
                                        onChange={(e) => handleChange('personalData.address.city', e.target.value)}
                                        error={!!errors.city}
                                        helperText={errors.city}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <TextField
                                        label="State"
                                        fullWidth
                                        value={formData?.personalData?.address?.state}
                                        onChange={(e) => handleChange('personalData.address.state', e.target.value)}
                                        error={!!errors.state}
                                        helperText={errors.state}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <TextField
                                        label="Country"
                                        fullWidth
                                        value={formData?.personalData?.address?.country}
                                        onChange={(e) => handleChange('personalData.address.country', e.target.value)}
                                        error={!!errors.country}
                                        helperText={errors.country}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            {/* Summary Section */}
                            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Professional Summary</Typography>
                            <TextField
                                label="Summary"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData?.summary}
                                onChange={(e) => handleChange('summary', e.target.value)}
                                error={!!errors.summary}
                                helperText={errors.summary}
                            />

                            {/* Experience Section */}
                            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Experience</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Company"
                                        fullWidth
                                        value={formData?.experience?.company}
                                        onChange={(e) => handleChange('experience.company', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Job Type"
                                        fullWidth
                                        value={formData?.experience?.jobType}
                                        onChange={(e) => handleChange('experience.jobType', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Join Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={formData?.experience?.joinDate}
                                        onChange={(e) => handleChange('experience.joinDate', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Last Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={formData?.experience?.lastDate}
                                        onChange={(e) => handleChange('experience.lastDate', e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <TextField
                                        label="Performance"
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        value={formData.experience.performance.join('\n')}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                experience: {
                                                    ...formData.experience,
                                                    performance: e.target.value.split('\n'),
                                                },
                                            })
                                        }
                                    />

                                </Grid>
                            </Grid>

                            {/* Education Section */}
                            <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>Education</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="College"
                                        fullWidth
                                        value={formData?.education?.ug?.college}
                                        onChange={(e) => handleChange('education.ug.college', e.target.value)}
                                        error={!!errors.college}
                                        helperText={errors.college}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="University"
                                        fullWidth
                                        value={formData?.education?.ug?.university}
                                        onChange={(e) => handleChange('education.ug.university', e.target.value)}
                                        error={!!errors.university}
                                        helperText={errors.university}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <FormControl fullWidth>
                                        <InputLabel>Course</InputLabel>
                                        <Select
                                            value={formData?.education?.ug?.course}
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    education: {
                                                        ...prev.education,
                                                        ug: {
                                                            ...prev.education.ug,
                                                            course: e.target.value,
                                                        },
                                                    },
                                                }))
                                            }
                                            label="Course"
                                        >
                                            {educationCourses.map(course => (
                                                <MenuItem key={course} value={course}>{course}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <TextField
                                        label="Start Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={formData?.education?.ug?.start}
                                        onChange={(e) => handleChange('education.ug.start', e.target.value)}
                                        error={!!errors.startDate}
                                        helperText={errors.startDate}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={4} >
                                    <TextField
                                        label="End Date"
                                        type="date"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        value={formData?.education?.ug?.end}
                                        onChange={(e) => handleChange('education.ug.end', e.target.value)}
                                        error={!!errors.endDate}
                                        helperText={errors.endDate}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            {/* Skills Section */}
                            <Typography variant="h6" sx={{ mt: 3 }}>Skills</Typography>
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={4} sx={{ mt: 2 }}>
                                    
                                    <FormControl fullWidth>
                                        <InputLabel>Skill</InputLabel>
                                        <Select
                                            value={newSkill?.name ? newSkill?.name : null}
                                            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                            label="Skill"
                                        >
                                            {skillTags.map(category => (
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Box>
                                        {formData?.skills?.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                label={skill.name}
                                                onDelete={() => handleRemoveSkill(index)}
                                                sx={{ margin: 0.5 }}
                                            />
                                        ))}
                                    </Box>

                                </Grid>
                                <Grid item xs={12} md={3} sx={{ mt: 2 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={newSkill?.category}
                                            onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                            label="Category"
                                        >
                                            {skillCategories.map(category => (
                                                <MenuItem key={category} value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2} sx={{ mt: 2 }}>
                                    <FormControl sx={{ minWidth: 180 }}>
                                        <InputLabel>Profficient</InputLabel>
                                        <Select
                                            label="Profficient"
                                            id='profficient'
                                            value={newSkill?.proficiency}
                                            onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                                        >
                                            {[...Array(10)].map((_, index) => (
                                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={2} sx={{ mt: 2 }}>
                                    <FormControl sx={{ minWidth: 180 }}>
                                        <InputLabel>Experience</InputLabel>
                                        <Select
                                            label="Experience"
                                            id='Experience'
                                            value={newSkill?.experience}
                                            onChange={(e) => setNewSkill({ ...newSkill, experience: e.target.value })}
                                        >
                                            {[...Array(10)].map((_, index) => (
                                                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleAddSkill}
                                        disabled={!newSkill?.name || !newSkill?.category}
                                        fullWidth
                                    >
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>

                            {/* Form Actions */}
                            <FormActions>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<X size={18} />}
                                    onClick={resetForm}
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Save size={18} />}
                                >
                                    {updatedId ? 'Update Resume' : 'Create Resume'}
                                </Button>
                            </FormActions>
                        </form>
                    </FormContainer>
                </motion.div>
            </Box>
        </Modal>
    )
}

export default ResumeForm;