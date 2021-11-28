import React from 'react';
import { TestComp } from 'utils/component/test';
import { ErrorBoundary } from './@foundation/components/error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'app/home';
import { About } from 'app/about';

import './styles/index.css';

export default function RootApplication() {
    return (
        <ErrorBoundary>
            <div>
                <BrowserRouter>
                    <TestComp />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ErrorBoundary>
    );
}
