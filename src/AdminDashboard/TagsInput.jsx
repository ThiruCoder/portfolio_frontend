import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Chip,
    TextField,
    Autocomplete,
    Paper,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    useTheme,
    ListItemIcon
} from '@mui/material';
import { Close, Add, Search } from '@mui/icons-material';

const TagsInput = ({
    allTags = [],
    initialTags = [],
    onTagsChange,
    placeholder = "Type and press Enter to add",
    maxTags,
    allowDuplicates = false,
    tagColor = "primary",
    sx = {}
}) => {
    const theme = useTheme();
    const [tags, setTags] = useState(initialTags);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    // Filter suggestions based on input
    useEffect(() => {
        if (inputValue.trim() === '') {
            setSuggestions(allTags.filter(tag =>
                !tags.includes(tag) || allowDuplicates
            ));
        } else {
            setSuggestions(
                allTags.filter(tag =>
                    tag.toLowerCase().includes(inputValue.toLowerCase()) &&
                    (!tags.includes(tag) || allowDuplicates)
                )
            );
        }
    }, [inputValue, tags, allTags, allowDuplicates]);

    const handleAddTag = (tag) => {
        const trimmedTag = tag.trim();
        if (!trimmedTag) return;

        if (maxTags && tags.length >= maxTags) {
            return;
        }

        if (!allowDuplicates && tags.includes(trimmedTag)) {
            return;
        }

        const newTags = [...tags, trimmedTag];
        setTags(newTags);
        onTagsChange(newTags);
        setInputValue('');
    };

    const handleDeleteTag = (tagToDelete) => {
        const newTags = tags.filter(tag => tag !== tagToDelete);
        setTags(newTags);
        onTagsChange(newTags);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            e.preventDefault();
            handleAddTag(inputValue);
        }
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setIsFocused(false), 200);
    };

    return (
        <Box sx={{ position: 'relative', ...sx }}>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                minHeight: 56,
                alignItems: 'center',
                p: 1,
                border: `1px solid ${isFocused ? theme.palette.primary.main : theme.palette.divider}`,
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
                '&:hover': {
                    borderColor: isFocused ? theme.palette.primary.main : theme.palette.text.secondary
                }
            }}>
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                        deleteIcon={<Close />}
                        color={tagColor}
                        sx={{
                            borderRadius: 1,
                            maxWidth: 600,
                            '& .MuiChip-label': {
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }
                        }}
                    />
                ))}

                <Autocomplete
                    freeSolo
                    disableClearable
                    options={[]} // We handle options manually
                    inputValue={inputValue}
                    onInputChange={(e, newValue) => setInputValue(newValue)}
                    onChange={(e, newValue) => { }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            placeholder={tags.length === 0 ? placeholder : ''}
                            onKeyDown={handleKeyDown}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            inputRef={inputRef}
                            InputProps={{
                                ...params.InputProps,
                                disableUnderline: true,
                                style: {
                                    padding: 0,
                                    minWidth: tags.length === 0 ? '100%' : 150
                                },
                                startAdornment: (
                                    <Search sx={{
                                        color: theme.palette.text.disabled,
                                        mr: 1,
                                        display: tags.length > 0 ? 'none' : 'block'
                                    }} />
                                )
                            }}
                            sx={{
                                '& .MuiInputBase-root': {
                                    height: 36,
                                    padding: '0 !important'
                                }
                            }}
                        />
                    )}
                />
            </Box>

            {/* Custom dropdown */}
            {isFocused && (
                <Paper
                    elevation={3}
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 1,
                        mt: 1,
                        maxHeight: 300,
                        overflow: 'auto'
                    }}
                >
                    {inputValue && !suggestions.includes(inputValue) && (
                        <List dense>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => handleAddTag(inputValue)}>
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <Add color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={`Add "${inputValue}"`}
                                        primaryTypographyProps={{ color: 'primary' }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </List>
                    )}

                    {suggestions.length > 0 ? (
                        <List dense>
                            {suggestions.map((tag) => (
                                <ListItem key={tag} disablePadding>
                                    <ListItemButton onClick={() => handleAddTag(tag)}>
                                        <ListItemText primary={tag} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    ) : inputValue ? (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                No matching tags found
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Start typing to search or add tags
                            </Typography>
                        </Box>
                    )}
                </Paper>
            )}

            {maxTags && (
                <Typography
                    variant="caption"
                    color={tags.length >= maxTags ? 'error' : 'text.secondary'}
                    sx={{ mt: 0.5, display: 'block' }}
                >
                    {tags.length} / {maxTags} tags
                </Typography>
            )}
        </Box>
    );
};

export default TagsInput