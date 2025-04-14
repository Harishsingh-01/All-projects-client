import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import ProjectCard from './components/ProjectCard';
import AddProjectDialog from './components/AddProjectDialog';
import EditProjectDialog from './components/EditProjectDialog';
import { Project } from './types';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#1976d2',
        },
        secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162',
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 500,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});

// Use environment variable for API URL, fallback to localhost for development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const response = await axios.get(`${API_URL}/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const handleAddProject = async (title: string, link: string) => {
        try {
            await axios.post(`${API_URL}/projects`, { title, link });
            loadProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleEditProject = (project: Project) => {
        setSelectedProject(project);
        setIsEditDialogOpen(true);
    };

    const handleSaveEdit = async (id: string, title: string, link: string) => {
        try {
            await axios.put(`${API_URL}/projects/${id}`, { title, link });
            loadProjects();
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/projects/${id}`);
            loadProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    py: 4,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 4,
                        mt: 2
                    }}>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ 
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Project Links Manager
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setIsAddDialogOpen(true)}
                            sx={{
                                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #1976d2 30%, #21cbf3 90%)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            Add Project
                        </Button>
                    </Box>
                    <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: { 
                            xs: '1fr', 
                            sm: '1fr 1fr', 
                            md: '1fr 1fr 1fr' 
                        }, 
                        gap: 3 
                    }}>
                        {projects.map((project) => (
                            <Box key={project._id}>
                                <ProjectCard
                                    project={project}
                                    onDelete={handleDeleteProject}
                                    onEdit={handleEditProject}
                                />
                            </Box>
                        ))}
                    </Box>
                    <AddProjectDialog
                        open={isAddDialogOpen}
                        onClose={() => setIsAddDialogOpen(false)}
                        onAdd={handleAddProject}
                    />
                    <EditProjectDialog
                        open={isEditDialogOpen}
                        onClose={() => setIsEditDialogOpen(false)}
                        onSave={handleSaveEdit}
                        project={selectedProject}
                    />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
