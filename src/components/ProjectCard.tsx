import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Delete as DeleteIcon, Launch as LaunchIcon, Edit as EditIcon } from '@mui/icons-material';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onDelete: (id: string) => void;
    onEdit: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete, onEdit }) => {
    return (
        <Card 
            sx={{ 
                maxWidth: 345,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        mb: 2,
                        fontWeight: 500,
                        color: 'primary.main'
                    }}
                >
                    {project.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <IconButton 
                        href={project.link} 
                        target="_blank" 
                        color="primary"
                        sx={{ '&:hover': { backgroundColor: 'primary.light' } }}
                    >
                        <LaunchIcon />
                    </IconButton>
                    <Box>
                        <IconButton 
                            onClick={() => onEdit(project)}
                            color="info"
                            sx={{ '&:hover': { backgroundColor: 'info.light' } }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton 
                            onClick={() => onDelete(project._id)}
                            color="error"
                            sx={{ '&:hover': { backgroundColor: 'error.light' } }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProjectCard; 