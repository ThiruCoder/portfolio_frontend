"use client";
import React, { useEffect, useState } from 'react';
import Projects from './Dashboard_Models/Projects';
import Skills from './Dashboard_Models/Skills';
import Resume from './Dashboard_Models/Resume';
import Contact from './Dashboard_Models/Contact';
import Analytics from './Dashboard_Models/Analytics';
import Settings from './Dashboard_Models/Settings';
import MainPage from './Dashboard_Models/MainPage';
import { Box } from '@mui/material';
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import Footer from '../HomePage/Footer';
import DashboardHeader from './Dashboard_Models/Header';
// import { ThemeProvider } from './contexts/ThemeContext';
// import Layout from './components/layout/Layout';
const top = 3

const Dashboard = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [resumeData, setResumeData] = useState([]);
    const useCase = false
    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                const res = await apiIntance.get(`/project/get`);
                const data = res.data
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        getProjectDetails();
    }, [refresh]);

    useEffect(() => {
        const handleResumeData = async () => {
            try {
                await apiIntance.get('/resume/getResume')
                    .then((response) => {
                        setResumeData(response.data);
                    })
                    .catch((error) => {
                        console.error('Error fetching resume data:', error);
                    });
            } catch (error) {
                console.error('Error fetching resume data:', error);
            }
        }
        handleResumeData();
    }, [])

    const crud = 'visible'

    const renderPage = () => {
        switch (activePage) {
            case 'dashboard':
                return <MainPage
                    top={top}
                    setRefresh={setRefresh}
                />;
            case 'projects':
                return <Projects
                    top={top}
                    projects={projects}
                    setRefresh={setRefresh}
                    open={open}
                    setOpen={setOpen}
                />;
            case 'skills':
                return <Skills top={top} resumeData={resumeData} useCase={useCase} />;
            case 'resume':
                return <Resume
                    top={top}
                    setRefresh={setRefresh}
                    open={open}
                    setOpen={setOpen}
                    projects={projects}
                    crud={crud}
                />;
            case 'contact':
                return <Contact top={top} />;
            // case 'analytics':
            //     return <Analytics top={top} />;
            case 'settings':
                return <Settings top={top} />;
            default:
                return <MainPage top={top} />;
        }
    };

    return (
        <Box>
            <DashboardHeader setActivePage={setActivePage} />
            {renderPage()}
            <Footer />
        </Box>
    );
}

export default Dashboard
