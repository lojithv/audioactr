import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import theme from '../theme/mui-theme';
import './App.css';
import Editor from '../views/Editor';
import Home from '../views/Home';
import Titlebar from './titlebar/Titlebar';
import styles from 'components/App.module.scss';

export default function App() {
  return (
    <React.Fragment>
    {/* <Titlebar /> */}
    <div className={ styles.app }>
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
    </ThemeProvider>
    </div>
    </React.Fragment>
  );
}
