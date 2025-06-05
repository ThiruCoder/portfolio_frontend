'use client';
import { Box, Button, CardHeader, CardMedia, Checkbox, Chip, Divider, Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import { Info } from 'lucide-react';
import React from 'react'
const Status = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: 'Archived'
}

const List = ({ page, projects, setPage, setShowId }) => {
    return (
        <Box sx={{ my: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    {projects.map((project, index) => (
                        <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1, display: 'flex', flexDirection: 'row' }}>
                            <Box>
                                <CardMedia
                                    component={'img'}
                                    src={project?.image?.url}
                                    alt="Project Image"
                                    layout="responsive"
                                    sx={{ objectFit: 'cover', width: { xs: 150, md: 300 }, height: '100%', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}
                                />
                            </Box>
                            <Box>
                                <CardHeader
                                    title={
                                        <Typography sx={{ color: 'black', fontWeight: 700 }}>{project?.name}</Typography>
                                    }
                                    subheader={
                                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 0.8, gap: 0.7 }}>
                                            <Chip label={project?.priority} color='success' sx={{ fontWeight: 600, height: 23 }} variant='outlined' />
                                            <Chip label={project?.createdAt.split('T')[0]} color='info' sx={{ fontWeight: 600, height: 23 }} variant='outlined' />
                                        </Box>
                                    }
                                    action={
                                        <IconButton
                                            onClick={() => {
                                                setPage('WholeData')
                                                setShowId(project?._id)
                                            }}
                                        >
                                            <Info />
                                        </IconButton>
                                    }
                                    sx={{ width: '100%' }}
                                />
                                <Typography sx={{
                                    width: '100%',
                                    lineClamp: 1,
                                    WebkitLineClamp: 1,
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    msTextOverflow: 'ellipsis',
                                    boxOrient: 'vertical',
                                    WebkitBoxOrient: 'vertical',
                                    color: 'black',
                                    px: 2
                                }}>{project?.description}</Typography>
                                <Box sx={{ width: '90%', ml: 2, mt: 0.7, mb: 1 }}>
                                    <LinearProgress variant="determinate" value={20} />
                                    <Typography sx={{ fontWeight: 500, fontSize: '.8em', color: 'black' }}>On Progress</Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}

                </Grid>
            </Grid>
        </Box>
    )
}

export default List