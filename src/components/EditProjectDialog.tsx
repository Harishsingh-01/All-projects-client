import React, { useState, useEffect } from 'react';
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
import { Edit as EditIcon } from '@mui/icons-material';
import { Project } from '../types';

interface EditProjectDialogProps {
    open: boolean;
    onClose: () => void;
    onEdit: (id: string, project: Omit<Project, '_id'>) => void;
    project: Project | null;
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({ open, onClose, onEdit, project }) => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const theme = useTheme();

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setLink(project.link);
        }
    }, [project]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (project && title.trim() && link.trim()) {
            onEdit(project._id, { 
                title: title.trim(), 
                link: link.trim(),
                createdAt: project.createdAt // Preserve the original createdAt date
            });
            onClose();
        }
    };

    if (!project) return null;

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
                        color: theme.palette.info.main,
                        fontWeight: 600,
                    }}
                >
                    <EditIcon />
                    Edit Project
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
                                        borderColor: theme.palette.info.main,
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
                                        borderColor: theme.palette.info.main,
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
                            background: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
                            '&:hover': {
                                background: `linear-gradient(135deg, ${theme.palette.info.dark} 0%, ${theme.palette.info.main} 100%)`,
                            },
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