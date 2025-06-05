import React from 'react';
import { useTheme } from './ThemeContext';


const Card = ({ children, className = '' }) => {
    const { theme } = useTheme();
    return (
        <div
            className={`rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                } ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;