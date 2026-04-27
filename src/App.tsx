import './App.scss';
import './style/index.scss';
import React from 'react';
import { AppFooter, AppNavBar, ErrorBoundary } from '@/component';
import { BaseApplication } from "./application";
import { SearchParamProvider } from "./util";
import { ConfigProvider } from "antd";

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ConfigProvider>
                <SearchParamProvider>
                    <div className="app-wrapper">
                        <AppNavBar />
                        <BaseApplication />
                        <AppFooter />
                    </div>
                </SearchParamProvider>
            </ConfigProvider>
        </ErrorBoundary>
    );
};

export default App;
