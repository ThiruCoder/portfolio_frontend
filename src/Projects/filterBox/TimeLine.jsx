'use client';
import { Box, Button, CardHeader, Checkbox, Chip, Divider, Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import { Info } from 'lucide-react';
import React from 'react'
const Status = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: 'Archived'
}
const TimeLine = ({ page, projects, setPage, setShowId }) => {
    return (
        <Box sx={{ my: 3 }}>
            <Grid container spacing={3}>
                {/* Pending */}
                <Grid item xs={12} md={3}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>In Queue</Button>

                    {projects.map((project, index) => {
                        if (project?.status === Status?.PENDING) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>{project?.title}</Typography>
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
                            )
                        }
                    })}

                </Grid>
                {/* In Progress */}
                <Grid item xs={12} md={3}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>On Progress</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.IN_PROGRESS) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>{project?.title}</Typography>
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
                            )
                        }
                    })}
                </Grid>
                {/* Archieved */}
                <Grid item xs={12} md={3}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>Testing</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.ARCHIVED) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>{project?.title}</Typography>
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
                            )
                        }
                    })}
                </Grid>
                {/* Completed */}
                <Grid item xs={12} md={3} sx={{ position: 'relative' }}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>Completed</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.COMPLETED) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>{project?.title}</Typography>
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
                            )
                        }
                    })}
                </Grid>
            </Grid>
        </Box>
    )
}

export default TimeLine