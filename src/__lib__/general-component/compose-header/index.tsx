import { mergeClass } from "@/util";
import styled from "styled-components";

type ComposeHeaderType = 'primary' | 'secondary' | 'tertiary';

const StyledComposeHeader = styled.div<{ $type: ComposeHeaderType; }>`
    ${({ $type }) => {
        if ($type === 'secondary') {
            return `
                background-color: var(--main-secondary);
                color: var(--contrast-secondary);
            `;
        }

        if ($type === 'tertiary') {
            return `
                background-color: var(--main-tertiary);
                color: var(--contrast-tertiary);
            `;
        }

        return `
            background-color: var(--main-primary);
            color: var(--contrast-primary);
        `;
    }}
    
    
    font-size: var(--fs-xl);
    font-weight: bold;
    text-transform: uppercase;
    padding: var(--spacing-sm);
    min-height: var(--min-height-header);
    display: flex;
    align-items: center;
    column-gap: var(--spacing-sm);
    overflow-x: hidden;
`;

type StandardComposeHeader = {
    type?: ComposeHeaderType;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;
const StandardComposeHeader: React.FC<StandardComposeHeader> = ({ children, type, ...restProps }) => {
    return (
        <StyledComposeHeader
            $type={type ?? 'primary'}
            {...restProps}
        >
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
        min-width: fit-content;

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
        className={mergeClass(
            right ? 'header-item-right' : '',
            'truncate'
        )}
    >{children}</StyledHeaderItem>;
};

export const ComposeHeader = Object.assign(
    StandardComposeHeader,
    { HeaderItem }
);
