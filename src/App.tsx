import './App.scss';
import './style/index.scss';
import React from 'react';
import { AppFooter, AppNavBar } from '@/component';
import { BaseApplication } from "./application";
import { SearchParamProvider } from "./util";
// import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
    return (
        <SearchParamProvider>
            <div className="app-wrapper">
                <AppNavBar />
                <BaseApplication />
                <AppFooter />
            </div>
        </SearchParamProvider>
        // <BrowserRouter>
        // </BrowserRouter>
    );
};

export default App;
