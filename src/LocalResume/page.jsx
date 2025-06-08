import React, { useEffect, useState } from 'react'
import { Header } from '../HomePage/Header'
import Resume from '../Dashboard/Dashboard_Models/Resume'
import { apiIntance } from '../middlewares/Url_GlobalErrorHandler';
import Footer from '../HomePage/Footer';

const LocalResume = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        const res = await apiIntance.get(`/project/get`);
        const data = res.data.data

        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    getProjectDetails();
  }, []);
  return (
    <div>
      <Header />
      <Resume projects={projects} />
      <Footer />
    </div>
  )
}

export default LocalResume