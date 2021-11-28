import React from 'react';
import { TestComp } from 'utils/component/test';
import { ErrorBoundary } from './@foundation/components/error-boundary';

import './styles/index.css';

export default function RootApplication() {
    return (
        <ErrorBoundary>
            <TestComp />
        </ErrorBoundary>
    );
}
