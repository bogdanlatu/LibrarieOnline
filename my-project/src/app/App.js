import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

//Components
import NavBar from '../nav-bar/nav-bar';
import PageContainer from '../page-container/page-container';


function App() {
    
    return (
        <Router>
            <div className="App">
                <NavBar />
                <PageContainer />
            </div>
        </Router>

    );   
}

export default App;
