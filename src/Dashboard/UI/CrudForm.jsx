import { Autocomplete, Avatar, Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Paper, Select, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X } from 'lucide-react';
import { skillTags } from './skillTags';
import { apiIntance } from '../../middlewares/Url_GlobalErrorHandler';

const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(4),
}));

const Priority = {
    LOW: "Low",
    MEDIUM: "Medium",
    HIGH: "High",
    CRITICAL: 'Critical'
}
const Status = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: 'Archived'
}

const FormActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));


const CrudForm = ({ open, handleClose, style, setRefresh, updatedId, setUpdatedId, setOpen }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [url, setUrl] = useState('');

    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(null);

    const [priority, setPriority] = useState('');

    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState('');

    const [errors, setErrors] = useState('')

    const [updateFormData, setUpdateFormData] = useState('')

    const handleAddTag = () => {
        if (inputTag.trim() && !tags?.includes(inputTag.trim())) {
            setTags([...tags, inputTag?.trim()]);
            setInputTag('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    }

    const handleDelete = (tag) => {
        setTags(tags?.filter((t) => t !== tag));
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Title is required.';
        } else if (name.trim().length < 3) {
            newErrors.name = 'Title must be at least 3 characters.';
        } else if (name.trim().length > 100) {
            newErrors.name = 'Title must not exceed 100 characters.';
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required.';
        } else if (description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters.';
        } else if (description.trim().length > 1000) {
            newErrors.description = 'Description must not exceed 1000 characters.';
        }
        const validUrl = /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(:\d+)?(\/.*)?$/i.test(url)
        if (!url?.trim()) {
            newErrors.url = 'Url is required.';
        } else if (!validUrl) {
            newErrors.url = 'Url is invalid.';
        }

        if (!tags || tags?.length === 0) {
            newErrors.tags = 'At least one tag is required.'
        }

        if (!priority || !priority.trim()) {
            newErrors.priority = 'Priority is required.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        console.log(errors)
        if (!validate()) return;

        const formData = new FormData()
        formData.append('name', name);
        formData.append('description', description)
        formData.append('status', status)
        formData.append('priority', priority)
        formData.append('tags', JSON.stringify(tags))
        formData.append('image', image)
        formData.append('url', url)

        try {

            await apiIntance.post('/project/createProject', formData)
                .then(() => {
                    setName('');
                    setDescription('');
                    setPriority('');
                    setStatus('');
                    setUrl('');
                    setImage(null);
                    setPreview(null)
                    setErrors({});
                    setTags([]);
                    setInputTag('');
                    setRefresh((prev) => !prev);
                    setOpen((prev) => !prev);
                })
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
    };

    // Get all data
    useEffect(() => {
        async function GetUserData() {
            if (!updatedId) return;

            try {
                const response = await apiIntance.get('/project/get');
                const filtering = Array.isArray(response?.data)
                    ? response?.data.filter((item) => item._id === updatedId)
                    : [response?.data].filter((item) => item._id === updatedId);

                if (filtering?.length > 0) {
                    const task = filtering[0];
                    setName(task.title);
                    setDescription(task.description);
                    setImage(task?.image?.url || null);
                    setUrl(task?.url)
                    setPriority(task.priority);
                    setStatus(task.status);
                    setTags(task?.tags);
                    setOpen(true)
                }
            } catch (error) {
                // Handle request errors
                console.error('Error fetching tasks:', error);
            }
        }
        GetUserData();
    }, [updatedId]);


    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const id = updatedId;
        if (!validate()) return;

        const formData = {
            name,
            description,
            status,
            priority,
            tags
        };

        try {
            const res = await apiIntance.put(`/project/updateById/${id}`, formData);
            if (res) {
                setName('');
                setDescription('');
                setPriority(Priority.MEDIUM);
                setStatus(Status.IN_PROGRESS);
                setUpdatedId(null);
                setOpen((prev) => !prev);
                setRefresh((prev) => !prev)
            }

        } catch (error) {
            console.error('Update failed:', error.response?.data || error.message);
        }
    };



    // Reset form
    const resetForm = () => {
        setName('');
        setDescription('');
        setPriority('');
        setStatus('');
        setUrl('');
        setImage(null);
        setPreview(null)
        setErrors({});
        setTags([]);
        setInputTag('');
        setUpdatedId(null)
    };


    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                setUpdatedId(null);
                resetForm()
            }}
            component={'main'}
            aria-labelledby="child-modal-name"
            aria-describedby="child-modal-description"
        >
            <Box component={'main'} sx={{ ...style, width: { xs: 440, sm: 550, md: 600, lg: 700 } }}>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginTop: 15 }}
                >
                    <FormContainer elevation={2} sx={{ position: 'relative' }}>

                        <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 700, color: 'inherit', fontSize: '2.2em' }} gutterBottom>
                            {updatedId ? 'Update Project' : 'Create New Project'}
                        </Typography>
                        <IconButton sx={{ position: 'absolute', top: 28, right: 20 }}
                            onClick={() => {
                                handleClose();
                            }}><X /></IconButton>

                        <form onSubmit={updatedId ? handleUpdateSubmit : handleCreateSubmit}>

                            <Grid spacing={2} container>
                                <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                                    <TextField
                                        label="Name"
                                        fullWidth
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        margin="normal"
                                        variant="outlined"
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                                        <Button variant="outlined" component="label" sx={{ px: 10, height: 52 }}>
                                            {preview ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar src={preview} alt="Preview" sx={{ width: 30, height: 30 }} />
                                                    <Typography sx={{
                                                        fontWeight: 600,
                                                        width: 180,
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap'
                                                    }}>{image?.name}</Typography>
                                                </Box>
                                            ) : (
                                                'Upload Image'
                                            )}

                                            <input
                                                type='file'
                                                accept='image/*'
                                                hidden
                                                onChange={handleFileChange}
                                            />
                                        </Button>

                                    </Box>
                                    <Box>
                                        <TextField
                                            label="Url"
                                            fullWidth
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            margin="normal"
                                            variant="outlined"
                                            error={!!errors.url}
                                            helperText={errors.url}
                                            required
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        margin="normal"
                                        variant="outlined"
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        multiline
                                        rows={7.1}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid spacing={2} container>
                                <Grid item xs={12} md={12} sx={{ position: 'relative' }}>
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        options={skillTags.filter((tag) => !tags.includes(tag))}
                                        value={tags}
                                        inputValue={inputTag}
                                        onInputChange={(e, newInputValue) => setInputTag(newInputValue)}
                                        onChange={(e, newValue) => setTags(newValue)}
                                        renderTags={(value, getTagProps) =>
                                            value.map((option, index) => (
                                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                            ))
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                label="Add Tag"
                                                fullWidth
                                                {...params}
                                                onChange={(e) => setInputTag(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                margin="normal"
                                                variant="outlined"
                                                error={!!errors.tags}
                                                helperText={errors.tags}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="priority-label">Priority</InputLabel>
                                    <Select
                                        labelId="priority-label"
                                        id="priority"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        error={!!errors.priority}
                                        label="Priority"
                                    >
                                        <MenuItem value={Priority.LOW}>{Priority.LOW}</MenuItem>
                                        <MenuItem value={Priority.MEDIUM}>{Priority.MEDIUM}</MenuItem>
                                        <MenuItem value={Priority.HIGH}>{Priority.HIGH}</MenuItem>
                                        <MenuItem value={Priority.CRITICAL}>{Priority.CRITICAL}</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="status-label">Status</InputLabel>
                                    <Select
                                        labelId="status-label"
                                        id="status"
                                        value={status}
                                        label="Status"
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <MenuItem value={Status.PENDING}>{Status.PENDING}</MenuItem>
                                        <MenuItem value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</MenuItem>
                                        <MenuItem value={Status.ARCHIVED}>{Status.ARCHIVED}</MenuItem>
                                        <MenuItem value={Status.COMPLETED}>{Status.COMPLETED}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', mt: 1 }}>
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
                                // onClick={() => {
                                //     setFormOpen(false)
                                // }}
                                >
                                    {updatedId ? 'Update Project' : 'Create Project'}
                                </Button>
                            </Box>
                        </form>
                    </FormContainer>
                </motion.div>
            </Box>
        </Modal>
    )
}

export default CrudForm