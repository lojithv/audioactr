import React, { useEffect } from 'react';
import './App.css';
import { axiosInstance } from './config/axiosInstance';

function App() {

  const [resp, setRes] = React.useState({})

  useEffect(()=>{
    axiosInstance.get("/example").then((res)=>{
      setRes(res.data) 
      console.log(res.data)
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        {resp.toString()}
        hello
      </header>
    </div>
  );
}

export default App;
