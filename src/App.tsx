import React from 'react';
import './App.css';
import {HomePage} from './components/homePage/HomePage';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {ThemeProvider} from "@mui/styles";
import {createTheme, responsiveFontSizes} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <HomePage/>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
