import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import ProjectDetails from './Apis/ProjectView'
import ApiDirectory from './Apis/Api'
import TemplateMarketplace from './Apis/All_Templates'
import About from './About/About'
import Interview from './InterviewQuestions/Quetions'
import AdminDashboard from './AdminDashboard/Dashboard'
import LoginForm from './Authentication/LoginPage'





function App() {
  const [count, setCount] = useState(0)
  // Use React.lazy to dynamically import a component
  // const Home = React.lazy(() => import('./HomePage/Home'));
  // const About = React.lazy(() => import('./About/About'));
  // const ProjectDetails = React.lazy(() => import('./Apis/ProjectView'));
  // const TemplateMarketplace = React.lazy(() => import('./Apis/All_Templates'));
  // const ApiDirectory = React.lazy(() => import('./Apis/Api'));
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ff5733");
  });

  return (
    <div style={{ backgroundColor: '#242424' }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ProjectView/:id' element={<ProjectDetails />} />
        <Route path='/ApiDirectory' element={<ApiDirectory />} />
        <Route path='/All_Templates' element={<TemplateMarketplace />} />
        <Route path='/About' element={<About />} />
        <Route path='/Interview' element={<Interview />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/LoginForm' element={<LoginForm />} />
      </Routes>
    </div>
  )
}

export default App
