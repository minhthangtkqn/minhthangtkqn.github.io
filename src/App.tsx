import './App.scss';
import './style/index.scss';
import React from 'react';
import { NavBar } from '@/component';

const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <header className="App-header">
                <NavBar />
            </header>
        </div>
    );
};

export default App;
