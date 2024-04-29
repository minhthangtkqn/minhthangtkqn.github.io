import React from "react";
import styled from "styled-components";
import logo from '../../asset/logo.svg';

const StyledNavBar = styled.div`
    .app-logo {
        max-height: 2rem;
    }
`;

export const NavBar = () => {
    return (
        <StyledNavBar>
            <div className="logo">
                <img src={logo} className="app-logo" alt="logo" /> Focus
            </div>
        </StyledNavBar>
    );
};
