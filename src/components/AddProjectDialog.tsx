import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Close as CloseIcon, Link as LinkIcon, Title as TitleIcon } from '@mui/icons-material';

interface AddProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (title: string, link: string) => void;
}

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && link.trim()) {
            onAdd(title.trim(), link.trim());
            setTitle('');
            setLink('');
            onClose();
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    pb: 1
                }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                        Add New Project
                    </Typography>
                    <IconButton 
                        onClick={onClose}
                        sx={{ 
                            '&:hover': { 
                                backgroundColor: 'action.hover',
                                transform: 'rotate(90deg)'
                            },
                            transition: 'all 0.3s ease-in-out'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 3, 
                        pt: 2,
                        pb: 1
                    }}>
                        <TextField
                            label="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Project Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                            fullWidth
                            type="url"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button 
                        onClick={onClose}
                        variant="outlined"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        sx={{ 
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 3
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        Add Project
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddProjectDialog; 