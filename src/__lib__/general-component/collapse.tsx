import React from 'react';
import { Collapse } from "antd";
import styled from "styled-components";

const StyledCollapse: typeof Collapse = styled(Collapse)`
    &.ant-collapse-borderless {
        .ant-collapse-header {
            border-bottom: var(--bd);
            padding: 0;

            .ant-collapse-header-text {
                font-size: var(--fs-lg);
                color: var(--color-faint);
                font-weight: bold;
            }
        }

        .ant-collapse-item + .ant-collapse-item {
            margin-top: var(--spacing);
        }

        .ant-collapse-content {
            .ant-collapse-content-box {
                padding: 0;
                padding-top: var(--spacing-sm);
            }
        }
    }
`;

const Panel = Collapse.Panel;
const HocCollapse = ({
    ...props
}: React.ComponentProps<typeof Collapse>) => {
    return (
        <StyledCollapse
            bordered={false}
            ghost
            size="small"
            expandIconPosition="end"
            {...props}
        />
    );
};

export const TomCollapse = Object.assign(
    HocCollapse,
    { Panel },
);