import { Box, Button, CardHeader, Checkbox, Chip, Grid, IconButton, LinearProgress, Typography } from '@mui/material'
import { Info } from 'lucide-react';
import React from 'react'
const Status = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    ARCHIVED: 'Archived'
}
const Board = ({ page, projects, setPage, setShowId }) => {
    console.log(projects);
    const pendingProjects = projects.filter((project) => project?.status === Status?.PENDING);
    const inProgressProjects = projects.filter((project) => project?.status === Status?.IN_PROGRESS);
    const archievedProjects = projects.filter((project) => project?.status === Status?.ARCHIVED);
    const completedProjects = projects.filter((project) => project?.status === Status?.COMPLETED);
    return (
        <Box sx={{ my: 3 }}>
            <Box size={{ xs: 12, md: 12 }} sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: 200, justifyContent: 'start', alignItems: 'center', gap: 3 }}>
                    <Button
                        sx={{
                            width: 200,
                            boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)',
                            height: 150,
                            mt: 2.4,
                            fontSize: { xs: '.7em', md: '1em' }
                        }}
                    >
                        {Status?.PENDING}
                    </Button>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3,
                            width: 900,
                            overflow: 'scroll',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {pendingProjects.length > 0 ? (
                            pendingProjects.map((project, index) => (
                                <Box
                                    key={`${project?.name}/${index}`}
                                    sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}
                                >
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>
                                                {project?.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    mt: 0.8,
                                                    gap: 0.7,
                                                }}
                                            >
                                                <Chip
                                                    label={project?.priority}
                                                    color="success"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={project?.createdAt.split('T')[0]}
                                                    color="info"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
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
                                    <Typography
                                        sx={{
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
                                            px: 2,
                                        }}
                                    >
                                        {project?.description}
                                    </Typography>
                                    <Box sx={{ width: '90%', ml: 2, mt: 0.7, mb: 1 }}>
                                        <LinearProgress variant="determinate" value={20} />
                                        <Typography sx={{ fontWeight: 500, fontSize: '.8em', color: 'black' }}>
                                            On Progress
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{ color: 'black', fontWeight: 700 }}>No Project Found</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: 200, justifyContent: 'start', alignItems: 'center', gap: 3 }}>
                    <Button
                        sx={{
                            width: 200,
                            boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)',
                            height: 150,
                            mt: 2.4,
                            fontSize: { xs: '.7em', md: '1em' }
                        }}
                    >
                        {Status?.IN_PROGRESS}
                    </Button>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3,
                            width: 900,
                            overflow: 'scroll',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {inProgressProjects.length > 0 ? (
                            inProgressProjects.map((project, index) => (
                                <Box
                                    key={`${project?.name}/${index}`}
                                    sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}
                                >
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>
                                                {project?.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    mt: 0.8,
                                                    gap: 0.7,
                                                }}
                                            >
                                                <Chip
                                                    label={project?.priority}
                                                    color="success"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={project?.createdAt.split('T')[0]}
                                                    color="info"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
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
                                    <Typography
                                        sx={{
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
                                            px: 2,
                                        }}
                                    >
                                        {project?.description}
                                    </Typography>
                                    <Box sx={{ width: '90%', ml: 2, mt: 0.7, mb: 1 }}>
                                        <LinearProgress variant="determinate" value={20} />
                                        <Typography sx={{ fontWeight: 500, fontSize: '.8em', color: 'black' }}>
                                            On Progress
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{ color: 'black', fontWeight: 700 }}>No Project Found</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: 200, justifyContent: 'start', alignItems: 'center', gap: 3 }}>
                    <Button
                        sx={{
                            width: 200,
                            boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)',
                            height: 150,
                            mt: 2.4,
                            fontSize: { xs: '.7em', md: '1em' }
                        }}
                    >
                        {Status?.ARCHIVED}
                    </Button>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3,
                            width: 900,
                            overflow: 'scroll',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {archievedProjects.length > 0 ? (
                            archievedProjects.map((project, index) => (
                                <Box
                                    key={`${project?.name}/${index}`}
                                    sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}
                                >
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>
                                                {project?.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    mt: 0.8,
                                                    gap: 0.7,
                                                }}
                                            >
                                                <Chip
                                                    label={project?.priority}
                                                    color="success"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={project?.createdAt.split('T')[0]}
                                                    color="info"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
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
                                    <Typography
                                        sx={{
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
                                            px: 2,
                                        }}
                                    >
                                        {project?.description}
                                    </Typography>
                                    <Box sx={{ width: '90%', ml: 2, mt: 0.7, mb: 1 }}>
                                        <LinearProgress variant="determinate" value={20} />
                                        <Typography sx={{ fontWeight: 500, fontSize: '.8em', color: 'black' }}>
                                            On Progress
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{ color: 'black', fontWeight: 700 }}>No Project Found</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: 200, justifyContent: 'start', alignItems: 'center', gap: 3 }}>
                    <Button
                        sx={{
                            width: 200,
                            boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)',
                            height: 150,
                            mt: 2.4,
                            fontSize: { xs: '.7em', md: '1em' }
                        }}
                    >
                        {Status?.COMPLETED}
                    </Button>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3,
                            width: 900,
                            overflow: 'scroll',
                            scrollBehavior: 'smooth',
                        }}
                    >
                        {completedProjects.length > 0 ? (
                            completedProjects.map((project, index) => (
                                <Box
                                    key={`${project?.name}/${index}`}
                                    sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}
                                >
                                    <CardHeader
                                        title={
                                            <Typography sx={{ color: 'black', fontWeight: 700 }}>
                                                {project?.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    mt: 0.8,
                                                    gap: 0.7,
                                                }}
                                            >
                                                <Chip
                                                    label={project?.priority}
                                                    color="success"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
                                                <Chip
                                                    label={project?.createdAt.split('T')[0]}
                                                    color="info"
                                                    sx={{ fontWeight: 600, height: 23 }}
                                                    variant="outlined"
                                                />
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
                                    <Typography
                                        sx={{
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
                                            px: 2,
                                        }}
                                    >
                                        {project?.description}
                                    </Typography>
                                    <Box sx={{ width: '90%', ml: 2, mt: 0.7, mb: 1 }}>
                                        <LinearProgress variant="determinate" value={20} />
                                        <Typography sx={{ fontWeight: 500, fontSize: '.8em', color: 'black' }}>
                                            On Progress
                                        </Typography>
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{ color: 'black', fontWeight: 700 }}>No Project Found</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
                {/* <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)', py: 8 }}>In Queue</Button>
                <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)', py: 8 }}>In Queue</Button>
                <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)', py: 8 }}>In Queue</Button> */}
            </Box>


            {/* <Grid size={{ xs: 12, md: 3 }}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>In Queue</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.PENDING) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
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
                <Grid size={{ xs: 12, md: 3 }}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>On Progress</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.IN_PROGRESS) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
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
                <Grid size={{ xs: 12, md: 3 }}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>Testing</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.ARCHIVED) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
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

                <Grid size={{ xs: 12, md: 3 }}>
                    <Button startIcon={<Checkbox />} sx={{ width: '100%', boxShadow: '4px 4px 15px 0px rgba(0, 0, 0, 0.25)' }}>Completed</Button>
                    {projects.map((project, index) => {
                        if (project?.status === Status?.COMPLETED) {
                            return (
                                <Box sx={{ border: '1px solid black', mt: 3, borderRadius: 1 }}>
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
                </Grid> */}
        </Box>
    )
}

export default Board