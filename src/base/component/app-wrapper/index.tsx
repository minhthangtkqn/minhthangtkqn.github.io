import React from 'react';
import { AppHeader } from './header';
import { AppBody } from './body';

export const AppWrapper: React.FC = ({ children }) => {
    return (
        <>
            <AppHeader />
            <AppBody>
                {children}
            </AppBody>
        </>
    );
};
