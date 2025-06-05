import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#f9f9f9',
            paper: '#ffffff',
        },
        text: {
            primary: '#1a1a1a',
            secondary: '#555',
        },
    },
    typography: {
        fontFamily: 'Inter, Roboto, sans-serif',
        h1: { fontSize: '4rem', fontWeight: 700 },
        h2: { fontSize: '3rem', fontWeight: 600 },
        h3: { fontSize: '2rem', fontWeight: 600 },
        h4: { fontSize: '1.75rem', fontWeight: 600 },
        h6: { fontSize: '1rem', fontWeight: 600 },
        body1: { fontSize: '1rem' },
        button: { textTransform: 'none' },
    },
    shape: { borderRadius: 12 },
    footer: {
        primary: '#0d121c',
        secondary: 'rgb(246, 246, 253)',
    }
});
export default responsiveFontSizes(theme);
