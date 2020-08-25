import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import HomePage from './pages/Home';

function App() {
  return (
    <Router>
      <Route exact component={HomePage} />
    </Router>
  );
}

export default App;
