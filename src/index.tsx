import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './style/themeProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
);
