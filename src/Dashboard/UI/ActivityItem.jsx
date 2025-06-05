import React from 'react';
import {
    Box,
    Typography,
    Avatar,
} from '@mui/material';
import { useTheme } from './ThemeContext';

const ActivityItem = ({
    avatar,
    icon,
    title,
    description,
    time,
    isLast = false
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ mr: 3, position: 'relative' }}>
                {avatar ? (
                    <Avatar
                        src={avatar}
                        alt=""
                        sx={{ width: 36, height: 36 }}
                    />
                ) : icon ? (
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'primary.light',
                            color: 'primary.main'
                        }}
                    >
                        {icon}
                    </Avatar>
                ) : (
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'action.selected'
                        }}
                    />
                )}

                {!isLast && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 36,
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '2px',
                            bgcolor: 'divider'
                        }}
                    />
                )}
            </Box>

            <Box sx={{
                pb: 4,
                mb: isLast ? 0 : 1
            }}>
                <Typography variant="body1" fontWeight="medium">
                    {title}
                </Typography>
                {description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                    >
                        {description}
                    </Typography>
                )}
                <Typography
                    variant="caption"
                    color="text.disabled"
                    sx={{ mt: 0.5, display: 'block' }}
                >
                    {time}
                </Typography>
            </Box>
        </Box>
    );
};

export default ActivityItem;