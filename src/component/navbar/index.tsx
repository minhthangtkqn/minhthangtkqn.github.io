import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import { CheckSquareOutlined } from "@ant-design/icons";
import styled from "styled-components";
import logo from '../../asset/logo.svg';

const StyledNavBar = styled.div`
    background-color: #282c34;
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
    /* padding: var(--spacing-xs) var(--spacing-sm); */
    column-gap: var(--spacing-sm);

    .nav-bar-item {
        padding: var(--spacing-xs) 0;
    }
`;

const StyledDrawer = styled(Drawer)`
    .ant-drawer-header {
        display: none;
    }
    .ant-drawer-body {
        padding: var(--spacing-sm);

        .side-nav-menu {
            border-right: none;
        }
    }
`;

const MODULE_LIST = [
    {
        key: 'task1',
        title: 'Demo Item',
        icon: <CheckSquareOutlined />,
    },
    {
        key: 'task2',
        title: 'Demo Item',
        icon: <CheckSquareOutlined />,
    },
    {
        key: 'task3',
        title: 'Demo Item',
        icon: <CheckSquareOutlined />,
    },
];
export const AppNavBar = () => {
    return (
        <StyledNavBar>
            <NavBarLogo
                className="nav-bar-item"
            />
        </StyledNavBar>
    );
};

const StyledNavBarLogo = styled.div`
    display: flex;
    align-items: center;
    column-gap: var(--spacing-xs);
    cursor: pointer;

    .app-logo-wrapper {
        height: 2rem;

        .app-logo {
            height: 100%;
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
const NavBarLogo: React.FC<React.ComponentProps<typeof StyledNavBarLogo>> = (props) => {
    const [isOpenDrawer, setOpenDrawer] = useState(false);

    const handleShowDrawer = () => {
        setOpenDrawer(true);
    };

    return (<>
        <StyledNavBarLogo {...props} onClick={handleShowDrawer}>
            <div className="app-logo-wrapper">
                <img src={logo} className="app-logo" alt="logo" />
            </div>
            <div className="logo-label">Focus</div>
        </StyledNavBarLogo>

        <StyledDrawer
            closable
            destroyOnClose
            title={null}
            placement="left"
            open={isOpenDrawer}
            onClose={() => setOpenDrawer(false)}
        >
            <Menu
                className="side-nav-menu"
                mode="vertical"
                items={MODULE_LIST.map(item => ({
                    key: item.key,
                    label: item.title,
                    icon: item.icon,
                }))}
            />
        </StyledDrawer>
    </>);
};
