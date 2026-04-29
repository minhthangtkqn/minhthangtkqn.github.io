import React, { forwardRef } from 'react';
import { Form } from "antd";
import styled from "styled-components";

const StyledForm: typeof Form = styled(Form)`
    padding: var(--spacing-sm);

    .ant-form-item:last-child {
        margin-bottom: 0;
    }

    .base-form-footer {
        display: flex;
        justify-content: space-between;
    }
`;

export const BaseForm = forwardRef<React.ComponentRef<typeof Form>, React.ComponentProps<typeof Form>>(
    (
        {
            ...restProps
        },
        ref
    ) => {
        return <StyledForm
            ref={ref}
            layout="vertical"
            {...restProps}
        />;
    },
);
