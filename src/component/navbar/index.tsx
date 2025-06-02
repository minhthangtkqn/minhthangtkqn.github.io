import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import { CheckSquareOutlined, TagsOutlined, DashboardOutlined } from "@ant-design/icons";
import styled from "styled-components";
import logo from '../../asset/logo.svg';
import { ApplicationInfo } from "@/application";
import { APPLICATION_PARAM_KEY, useApplicationKey } from "@/util";
import { version } from "../../../package.json";

const StyledNavBar = styled.div`    
    background-color: #282c34;
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: white;
    column-gap: var(--spacing-sm);
    height: var(--navbar-height);

    .nav-bar-item {
        height: 100%;
    }
`;

const StyledDrawerContainer = styled(Drawer)`
    .ant-drawer-header {
        display: none;
    }

    .ant-drawer-body {
        padding: 0;
        display: flex;
        flex-direction: column;

        .side-nav-menu {
            border-right: none;
            font-size: var(--fs-xl);
            flex: 1;

            .ant-menu-item {
                padding: 0px var(--spacing-sm);

                .anticon {
                    font-size: inherit; // override the default css with stronger scpecifity
                }
            }
        }

        .application-version {
            padding: var(--spacing) var(--spacing);
        }
    }
`;

const APPLICATION_LIST = [
    {
        key: ApplicationInfo.FocusAppInfo.name,
        title: <a href={`${window.location.origin}?${APPLICATION_PARAM_KEY}=${ApplicationInfo.FocusAppInfo.name}`}>Focus</a>,
        icon: <CheckSquareOutlined />,
    },
    {
        key: ApplicationInfo.FlashcardAppInfo.name,
        title: <a href={`${window.location.origin}?${APPLICATION_PARAM_KEY}=${ApplicationInfo.FlashcardAppInfo.name}`}>Flashcard</a>,
        icon: <TagsOutlined />,
    },
    {
        key: ApplicationInfo.CrawlerAppInfo.name,
        title: <a href={`${window.location.origin}?${APPLICATION_PARAM_KEY}=${ApplicationInfo.CrawlerAppInfo.name}`}>Crawler</a>,
        icon: <DashboardOutlined />,
    },
];
export const AppNavBar = () => {
    return (
        <StyledNavBar className="app-nav-bar">
            <NavBarLogo className="nav-bar-item" />
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
    const { applicationKey } = useApplicationKey();

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

        <StyledDrawerContainer
            closable
            destroyOnClose
            title={null}
            placement="left"
            open={isOpenDrawer}
            onClose={() => setOpenDrawer(false)}
            width={320}
        >
            <Menu
                className="side-nav-menu"
                mode="vertical"
                selectedKeys={[applicationKey ?? '']}
                items={APPLICATION_LIST.map(item => ({
                    key: item.key,
                    label: item.title,
                    icon: item.icon,
                }))}
            />

            <div className="application-version">v{version}</div>
        </StyledDrawerContainer>
    </>);
};
