import { CentralRequestor, useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { PreciousMetalPriceGraph } from "./precious-metal-price-graph";
import { PreciousMetalPrice, PreciousMetalType } from "@/model";
import { Loading } from "@/__lib__/general-component";

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
        position: relative;
    }

    .error-text {
        color: var(--main-danger);
    }
`;

export const DashboardPanel: React.FC = () => {
    const { data: preciousMetalPriceList, refresh: refreshPreciousMetalPriceList } = useRequest<PreciousMetalPrice[]>(QueryApi.PreciousMetal.getHistoryPriceList());
    const { data: preciousMetalTypeList, loading: preciousMetalTypeListLoading } = useRequest<PreciousMetalType[]>(QueryApi.PreciousMetal.getTypeList());

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

            {/* <div className="current-price-section">
                {currentPrice?.map(p => <div key={p._id}>
                    {p.type_name}: {p.sell_price != null ? currencyFormatter.format(p.sell_price) : <EmptyValue />}
                </div>)}
            </div> */}
            {currentPriceError ? <div className="error-text">{currentPriceError}</div> : null}
            <Row className="precious-metal-price-graph-list" gutter={[15, 15]}>
                {preciousMetalTypeListLoading && <Loading />}
                {preciousMetalTypeList?.map(type => {
                    const filterPriceList = (preciousMetalPriceList ?? [])?.filter(p => p.type_id === type._id);
                    return filterPriceList.length > 0
                        ? <Col span={12}>
                            <PreciousMetalPriceGraph
                                key={type._id}
                                data={filterPriceList}
                                title={filterPriceList[0].type_name}
                            />
                        </Col>
                        : null;
                })}
            </Row>
        </StyledDashboardPanelContainer>
    );
};
