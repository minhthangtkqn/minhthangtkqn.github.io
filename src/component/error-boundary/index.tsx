import React from "react";
import styled from "styled-components";

const StyledErrorBoundaryContainer = styled.div`
    padding: var(--spacing) var(--spacing);
`;

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; },
    {
        hasError: boolean;
        error: any;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: undefined,
        };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        console.error('ErrorBoundary - Caught Error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <StyledErrorBoundaryContainer>
                <h1>Something went wrong.</h1>
                <div>Error: {this.state.error + ''}</div>
            </StyledErrorBoundaryContainer>;
        }

        return this.props.children;
    }
}