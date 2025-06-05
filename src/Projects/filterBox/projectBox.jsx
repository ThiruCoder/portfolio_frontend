import { Box, Button, CardHeader, Checkbox, Chip, Container, Divider, FormControlLabel, Grid, LinearProgress, Typography } from '@mui/material'
import { AlignStartHorizontal, AlignStartVertical, ArrowDownUp, Calendar, Grid2x2, LayoutList, ListFilter, Plus } from 'lucide-react'
import React, { useState } from 'react'
import Board from './Board'
import TimeLine from './TimeLine'
import List from './List'
import Table from './Table'
import WholeData from './WholeData'

const ProjectsData = ({ projects = [], page, setPage, setShowId, showId }) => {

    const ActivePage = () => {
        switch (page) {
            case 'Board':
                return (
                    <Board projects={projects} page={page} setPage={setPage} setShowId={setShowId} />
                )
            case 'Timeline':
                return (
                    <TimeLine projects={projects} page={page} setPage={setPage} setShowId={setShowId} />
                )
            case 'List':
                return (
                    <List projects={projects} page={page} setPage={setPage} setShowId={setShowId} />
                )
            case 'Table':
                return (
                    <Table projects={projects} page={page} setPage={setPage} setShowId={setShowId} />
                )
            case 'WholeData':
                return (
                    <WholeData showId={showId} />
                )
            default:
                return (
                    <Board projects={projects} page={page} />
                )
        }
    }
    console.log('showId', showId);

    return (
        <Box >
            <Container sx={{ my: 8, border: '1px solid purple', p: 2, borderRadius: 3 }}>
                <Box>
                    <Typography sx={{
                        color: 'black',
                        fontWeight: 700,
                        fontSize: '1.6em',
                        my: 3,
                        fontFamily: 'Inter, sans-serif',
                    }}>High-lighted Project</Typography>
                    <Divider />

                    {/* Filter Options */}
                    <Box sx={{ mt: 0.6, mb: 1.2, display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button sx={{
                                borderBottom: page === 'Board' ? '2px solid purple' : '2px solid gray',
                                color: page === 'Board' ? 'purple' : 'gray',
                                borderRadius: 0,
                                ":hover": { borderBottom: '2px solid purple', color: 'purple' },
                                fontWeight: 700,

                            }}
                                onClick={() => setPage('Board')}
                                startIcon={
                                    <AlignStartVertical size={18} />
                                }>Board</Button>
                            <Button sx={{
                                borderBottom: page === 'Timeline' ? '2px solid purple' : '2px solid gray',
                                color: page === 'Timeline' ? 'purple' : 'gray',
                                borderRadius: 0,
                                ":hover": { borderBottom: '2px solid purple', color: 'purple' },
                                fontWeight: 700
                            }}
                                onClick={() => setPage('Timeline')}
                                startIcon={
                                    <AlignStartHorizontal size={18} />
                                }>Timeline</Button>
                            <Button sx={{
                                borderBottom: page === 'List' ? '2px solid purple' : '2px solid gray',
                                color: page === 'List' ? 'purple' : 'gray',
                                borderRadius: 0,
                                ":hover": { borderBottom: '2px solid purple', color: 'purple' },
                                fontWeight: 700
                            }}
                                onClick={() => setPage('List')}
                                startIcon={
                                    <LayoutList size={18} />
                                }>List</Button>
                            <Button sx={{
                                borderBottom: page === 'Table' ? '2px solid purple' : '2px solid gray',
                                color: page === 'Table' ? 'purple' : 'gray',
                                borderRadius: 0,
                                ":hover": { borderBottom: '2px solid purple', color: 'purple' },
                                fontWeight: 700
                            }}
                                onClick={() => setPage('Table')}
                                startIcon={
                                    <Grid2x2 size={18} />
                                }>Table</Button>
                        </Box>
                        {/* <Box sx={{ display: 'flex', gap: 3, mt: 0.6 }}>
                            <Button
                                startIcon={
                                    <ArrowDownUp size={18} />
                                }
                                sx={{ bgcolor: 'white', border: '1px solid purple', color: 'purple', fontWeight: 600 }}>Sort</Button>
                            <Button
                                startIcon={
                                    <ListFilter size={18} />
                                }
                                sx={{ bgcolor: 'white', border: '1px solid purple', color: 'purple', fontWeight: 600 }}
                            >More Filter</Button>
                            <Button startIcon={
                                <Plus size={18} />
                            }
                                sx={{ bgcolor: 'purple', border: '1px solid white', color: 'white', fontWeight: 600 }}
                            >Add Task</Button>
                        </Box> */}
                    </Box>
                    <Divider />

                    {/* Board */}
                    {ActivePage()}
                </Box>
            </Container>
        </Box>
    )
}

export default ProjectsData