import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa',
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
        primary: 'rgb(246, 246, 253)',
        secondary: '#0d121c'
    }
});
export default responsiveFontSizes(theme);
