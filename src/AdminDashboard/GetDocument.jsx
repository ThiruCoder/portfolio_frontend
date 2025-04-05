import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Button,
    LinearProgress,
    Avatar,
    Divider,
    CircularProgress,
    Grid,
    TextField,
    Tooltip
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    InsertDriveFile as InsertDriveFileIcon,
    Image as ImageIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    Add as AddIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const FileUploadComponent = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState([])
    const [fileData, setFileData] = useState([])
    const [storageUsed, setStorageUsed] = useState(4.2);
    const [storageTotal] = useState(10);
    const [success, setSuccess] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [error, setError] = useState('')

    const API_URL = 'http://localhost:5000/postpdf';

    const handleFileChange = (e) => {
        // Handle file upload logic here
        const file = e.target.files[0];

        const newFile = {
            file: file.name,
            size: (file.size / (1024)).toFixed(2) > 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${(file.size / (1024)).toFixed(2)} KB`,
            type: file.type.split('/')[1].toUpperCase(),
            progress: 0,
            completed: false
        };
        setFileData(newFile)
        setFiles(file);
    };


    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const handleclearAll = () => {
        setFiles([]);
        setFormData([])
    };

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData(() => ({
            ...formData,
            [name]: value
        }))
    }

    // const URL = import.meta.env.VITE_URL_POSTPDF
    // console.log('URL', URL);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // const URL = import.meta.env.VITE_URL_POSTPDF
            const token = localStorage.getItem('token');

            const { title, description } = formData;
            // const file = files.map(ite => ite.file).join()
            const uploadedData = new FormData();
            uploadedData.append("file", files);
            uploadedData.append("title", title);
            uploadedData.append("title", description);
            if (!files) {
                setError('Please select a PDF file');
                return;
            }
            setError('')
            if (!title || !description) {
                setError('Please upload title and description!');
                return;
            }
            console.log(title, description, files);

            setError('')
            await axios.post(`${API_URL}/upload`, uploadedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            }).then((response) => console.log(response))
                .catch((err) => setError(err?.response?.data?.message || err?.message))

            setError('')
            setSuccess('PDF uploaded successfully!');
            setFormData([])
            setFiles([])
            setUploadProgress(0);
        } catch (err) {
            setError(err.response?.data?.message || err?.message);
            console.log(err.response?.data?.message || err?.message);

        }

    }

    const handlePreviewPDF = async () => {
        try {
            const getPdfPreview = await axios.get('http://localhost:5000/postpdf/getfile');

            // Assuming the API returns a list of file URLs like: [{ file: { url: "..." } }]
            const pdfUrl = getPdfPreview.data.data[0].file.url; // or map if multiple

            console.log('PDF URL:', pdfUrl);

            // Now fetch the actual PDF file
            const response = await fetch(pdfUrl);
            const blob = await response.blob();

            if (blob.type === "application/pdf") {
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL, "_blank");
            } else {
                alert("File is not a PDF");
            }
        } catch (error) {
            console.log(error);

        }
        //     try {
        //       const response = await fetch(cloudinaryPdfUrl); // secure_url from Cloudinary
        //       const blob = await response.blob();

        //       if (blob.type === "application/pdf") {
        //         const url = URL.createObjectURL(blob);
        //         window.open(url, "_blank");
        //       } else {
        //         alert("File is not a PDF");
        //       }
        //     } catch (err) {
        //       console.error("Preview failed:", err);
        //     }
    };


    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Paper
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '16px',
                        bgcolor: 'background.paper',
                        boxShadow: 3,
                        p: 3,
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-4px)',
                            transition: 'all 0.3s ease'
                        }
                    }}
                >
                    {/* Gradient circles */}
                    <motion.div
                        initial={{ scale: 1, opacity: 0.3 }}
                        animate={{ scale: 1.5, opacity: 0.7 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
                        style={{
                            position: 'absolute',
                            left: -64,
                            top: -64,
                            width: 128,
                            height: 128,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 165, 233, 0) 100%)',
                            filter: 'blur(16px)'
                        }}
                    />
                    <motion.div
                        initial={{ scale: 1, opacity: 0.3 }}
                        animate={{ scale: 1.5, opacity: 0.7 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
                        style={{
                            position: 'absolute',
                            right: -64,
                            bottom: -64,
                            width: 128,
                            height: 128,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0) 100%)',
                            filter: 'blur(16px)'
                        }}
                    />

                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h6" color="text.primary" fontWeight="medium">
                                Upload Files
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Drag & drop your files here
                            </Typography>
                        </Box>
                        <Tooltip title='Previous file'>
                            <IconButton sx={{ bgcolor: 'primary.light', color: 'primary.main' }} onClick={handlePreviewPDF}>
                                <CloudUploadIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box component={'form'} onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ mt: 3 }}>

                            <Grid md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Dropzone */}

                                <Box
                                    component="label"
                                    htmlFor="file-upload"
                                    sx={{
                                        position: 'relative',
                                        display: 'block',
                                        borderRadius: '12px',
                                        border: '2px dashed',
                                        borderColor: 'divider',
                                        bgcolor: 'background.default',
                                        p: 4,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'border-color 0.3s',
                                        '&:hover': {
                                            borderColor: 'primary.main'
                                        },
                                        width: '90%'
                                    }}
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        name='file'
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                                        <Avatar sx={{ bgcolor: 'background.paper', width: 80, height: 80 }}>
                                            <AddIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                        </Avatar>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Typography variant="body1" fontWeight="medium" color="text.primary">
                                                Drop your files here or browse
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {fileData?.type ? `File type is ${fileData?.type}` : `Support files: PDF, DOCS, DOC`}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {fileData?.size ? `File size is ${fileData?.size}` : 'Max file size: 6 MB'}
                                            </Typography>
                                            <Typography>
                                                {fileData?.name ? fileData?.name : null}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                            </Grid>
                            <Grid md={7}>
                                {isUploading && (
                                    <Box sx={{ width: '100%', mb: 2 }}>
                                        <LinearProgress variant="determinate" value={uploadProgress} />
                                        <Typography variant="caption" display="block" textAlign="right">
                                            {uploadProgress}%
                                        </Typography>
                                    </Box>
                                )}
                                {/* Recent uploaded */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, flexDirection: 'column' }}>
                                    <TextField label='Title' sx={{ width: '100%' }} name='title' onChange={handleFormData} />
                                    <TextField label='Description' sx={{ width: '100%' }} name='description' onChange={handleFormData} />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', top: 12 }}>
                                    <Typography sx={{ color: 'inherit', opacity: 0.7, fontWeight: 600, }}>{error}</Typography>
                                </Box>


                                {/* Buttons */}
                                <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <Button
                                        component={motion.button}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        variant="contained"
                                        color="primary"
                                        type='submit'
                                        startIcon={<CloudUploadIcon />}
                                        sx={{
                                            background: 'linear-gradient(90deg, #06b6d4 0%, #0ea5e9 100%)',
                                            borderRadius: '12px',
                                            py: 1.5,
                                            fontWeight: 'medium',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                boxShadow: '0 4px 14px rgba(6, 182, 212, 0.2)'
                                            }
                                        }}
                                    >
                                        Upload Pdf
                                    </Button>
                                    <Button
                                        component={motion.button}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        variant="outlined"
                                        color="inherit"
                                        startIcon={<DeleteIcon />}
                                        onClick={handleclearAll}
                                        sx={{
                                            borderRadius: '12px',
                                            py: 1.5,
                                            fontWeight: 'medium',
                                            borderColor: 'divider',
                                            color: 'text.primary',
                                            '&:hover': {
                                                borderColor: 'divider',
                                                bgcolor: 'action.hover'
                                            }
                                        }}
                                    >
                                        Clear All
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default FileUploadComponent;