import React, { useMemo, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeProviderContext, useThemeContext } from './theme/themeContext';
import Projects from './Projects/page';
import Dashboard from './Dashboard/page';
import { DashThemeProvider } from './Dashboard/UI/ThemeContext';
import { GlobalContextProvider } from './GlobalContext/context';
// import Home from './HomePage/Home'
// import ProjectDetails from './Apis/ProjectView'
// import ApiDirectory from './Apis/Api'
// import TemplateMarketplace from './Apis/All_Templates'
// import About from './About/About'
// import Interview from './InterviewQuestions/Quetions'
// import AdminDashboard from './AdminDashboard/Dashboard'
// import LoginForm from './Authentication/LoginPage'
// import ProtectedRoute from './PrivateRoute'
// import LibraryPoint from './Libraries/LibraryPoint'





function AppContent() {
  const [count, setCount] = useState(0)
  const { theme } = useThemeContext();

  const Home = React.lazy(() => import('./HomePage/Home'));
  const About = React.lazy(() => import('./About/About'));
  const ProjectDetails = React.lazy(() => import('./Apis/ProjectView'));
  const TemplateMarketplace = React.lazy(() => import('./Apis/All_Templates'));
  const ApiDirectory = React.lazy(() => import('./Apis/Api'));
  const Interview = React.lazy(() => import('./InterviewQuestions/Quetions'));
  const AdminDashboard = React.lazy(() => import('./AdminDashboard/Dashboard'));
  const LoginForm = React.lazy(() => import('./Authentication/LoginPage'));
  const ProtectedRoute = React.lazy(() => import('./PrivateRoute'));
  const LibraryPoint = React.lazy(() => import('./Libraries/LibraryPoint'));
  const LocalResume = React.lazy(() => import('./LocalResume/page'));
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#ff5733");
  });

  return (
    <ThemeProvider theme={theme}>
      <DashThemeProvider>
        <GlobalContextProvider>
          <CssBaseline />
          <div >
            <React.Suspense fallback={<div>
              <div className="loader">Loading
                <span></span>
              </div>
            </div>}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ProjectView/:id' element={<ProjectDetails />} />
                <Route path='/ApiDirectory' element={<ApiDirectory />} />
                <Route path='/All_Templates' element={<TemplateMarketplace />} />
                <Route path='/About' element={<About />} />
                <Route path='/Interview' element={<Interview />} />
                <Route path='/Projects' element={<Projects />} />
                <Route path='/Resume' element={<LocalResume />} />
                <Route path='/AdminDashboard' element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>} />
                <Route path='/Dashboard' element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path='/LoginForm' element={<LoginForm />} />
                <Route path='/LibraryPoint' element={<LibraryPoint />} />
                {/* <Route path='/LoginForm' element={<GetDocuments />} /> */}
              </Routes>
            </React.Suspense>
          </div>
        </GlobalContextProvider>
      </DashThemeProvider>
    </ThemeProvider>
  )
}

function App() {
  return (
    <ThemeProviderContext>
      <AppContent />
    </ThemeProviderContext>
  );
}

export default App
