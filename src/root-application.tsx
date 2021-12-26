import React from 'react';
import { ErrorBoundary } from './@foundation/components/error-boundary';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'app/home';
import { About } from 'app/about';
import { ChakraProvider } from '@chakra-ui/react'
import './styles/index.css';
import './styles/index.scss';
import { AppWrapper } from 'base/component';

export default function RootApplication() {
    return (
        <ErrorBoundary>
            <ChakraProvider>
                <div className="app">
                    <BrowserRouter>
                        <AppWrapper>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                            </Routes>
                        </AppWrapper>
                    </BrowserRouter>
                </div>
            </ChakraProvider>
        </ErrorBoundary>
    );
}
