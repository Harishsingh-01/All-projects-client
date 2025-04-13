import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import ProjectCard from './components/ProjectCard';
import AddProjectDialog from './components/AddProjectDialog';
import EditProjectDialog from './components/EditProjectDialog';
import { Project } from './types';

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

    const handleAddProject = async (project: Omit<Project, '_id'>) => {
        try {
            await axios.post(`${API_URL}/projects`, project);
            loadProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleEditProject = (project: Project) => {
        setSelectedProject(project);
        setIsEditDialogOpen(true);
    };

    const handleSaveEdit = async (id: string, project: Omit<Project, '_id'>) => {
        try {
            await axios.put(`${API_URL}/projects/${id}`, project);
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
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                    Project Links
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    Add Project
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
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
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setSelectedProject(null);
                }}
                onEdit={handleSaveEdit}
                project={selectedProject}
            />
        </Container>
    );
}

export default App;
