import { Button } from "antd";
import React from 'react';
import styled from "styled-components";

const StyledButton: typeof Button = styled(Button)`
    border-radius: var(--br-xl);
`;

export const TomButton = ({ ...rest }: React.ComponentProps<typeof Button>) => {
    return <StyledButton
        {...rest}
    />;
};
