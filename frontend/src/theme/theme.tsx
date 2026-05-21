import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#2563eb' }, // You can customize!
            background: { default: '#f9fafb' },
          }
        : {
            primary: { main: '#2563eb' },
            background: { default: '#18181b' },
          }),
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' },
  });