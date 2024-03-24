import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/segment";
import SaveAudience from "./pages/save";
import "./App.css";
//sivakumar
const App = () => {
  return (
    <div className="App_container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/save" element={<SaveAudience />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
