import './App.scss';
import './style/index.scss';
import React from 'react';
import { AppFooter, AppNavBar } from '@/component';
import { BaseApplication } from "./module";

const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <AppNavBar />
            <BaseApplication />
            <AppFooter />
        </div>
    );
};

export default App;
