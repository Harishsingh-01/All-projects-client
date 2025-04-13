import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from '@mui/material';
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
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Edit Project</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <TextField
                            label="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Project Link"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            required
                            fullWidth
                            type="url"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default EditProjectDialog; 