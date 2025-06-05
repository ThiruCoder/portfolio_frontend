// components/SkillBar.js
import React from 'react';
import { Box, Typography, LinearProgress, Chip, Tooltip, Stack } from '@mui/material';

const categoryColors = {
    frontend: 'primary',
    backend: 'success',
    database: 'warning',
    other: 'secondary',
    tools: 'info',
    default: 'grey'
};

const SkillBar = ({ name, percentage, category, experience, certified }) => {
    const color = categoryColors[category.toLowerCase()] || categoryColors.default;

    return (
        <Box mb={3}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body1" fontWeight={500}>{name}</Typography>
                    {certified && (
                        <Chip
                            label="Certified"
                            color="primary"
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Stack>
                <Tooltip title={`${experience} ${experience === 1 ? 'year' : 'years'} experience`}>
                    <Typography variant="body2" color="text.secondary">{percentage * 10}%</Typography>
                </Tooltip>
            </Box>
            <LinearProgress
                variant="determinate"
                value={percentage * 10}
                color={color}
                sx={{ height: 8, borderRadius: 5 }}
            />
        </Box>
    );
};

export default SkillBar;
