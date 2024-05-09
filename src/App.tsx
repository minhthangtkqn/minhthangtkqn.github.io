import './App.scss';
import './style/index.scss';
import React from 'react';
import { AppFooter, AppNavBar, TaskPanel, TimerPanel } from '@/component';

const App: React.FC = () => {
    return (
        <div className="app-wrapper">
            <AppNavBar />

            <div className="layout-base app-body">
                <div className="primary">
                    <TimerPanel />
                </div>
                <div className="secondary">
                    <TaskPanel />
                </div>
            </div>

            <AppFooter />
        </div>
    );
};

export default App;
