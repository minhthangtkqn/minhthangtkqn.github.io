import './App.scss';
import './style/index.scss';
import React from 'react';
import { AppFooter, AppNavBar } from '@/component';
import { BaseApplication } from "./module";
// import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <AppNavBar />
            <BaseApplication />
            <AppFooter />
        </div>
        // <BrowserRouter>
        // </BrowserRouter>
    );
};

export default App;
