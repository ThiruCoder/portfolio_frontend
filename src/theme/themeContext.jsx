import { createContext, useMemo, useState, useContext } from 'react';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';


const ThemeContext = createContext();

export const ThemeProviderContext = ({ children }) => {
    const [mode, setMode] = useState('light');

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const toggleTheme = () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
