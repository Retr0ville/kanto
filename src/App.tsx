import React from 'react';
import Home from './pages/Home';
import './App.css';

const App = () => (
  <div className="">
    <header className="fs-1 fw-bold d-flex align-items-center justify-content-center py-2 mb-4 text-light bg-dark w-100">
      <div className="ms-auto">
        Kando.io&trade;
      </div>
      <a className="navbar-brand ms-auto" href="/">
        <img src="https://img.icons8.com/plasticine/100/000000/apple-home.png" width="50" height="50" className="d-flex" alt="Kando" />
      </a>
    </header>
    <Home />
  </div>
);

export default App;
