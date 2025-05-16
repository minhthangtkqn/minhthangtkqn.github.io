import { CentralRequestor, useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { EmptyValue } from "@/component";
import { currencyFormatter } from "@/util";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoldPriceGraph } from "./gold-price-graph";
import { GoldPrice } from "@/model";

export const DashboardPanelInfo = {
    name: 'dashboard' as const,
};

const StyledDashboardPanelContainer = styled.div`
    flex: 1;
    background-color: white;
    padding: var(--spacing-sm) var(--spacing);
    border: var(--bd);
    border-radius: var(--br);

    .panel-title {
        margin: 0;
    }

    .error-text {
        color: var(--main-danger);
    }
`;

export const DashboardPanel: React.FC = () => {
    const { data: goldPriceList, refresh: refreshGoldPriceList } = useRequest<GoldPrice[]>(QueryApi.GoldPrice.list());

    useEffect(() => {
        console.log('🚀 ~ goldPriceList:', goldPriceList);
    }, [goldPriceList]);

    const [currentPrice, setCurrentPrice] = useState<number>();
    const [loadingCurrentPrice, setLoadingCurrentPrice] = useState(false);
    const [currentPriceError, setCurrentPriceError] = useState<any>();

    const getCurrentGoldPrice = async () => {
        try {
            setLoadingCurrentPrice(true);
            const response = await CentralRequestor.get(QueryApi.GoldPrice.current());
            setCurrentPrice(response.data);
            setCurrentPriceError(undefined);
            refreshGoldPriceList();
        } catch (error) {
            setCurrentPrice(undefined);
            setCurrentPriceError(error);
        } finally {
            setLoadingCurrentPrice(false);
        }
    };

    return (
        <StyledDashboardPanelContainer className="crawler-dashboard-panel">
            <h1 className="panel-title">GOLD PRICE CRAWLER DASHBOARD PANEL</h1>
            <Button
                type="primary"
                size="small"
                loading={loadingCurrentPrice}
                onClick={() => getCurrentGoldPrice()}
            >Get current gold price</Button>
            <div>Current Price: {currentPrice != null ? <b>{currencyFormatter.format(currentPrice)}</b> : <EmptyValue />}</div>
            {currentPriceError ? <div className="error-text">{currentPriceError}</div> : null}
            <div className="gold-price-graph">
                <GoldPriceGraph
                    data={goldPriceList ?? []}
                />
            </div>
        </StyledDashboardPanelContainer>
    );
};
