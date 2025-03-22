import { createContext, useState } from "react";

export const FetchContext = createContext(null);

export const MyContext = ({ children }) => {
    const [projects, setProjects] = useState([])

    const passeedContext = {
        projects, setProjects
    }
    return (
        <FetchContext.Provider value={passeedContext}>{children}</FetchContext.Provider>
    )
}