import React from "react";
import styled from "styled-components";
import logo from '../../asset/logo.svg';

const StyledNavBar = styled.div`
    background-color: #282c34;
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
    padding: var(--spacing-xs) var(--spacing-sm);

    .logo {
        display: flex;
        align-items: center;
        column-gap: var(--spacing-xs);

        .app-logo-wrapper {
            height: 2rem;

            .app-logo {
                height: 100%;
            }
        }
    }

    @media (prefers-reduced-motion: no-preference) {
        .app-logo {
            animation: app-logo-spin infinite 5s linear;
        }
    }

    @keyframes app-logo-spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
`;

export const AppNavBar = () => {
    return (
        <StyledNavBar>
            <div className="logo">
                <div className="app-logo-wrapper">
                    <img src={logo} className="app-logo" alt="logo" />
                </div>
                <div className="logo-label">Focus</div>
            </div>
        </StyledNavBar>
    );
};
