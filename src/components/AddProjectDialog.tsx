import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    useTheme,
    alpha,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Project } from '../types';

interface AddProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onAdd: (project: Omit<Project, '_id'>) => void;
}

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const theme = useTheme();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && link.trim()) {
            onAdd({ title: title.trim(), link: link.trim() });
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
                    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
                    backdropFilter: 'blur(10px)',
                }
            }}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle 
                    sx={{ 
                        pb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                    }}
                >
                    <AddIcon />
                    Add New Project
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <TextField
                            label="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5,
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                        />
                        <TextField
                            label="Project Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            fullWidth
                            required
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5,
                                    '&:hover fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    <Button 
                        onClick={onClose}
                        sx={{ 
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.text.secondary, 0.1),
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!title.trim() || !link.trim()}
                        sx={{
                            borderRadius: 1.5,
                            textTransform: 'none',
                            px: 3,
                            py: 1,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                            '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                            },
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