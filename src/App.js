import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import FileUpload from "./components/FileUpload";
import Login from "./components/Login";
import Register from './components/Register';
function App(){
    return(
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/file_upload" element={<FileUpload />} />
          </Routes>
        </Router>
      </>
    )
}
export default App;