import React, { createContext, useState, useContext } from 'react';

export const GlobalContext = createContext(null);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};

export const GlobalContextProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState([]);
    const [projects, setProjects] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const value = {
        resumeData,
        setResumeData,
        refresh,
        setRefresh,
        projects, setProjects
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
