import React from 'react';
import { CloseOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import styled from "styled-components";

const StyledActionButton = styled(Button)`
    &.ant-btn.ant-btn-link {
        padding: 0;
        width: fit-content;
        height: fit-content;
    }
`;

const ActionButtonDelete: React.ComponentType<
    React.ComponentProps<typeof Button>
    & { tooltip?: Pick<React.ComponentProps<typeof Tooltip>, 'title'>['title']; }
> = ({ tooltip, ...props }) => {
    return <Tooltip title={tooltip}><StyledActionButton
        type="link"
        danger
        icon={<CloseOutlined />}
        {...props}
    ></StyledActionButton></Tooltip>;
};

export const ActionButton = {
    Delete: ActionButtonDelete,
};
