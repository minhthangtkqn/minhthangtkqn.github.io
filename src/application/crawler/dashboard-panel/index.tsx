import { CentralRequestor, useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { EmptyValue } from "@/component";
import { currencyFormatter } from "@/util";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PreciousMetalPriceGraph } from "./precious-metal-price-graph";
import { PreciousMetalPrice, PreciousMetalType } from "@/model";

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
        display: flex;
        column-gap: var(--spacing-sm);
        align-items: center;

        .title-content {
            font-size: var(--fs-4xl);
            font-weight: bold;
        }
    }

    .current-price-section {

    }

    .precious-metal-price-graph-list {
        display: grid;
        column-gap: var(--spacing-sm);
        row-gap: var(--spacing-sm);
        grid-template-columns: 50% 50%;
    }

    .error-text {
        color: var(--main-danger);
    }
`;

export const DashboardPanel: React.FC = () => {
    const { data: preciousMetalPriceList, refresh: refreshPreciousMetalPriceList } = useRequest<PreciousMetalPrice[]>(QueryApi.PreciousMetal.getHistoryPriceList());
    const { data: preciousMetalTypeList } = useRequest<PreciousMetalType[]>(QueryApi.PreciousMetal.getTypeList());
    useEffect(() => {
        console.log('🚀 ~ goldPriceList:', preciousMetalPriceList);
    }, [preciousMetalPriceList]);
    useEffect(() => {
        console.log('🚀 ~ preciousMetalTypeList:', preciousMetalTypeList);
    }, [preciousMetalTypeList]);

    const [currentPrice, setCurrentPrice] = useState<PreciousMetalPrice[]>([]);
    const [loadingCurrentPrice, setLoadingCurrentPrice] = useState(false);
    const [currentPriceError, setCurrentPriceError] = useState<any>();

    const getCurrentGoldPrice = async () => {
        try {
            setLoadingCurrentPrice(true);
            const response = await CentralRequestor.get<PreciousMetalPrice[]>(QueryApi.PreciousMetal.getCurrentPrice());
            setCurrentPrice(response.data);
            setCurrentPriceError(undefined);
            refreshPreciousMetalPriceList();
        } catch (error) {
            setCurrentPrice([]);
            setCurrentPriceError(error);
        } finally {
            setLoadingCurrentPrice(false);
        }
    };

    return (
        <StyledDashboardPanelContainer className="crawler-dashboard-panel">
            <div className="panel-title">
                <div className="title-content">PRECIOUS METAL PRICE CRAWLER DASHBOARD PANEL</div>
                <Button
                    type="primary"
                    size="small"
                    loading={loadingCurrentPrice}
                    onClick={() => getCurrentGoldPrice()}
                >Get current price</Button>
            </div>

            {/* <div>Current Price: {currentPrice != null ? <b>{currencyFormatter.format(currentPrice)}</b> : <EmptyValue />}</div> */}

            <div className="current-price-section">
                {currentPrice?.map(p => <div key={p._id}>
                    {p.type_name}: {p.sell_price != null ? currencyFormatter.format(p.sell_price) : <EmptyValue />}
                </div>)}
            </div>
            {currentPriceError ? <div className="error-text">{currentPriceError}</div> : null}
            <div className="precious-metal-price-graph-list">
                {preciousMetalTypeList?.map(type => {
                    const filterPriceList = (preciousMetalPriceList ?? [])?.filter(p => p.type_id === type._id);
                    return filterPriceList.length > 0
                        ? <div key={type._id}>
                            <div>{filterPriceList[0].type_name}</div>
                            <PreciousMetalPriceGraph
                                data={filterPriceList}
                            />
                        </div>
                        : null;
                })}
            </div>
        </StyledDashboardPanelContainer>
    );
};
