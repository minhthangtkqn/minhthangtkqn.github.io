import { Spin } from "antd";
import styled from "styled-components";

const StyledLoadingWrapper = styled.div`
    &.loading-background {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
        opacity: 0.5;
        background-color: white;

        .loading-icon-root {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;

type Loading = {};
export const Loading: React.FC<Loading> = () => {
    return <StyledLoadingWrapper className="loading-background">
        <Spin
            spinning={true}
            rootClassName="loading-icon-root"
        />
    </StyledLoadingWrapper>;
};
