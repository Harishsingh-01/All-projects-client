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
                background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
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
                        color: 'primary.main',
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
                            lineHeight: 1.5
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
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                            fontWeight: 500
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
                    borderColor: 'divider'
                }}>
                    <Tooltip title="Open Project">
                        <IconButton 
                            href={project.link} 
                            target="_blank" 
                            color="primary"
                            sx={{ 
                                '&:hover': { 
                                    backgroundColor: 'primary.light',
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
                                        backgroundColor: 'info.light',
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
                                        backgroundColor: 'error.light',
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