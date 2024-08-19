
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TabContent from './components/TabContent';
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('my-moves');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setAuth={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? (
            <section id="tab_sec">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 column">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setAuth={setIsAuthenticated} />
                    <TabContent activeTab={activeTab} />
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <Navigate to="/login" />
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
