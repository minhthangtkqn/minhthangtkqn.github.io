import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import React, { useEffect } from "react";
import styled from "styled-components";

export const DashboardPanelInfo = {
    name: 'dashboard' as const,
};

const StyledDashboardPanelContainer = styled.div`
    flex: 1;
    background-color: white;
    padding: var(--spacing-sm) var(--spacing);
    border: var(--bd);
    border-radius: var(--br);
`;

export const DashboardPanel: React.FC = () => {
    const { data: goldPriceList } = useRequest(QueryApi.GoldPrice.list());

    useEffect(() => {
        console.log('🚀 ~ goldPriceList:', goldPriceList);
    }, [goldPriceList]);

    return (
        <StyledDashboardPanelContainer className="crawler-dashboard-panel">
            <div>CRAWLER DASHBOARD PANEL</div>
        </StyledDashboardPanelContainer>
    );
};
