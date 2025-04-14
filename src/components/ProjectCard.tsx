import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip, Tooltip } from '@mui/material';
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
                transition: 'all 0.3s ease-in-out',
                borderRadius: 2,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                }
            }}
        >
            <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                gap: 2,
                p: 3
            }}>
                <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '1.25rem',
                        mb: 1
                    }}
                >
                    {project.title}
                </Typography>
                
                {project.description && (
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            mb: 2,
                            lineHeight: 1.5,
                            color: 'rgba(0, 0, 0, 0.7)'
                        }}
                    >
                        {project.description}
                    </Typography>
                )}
                
                {project.category && (
                    <Chip 
                        label={project.category}
                        size="small"
                        sx={{ 
                            alignSelf: 'flex-start',
                            background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                            color: 'white',
                            fontWeight: 500,
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
                            }
                        }}
                    />
                )}
                
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mt: 'auto',
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'rgba(0, 0, 0, 0.1)'
                }}>
                    <Tooltip title="Open Project">
                        <IconButton 
                            href={project.link} 
                            target="_blank" 
                            color="primary"
                            sx={{ 
                                '&:hover': { 
                                    background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                    color: 'white',
                                    transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease-in-out'
                            }}
                        >
                            <LaunchIcon />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Edit Project">
                            <IconButton 
                                onClick={() => onEdit(project)}
                                color="info"
                                sx={{ 
                                    '&:hover': { 
                                        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                        color: 'white',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Project">
                            <IconButton 
                                onClick={() => onDelete(project._id)}
                                color="error"
                                sx={{ 
                                    '&:hover': { 
                                        background: 'linear-gradient(45deg, #f44336 30%, #ff5252 90%)',
                                        color: 'white',
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProjectCard; 