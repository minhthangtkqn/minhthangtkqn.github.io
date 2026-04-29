import React from 'react';
import { Dropdown } from "antd";
import styled from "styled-components";

const StyledDropdown: typeof Dropdown = styled(Dropdown)`
`;

export const TomDropdown = ({ ...rest }: React.ComponentProps<typeof Dropdown>) => {
    return <StyledDropdown
        {...rest}
    />;
};
