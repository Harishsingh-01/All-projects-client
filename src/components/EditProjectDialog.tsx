import React, { useState, useEffect } from 'react';
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
import { Close as CloseIcon, Link as LinkIcon, Title as TitleIcon, Edit as EditIcon } from '@mui/icons-material';
import { Project } from '../types';

interface EditProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (id: string, title: string, link: string) => void;
    project: Project | null;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({ open, onClose, onSave, project }) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setLink(project.link);
        }
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (project && title.trim() && link.trim()) {
            onSave(project._id, title.trim(), link.trim());
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EditIcon color="primary" />
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                            Edit Project
                        </Typography>
                    </Box>
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
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditProjectDialog; 