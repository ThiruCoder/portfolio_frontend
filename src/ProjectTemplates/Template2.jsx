import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    Avatar,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

export const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            // Add user message to the chat
            setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
            setInput('');

            // Simulate bot response (replace with API call)
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { text: `You said: "${input}"`, sender: 'bot' },
                ]);
            }, 1000);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '500px',
                maxWidth: '400px',
                margin: 'auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
            }}
        >
            {/* Chat Header */}
            <Box
                sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    padding: '16px',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6">Chatbot</Typography>
            </Box>

            {/* Chat Messages */}
            <Box
                sx={{
                    flex: 1,
                    padding: '16px',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                }}
            >
                <List>
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                justifyContent:
                                    message.sender === 'user' ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems:
                                        message.sender === 'user' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <Paper
                                    sx={{
                                        padding: '8px 12px',
                                        borderRadius:
                                            message.sender === 'user'
                                                ? '12px 12px 0 12px'
                                                : '12px 12px 12px 0',
                                        backgroundColor:
                                            message.sender === 'user' ? '#1976d2' : '#e0e0e0',
                                        color: message.sender === 'user' ? '#fff' : '#000',
                                    }}
                                >
                                    <Typography variant="body1">{message.text}</Typography>
                                </Paper>
                                <Typography
                                    variant="caption"
                                    sx={{ color: '#666', mt: '4px' }}
                                >
                                    {message.sender === 'user' ? 'You' : 'Bot'}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Chat Input */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: '#fff',
                    borderTop: '1px solid #ccc',
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    sx={{ mr: 1 }}
                />
                <IconButton
                    color="primary"
                    onClick={handleSend}
                    disabled={!input.trim()}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};
