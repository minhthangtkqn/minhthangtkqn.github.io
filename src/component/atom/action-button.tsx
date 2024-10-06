import React from 'react';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import styled from "styled-components";

const StyledActionButton = styled(Button)`
    &.ant-btn.ant-btn-link {
        padding: 0;
        width: fit-content;
        height: fit-content;
    }
`;

// ref do styled component tái tạo không phù hợp với Button => tạm thời không nhận ref & mannual xử lý forwardRef nếu cần
type ActionButtonProps = Omit<React.ComponentProps<typeof Button>, 'ref'>
    & { tooltip?: Pick<React.ComponentProps<typeof Tooltip>, 'title'>['title']; };

const ActionButtonDelete: React.ComponentType<ActionButtonProps> = ({ tooltip, ...props }) => {
    return <Tooltip title={tooltip}><StyledActionButton
        type="link"
        danger
        icon={<DeleteOutlined />}
        {...props}
    ></StyledActionButton></Tooltip>;
};

const ActionButtonEdit: React.ComponentType<ActionButtonProps> = ({ tooltip, ...props }) => {
    return <Tooltip title={tooltip}><StyledActionButton
        type="link"
        icon={<EditOutlined />}
        {...props}
    ></StyledActionButton></Tooltip>;
};

export const ActionButton = {
    Delete: ActionButtonDelete,
    Edit: ActionButtonEdit,
};
