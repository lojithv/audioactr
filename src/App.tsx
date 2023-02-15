import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { Route, MemoryRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { axiosInstance } from "./config/axiosInstance";
import theme from "./theme/mui-theme";
import Editor from "./views/Editor";
import Home from "./views/Home";
import Demo from "./views/Test";

function App() {
  const [resp, setRes] = React.useState({});

  useEffect(() => {
    axiosInstance.get("/example").then((res) => {
      setRes(res.data);
      console.log(res.data);
    });
  },[]);

  const handlePlay = () => {
    axiosInstance.get("/audio").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Editor/>} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/test" element={<Demo />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
