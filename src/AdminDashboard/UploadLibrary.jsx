import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { color } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'

const UploadLibrary = () => {
    const [formData, setFormData] = useState([])
    const [libraryData, setLibraryData] = useState([])

    const handleForm = (e) => {
        const { name, value } = e.target;
        setFormData(() => ({
            ...formData,
            [name]: value
        }))
    }

    const backendUrl = 'https://porfolio-backend-spbi.onrender.com'
    const backendTrilUrl = 'http://localhost:5000'

    const handleLibrary = async (e) => {
        e.preventDefault();

        const { title, description, url } = formData;

        const constructorForm = new FormData()
        constructorForm.append('title', title)
        constructorForm.append('url', url)
        constructorForm.append('description', description)

        try {

            await axios.post(`${backendUrl}/postLib/uploadLib`, constructorForm, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err))
        } catch (error) {
            console.log(error.response.data.message || error.message);

        }

    }

    useEffect(() => {
        const getLibraryData = async () => {
            try {
                await axios.get(`${backendUrl}/postLib/getLib`)
                    .then((res) => setLibraryData(res.data.data))
                    .catch((err) => console.log(err))
            } catch (error) {
                console.log(error);
            }
        }
        getLibraryData()
    }, [])


    return (
        <div>
            <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px', marginTop: '24px' }}>
                <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 700, opacity: 0.7 }}>Upload Library</Typography>
                <form onSubmit={handleLibrary}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid md={6} sm={12} xs={12} sx={{ display: 'flex', gap: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField fullWidth onChange={handleForm} name='title' label="Title" variant="outlined" type='text' sx={{
                                backgroundColor: '#4A5568',
                                borderRadius: '4px',
                                width: '95%',
                                input: {
                                    color: 'white'
                                },
                                label: {
                                    color: 'white'
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white', // Input text color
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white', // Label text color
                                },
                            }} required />
                            <TextField fullWidth onChange={handleForm} name='url' label="Url" variant="outlined" type='url' sx={{
                                backgroundColor: '#4A5568',
                                borderRadius: '4px',
                                width: '95%',
                                input: {
                                    color: 'white'
                                },
                                label: {
                                    color: 'white'
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white', // Input text color
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white', // Label text color
                                },
                            }} required />
                            <TextField fullWidth onChange={handleForm} name='description' label="Description" variant="outlined" type='text' multiline rows={4} sx={{
                                backgroundColor: '#4A5568',
                                borderRadius: '4px',
                                width: '95%',
                                input: {
                                    color: 'white'
                                },
                                label: {
                                    color: 'white'
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white', // Input text color
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white', // Label text color
                                },
                            }} required />
                            <Button fullWidth variant="contained" type='submit' sx={{ backgroundColor: '#1B9AF5', width: '90%' }}>Submit</Button>

                        </Grid>
                        <Grid md={6} sm={12} xs={12}>

                            <Paper style={{ backgroundColor: '#2D3748', padding: '16px', borderRadius: '8px' }}>
                                <Typography variant="h6" style={{ marginBottom: '16px', color: 'white', fontWeight: 600, opacity: 0.7 }}>Recent Projects</Typography>
                                <Grid container spacing={2}>
                                    {libraryData && libraryData.length > 0 ? libraryData.map((lib, index) => (
                                        <Grid item xs={12} sm={12} key={index}>
                                            <Paper style={{ backgroundColor: '#4A5568', padding: '16px', borderRadius: '8px' }}>
                                                <a href={lib.url}>
                                                    <Typography variant="subtitle1" style={{ marginTop: '8px', color: 'white', fontWeight: 600, opacity: 0.7 }}>{lib?.title}</Typography>
                                                </a>
                                                <Typography variant="body2" style={{ color: '#A0AEC0' }}>Progress: {lib?.description}</Typography>
                                            </Paper>
                                        </Grid>
                                    )).splice(0, 2) : null}
                                </Grid>
                            </Paper>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    )
}

export default UploadLibrary