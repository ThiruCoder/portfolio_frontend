import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    TextField,
    Chip,
    Typography,
    IconButton,
    Paper,
    LinearProgress,
    Avatar
} from '@mui/material';
import { CloudUpload, Delete, Add } from '@mui/icons-material';

const FileAndArrayUpload = ({ file, setFile }) => {
    // const [file, setFile] = useState(null);
    const [tags, setTags] = useState(["React", "JavaScript", "Express", "Material-UI"]);
    const [newTag, setNewTag] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validate file type if needed
            if (!selectedFile.type.match('image.*')) {
                alert('Please select an image file');
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag)) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            handleAddTag();
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('tags', JSON.stringify(tags));

        try {
            // Simulate upload progress (replace with actual API call)
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 300);

            // In a real app, you would use fetch or axios:
            /*
            const response = await fetch('your-api-endpoint', {
              method: 'POST',
              body: formData,
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
              }
            });
      
            if (!response.ok) throw new Error('Upload failed');
            const result = await response.json();
            console.log('Upload successful:', result);
            */

            // Simulate API call completion
            setTimeout(() => {
                clearInterval(interval);
                setIsUploading(false);
                console.log('FormData contents:', {
                    image: file.name,
                    tags: tags
                });
                alert('Upload simulated successfully! Check console for data');
            }, 3000);
        } catch (error) {
            console.error('Upload error:', error);
            setIsUploading(false);
            alert('Upload failed');
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', position: 'relative', top: 34 }}>

            {/* File Upload Section */}
            <Box sx={{ mb: 3 }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    id="file-upload"
                />
                <label htmlFor="file-upload">
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUpload />}
                        fullWidth
                        sx={{ mb: 1 }}
                    >
                        Select Image
                    </Button>
                </label>

                {file && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Avatar
                            src={URL.createObjectURL(file)}
                            variant="rounded"
                            sx={{ width: 56, height: 56, mr: 2 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>{file.name}</Typography>
                            <Typography variant="caption">
                                {(file.size / 1024).toFixed(2)} KB
                            </Typography>
                        </Box>
                        <IconButton onClick={handleRemoveFile}>
                            <Delete color="error" />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default FileAndArrayUpload;