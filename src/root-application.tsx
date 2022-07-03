import './styles/index.css';
import './styles/index.scss';
import React from 'react';
import { ErrorBoundary } from './@foundation/components/error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { AppWrapper } from 'base/component';

import { Home } from 'app/modules/home';
import { About } from 'app/modules/about';
import { Folder } from 'app/modules/folder';
import { AppModules } from 'app/constant';

export default function RootApplication() {
    return (
        <ErrorBoundary>
            <ChakraProvider>
                <div className="app">
                    <BrowserRouter>
                        <AppWrapper>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path={`/${AppModules.ABOUT}`} element={<About />} />
                                <Route path={`/${AppModules.FOLDER}`} element={<Folder />} />
                            </Routes>
                        </AppWrapper>
                    </BrowserRouter>
                </div>
            </ChakraProvider>
        </ErrorBoundary>
    );
}
