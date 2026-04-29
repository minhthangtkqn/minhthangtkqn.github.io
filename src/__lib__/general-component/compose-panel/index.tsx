import React from "react";
import { ComposeHeader } from "../compose-header";
import styled from "styled-components";

const StyledComposePanel = styled.div`
    height: 100%;
    border: var(--bd);
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--contrast-primary);

    .compose-panel-header {}

    .compose-panel-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        position: relative; // for loading positioning
        padding: var(--spacing-sm);
    }

    .compose-panel-footer {}
`;

const StandardComposePanel = ({ children }: React.PropsWithChildren) => {
    return <StyledComposePanel className="compose-panel">{children}</StyledComposePanel>;
};

const Header = ({
    title,
    extra,
    ...rest
}: {
    title?: React.ReactNode;
    extra?: React.ReactNode;
} & React.ComponentProps<typeof ComposeHeader>) => {
    return (
        <ComposeHeader className="compose-panel-header truncate" {...rest}>
            <ComposeHeader.HeaderItem>{title}</ComposeHeader.HeaderItem>
            {extra && <ComposeHeader.HeaderItem right>{extra}</ComposeHeader.HeaderItem>}
        </ComposeHeader>
    );
};
const Body = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="compose-panel-body">{children}</div>
    );
};

const Footer = ({ children }: React.PropsWithChildren) => {
    return (
        <div className="compose-panel-footer">{children}</div>
    );
};


export const ComposePanel = Object.assign(
    StandardComposePanel,
    {
        Header,
        Body,
        Footer,
    }
);
