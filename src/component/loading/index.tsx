import { Spin } from "antd";
import styled from "styled-components";

const StyledLoadingContainer = styled.div`
    &.loading-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        opacity: 0.5;
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

type Loading = {};
export const Loading: React.FC<Loading> = () => {
    return <StyledLoadingContainer className="loading-container">
        <Spin spinning={true} />
    </StyledLoadingContainer>;
};
