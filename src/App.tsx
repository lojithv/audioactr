import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { Route, MemoryRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { axiosInstance } from "./config/axiosInstance";
import theme from "./theme/mui-theme";
import Editor from "./views/Editor";
import Home from "./views/Home";
import Demo from "./views/Test";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import Pricing from "./views/Pricing";
import AllPages from "./views/AllPages";
import Settings from "./views/Settings";
import Payment from "./views/Payment";
import { Subscribe } from "@react-rxjs/core";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<AllPages />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/home" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/all" element={<AllPages />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
