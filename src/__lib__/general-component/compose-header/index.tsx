import styled from "styled-components";

const StyledComposeHeader = styled.div`
    font-size: var(--fs-xl);
    font-weight: bold;
    text-transform: uppercase;
    background-color: var(--main-primary);
    color: var(--contrast-primary);
    padding: var(--spacing-sm);
    min-height: var(--min-height-header);
    display: flex;
    align-items: center;
    column-gap: var(--spacing-sm);
    overflow-x: hidden;
`;

type StandardComposeHeader = {} & React.HTMLAttributes<HTMLDivElement>;
const StandardComposeHeader: React.FC<StandardComposeHeader> = ({ children, ...restProps }) => {
    return (
        <StyledComposeHeader {...restProps}>
            {children}
        </StyledComposeHeader>
    );
};

type HeaderItem = {
    span?: boolean;
    right?: boolean;
} & React.PropsWithChildren;
const StyledHeaderItem = styled.div<{ $span?: boolean; }>`
    ${({ $span }) => $span ? 'flex: 1;' : ''}

    &.header-item-right {
        margin-left: auto;

        +.header-item-right {
            margin-left: unset;
        }
    }
`;
const HeaderItem: React.FC<HeaderItem> = ({
    span,
    right,
    children,
}) => {
    return <StyledHeaderItem
        $span={span}
        className={right ? 'header-item-right' : ''}
    >{children}</StyledHeaderItem>;
};

export const ComposeHeader = Object.assign(
    StandardComposeHeader,
    { HeaderItem }
);
