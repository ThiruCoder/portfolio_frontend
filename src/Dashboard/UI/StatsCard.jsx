import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    Avatar,
} from '@mui/material';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useTheme } from './ThemeContext';

const StatsCard = ({
    title,
    value,
    icon,
    change,
    changeText,
    changeType = 'neutral',
    color = 'primary'
}) => {
    const theme = useTheme();

    const colorMap = {
        primary: {
            bg: 'primary.light',
            text: 'primary.main'
        },
        secondary: {
            bg: 'secondary.light',
            text: 'secondary.main'
        },
        info: {
            bg: 'info.light',
            text: 'info.main'
        },
        warning: {
            bg: 'warning.light',
            text: 'warning.main'
        },
        success: {
            bg: 'success.light',
            text: 'success.main'
        },
        error: {
            bg: 'error.light',
            text: 'error.main'
        }
    };

    const selectedColor = colorMap[color] || colorMap.primary;

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}>
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h4"
                            component="div"
                            sx={{ fontWeight: 600 }}
                        >
                            {value}
                        </Typography>

                        {(change !== undefined || changeText) && (
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0.5}
                                sx={{ mt: 1 }}
                            >
                                {changeType === 'increase' && (
                                    <ArrowUp size={16} />
                                )}
                                {changeType === 'decrease' && (
                                    <ArrowDown size={16} />
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color:
                                            changeType === 'increase'
                                                ? 'success.main'
                                                : changeType === 'decrease'
                                                    ? 'error.main'
                                                    : 'text.secondary'
                                    }}
                                >
                                    {change !== undefined && `${change > 0 ? '+' : ''}${change}%`}
                                    {changeText && (change !== undefined ? ' ' : '') + changeText}
                                </Typography>
                            </Stack>
                        )}
                    </Box>

                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            backgroundColor: selectedColor.bg,
                            color: selectedColor.text
                        }}
                    >
                        {icon}
                    </Avatar>
                </Box>
            </CardContent>
        </Card>
    );
};

export default StatsCard;