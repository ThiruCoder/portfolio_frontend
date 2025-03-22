import React, { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './HomePage/Home'
import ProjectDetails from './Apis/ProjectView'
import ApiDirectory from './Apis/Api'
import TemplateMarketplace from './Apis/All_Templates'
import About from './About/About'





function App() {
  const [count, setCount] = useState(0)
  // Use React.lazy to dynamically import a component
  // const Home = React.lazy(() => import('./HomePage/Home'));
  // const About = React.lazy(() => import('./About/About'));
  // const ProjectDetails = React.lazy(() => import('./Apis/ProjectView'));
  // const TemplateMarketplace = React.lazy(() => import('./Apis/All_Templates'));
  // const ApiDirectory = React.lazy(() => import('./Apis/Api'));

  return (
    <div style={{ backgroundColor: '#242424' }}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ProjectView/:id' element={<ProjectDetails />} />
        <Route path='/ApiDirectory' element={<ApiDirectory />} />
        <Route path='/All_Templates' element={<TemplateMarketplace />} />
        <Route path='/About' element={<About />} />
      </Routes>
    </div>
  )
}

export default App
