import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { File, Linkedin, Mail, MailIcon, Phone, Send } from 'lucide-react';
import { IconButton, TextField, Tooltip, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import Swal from 'sweetalert2'

const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function MessageModel({ openModel, setOpenModel, handleOpen, handleClose, style }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const theme = useTheme();
    const navigate = useNavigate();

    function fromDataLoad(e) {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const res = await apiIntance.post('/send/mail', formData);
        if (res) {
            setOpenModel((prev) => !prev)
            setFormData({
                name: '',
                email: '',
                message: ''
            })
            Swal.fire({
                title: 'Message sent!',
                text: 'Thanks for reaching out!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }
    return (
        <div>
            {style === 'view' ? <Button sx={{ bgcolor: 'transparent', color: 'transparent', width: '100%', fontSize: 'clamp(11px, 16%, 30px)', height: '100%', zIndex: 2 }} variant="outlined" startIcon={<Mail size={14} />} onClick={handleOpen}>Open modal</Button>
                : <Button sx={{ width: '100%', fontSize: 'clamp(11px, 16%, 30px)', height: '100%' }} variant="outlined" startIcon={<Mail size={14} />} onClick={handleOpen}>Open modal</Button>}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModel}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModel}>
                    <Box sx={styles}>
                        <Typography sx={{ textAlign: 'center', fontWeight: 600, my: 2 }}>Message me</Typography>
                        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                type="text"
                                placeholder="Enter your Fullname"
                                variant="outlined"
                                fullWidth
                                onChange={fromDataLoad}
                                value={formData.name}
                                name='name'
                                sx={{
                                    backgroundColor: theme.footer.secondary,
                                    input: { color: theme.footer.primary, height: 10, },
                                    '& label': { color: '#aaaaaa' },            // Label color
                                    '& label.Mui-focused': { color: '#90caf9' },// Label on focus
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#90caf9' },
                                        '&:hover fieldset': { borderColor: '#f48fb1' },
                                        '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                                    },
                                    borderRadius: 1.2
                                }}
                            />
                            <TextField
                                type="email"
                                placeholder="Enter your email"
                                variant="outlined"
                                fullWidth
                                name='email'
                                value={formData.email}
                                onChange={fromDataLoad}
                                sx={{
                                    backgroundColor: theme.footer.secondary,
                                    input: { color: theme.footer.primary, height: 10, },
                                    '& label': { color: '#aaaaaa' },            // Label color
                                    '& label.Mui-focused': { color: '#90caf9' },// Label on focus
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#90caf9' },
                                        '&:hover fieldset': { borderColor: '#f48fb1' },
                                        '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                                    },
                                    borderRadius: 1.2
                                }}
                            />
                            <TextField
                                label="Message"
                                fullWidth
                                value={formData.message}
                                margin="normal"
                                variant="outlined"
                                name='message'
                                onChange={fromDataLoad}
                                // error={!!errors.description}
                                // helperText={errors.description}
                                multiline
                                rows={7.1}
                                required
                                sx={{
                                    backgroundColor: theme.footer.secondary,
                                    input: { color: theme.footer.primary, height: 10, },
                                    '& label': { color: '#aaaaaa' },            // Label color
                                    '& label.Mui-focused': { color: '#90caf9' },// Label on focus
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': { borderColor: '#90caf9' },
                                        '&:hover fieldset': { borderColor: '#f48fb1' },
                                        '&.Mui-focused fieldset': { borderColor: '#90caf9' },
                                    },
                                    borderRadius: 1.2
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                endIcon={<Send size={15} />}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    '&:hover': { backgroundColor: 'primary.dark' },
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Tooltip title={'Phone'}>
                                <IconButton href='tel:7569583293'>
                                    <Phone size={15} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Mail'}>
                                <IconButton href='mailto:thiruthedeveloper@gmail.com'>
                                    <MailIcon size={15} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Linkedin'}>
                                <IconButton href='https://www.linkedin.com/in/charipalli-thirumalesh-a7a127350/'>
                                    <Linkedin size={15} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={'Resume'}>
                                <IconButton onClick={() => navigate('/Resume')}>
                                    <File size={15} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
