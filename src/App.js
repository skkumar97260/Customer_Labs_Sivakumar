import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/segment";
import SaveAudience from "./pages/save";
import "./App.css";
//sivakumar
const App = () => {
  console.log(process.env);
  return (
    <div className="App_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/save" element={<SaveAudience />} />
          <Route path="/env" element={<div>{process.env.REACT_APP_NAME}</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
