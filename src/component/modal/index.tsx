import React from 'react';
import { Modal } from "antd";
import styled from "styled-components";

const StyledModal = styled(Modal) <{ $noPadding?: boolean; }>`
    .ant-modal-content {
        border-radius: var(--br-sm);
        ${props => props.$noPadding ? 'padding: 0;' : ''}

        .ant-modal-close {
            color: var(--contrast-primary);
            
            &:hover {
                color: var(--main-danger);
                background-color: transparent;
            }
        }

        .ant-modal-header {
            height: var(--min-height-header);
            background-color: var(--main-primary);
            color: var(--contrast-primary);
            border-top-left-radius: var(--br-sm);
            border-top-right-radius: var(--br-sm);
            display: flex;
            align-items: center;
            padding: var(--spacing);
            margin-bottom: 0;

            .ant-modal-title {
                color: inherit;
            }
        }
    }
`;

type FoModalExtraProps = {
    noPadding?: boolean;
};

export const PublicModal: React.FC<React.ComponentProps<typeof Modal> & FoModalExtraProps> = ({
    noPadding = false,
    title = "Modal",
    ...restProps
}) => {
    return (
        <StyledModal
            $noPadding={noPadding}
            {...restProps}
            title={title}
        />
    );
};
