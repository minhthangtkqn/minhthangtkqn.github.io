import React from 'react';
import { PreciousMetalPrice } from "@/model";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import styled from "styled-components";
import dayjs from "dayjs";
import { currencyFormatter } from "@/util";

const StyledGoldPriceGraphContainer = styled.div`
    padding: var(--spacing);
    border: var(--bd);
    border-radius: var(--br);
    width: 100%;

    .graph-title {
        font-size: var(--fs-xl);
        font-weight: bold;
        text-transform: uppercase;
    }
`;

const StyledCustomGraphTooltip = styled.div`
    background-color: white;
    border: var(--bd);
    border-radius: var(--spacing-xxs);
    padding: 0 var(--spacing);

    .value-Buy {
        color: var(--sub-purple);
    }

    .value-Sell {
        color: var(--sub-leaf);
    }
`;
type Props = {
    data: PreciousMetalPrice[];
    title?: string;
};
export const PreciousMetalPriceGraph: React.ComponentType<Props> = ({ data, title = 'GRAPH' }: Props) => {
    const standardizeData = (list: PreciousMetalPrice[]) => {
        return list.map(item => ({
            ...item,
            date: dayjs(new Date(item._created)).format('DD-MM-YYYY (HH:mm:ss)'),
        }));
    };

    const getYAxisScaleDomain = (list: PreciousMetalPrice[]) => {
        const allBuyPrice = list.map(item => item.buy_price).filter(item => typeof item === 'number');
        const allSellPrice = list.map(item => item.sell_price).filter(item => typeof item === 'number');
        const { minValue, maxValue } = allBuyPrice.length === 0 && allSellPrice.length === 0
            ? { minValue: 0, maxValue: 0 }
            : {
                minValue: Math.min(...allBuyPrice.length > 0
                    ? allBuyPrice
                    : allSellPrice
                ),
                maxValue: Math.max(...allSellPrice.length > 0
                    ? allSellPrice
                    : allBuyPrice
                ),
            };

        const valueOffset = maxValue - minValue;
        const graphEdgeOffsetRate = 0.2;
        const valueRoundingStep = 10000;
        return [
            Math.floor((minValue - graphEdgeOffsetRate * valueOffset) / valueRoundingStep) * valueRoundingStep,
            Math.ceil((maxValue + graphEdgeOffsetRate * valueOffset) / valueRoundingStep) * valueRoundingStep,
        ];
    };

    return (
        <StyledGoldPriceGraphContainer>
            <div className="graph-title">{title}</div>
            <ResponsiveContainer width="100%" height={350}>
                <LineChart
                    data={standardizeData(data)}
                    margin={{
                        top: 5,
                        right: 20,
                        bottom: 5,
                        left: 15,
                    }}
                >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis
                        dataKey="date"
                        height={90}
                        angle={65}
                        tickMargin={45}
                        tickFormatter={(value) => {
                            return (value as string)?.split(' ')[0];
                        }}
                    />
                    <YAxis
                        width={80}
                        tickFormatter={(value) => {
                            return currencyFormatter.format(value);
                        }}
                        domain={getYAxisScaleDomain(data)}
                    />
                    <Tooltip content={CustomTooltip} />
                    <Line name="Buy" type="monotone" dataKey="buy_price" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line name="Sell" type="monotone" dataKey="sell_price" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Legend verticalAlign="top" height={36} />
                </LineChart>
            </ResponsiveContainer>
        </StyledGoldPriceGraphContainer>
    );
};

const CustomTooltip = ({ active, payload, label }: { active?: any, payload?: any, label?: any; }) => {
    if (active && payload && payload.length) {
        return (
            <StyledCustomGraphTooltip>
                <p className="label"><b>{label}</b></p>
                {(payload as any[])?.sort((pA, pB) => pB?.value - pA?.value)?.map((p) => <>
                    <p className={`value-${p?.name}`}>{p?.name}: {currencyFormatter.format(p?.value)}</p>
                </>)}
            </StyledCustomGraphTooltip>
        );
    }

    return null;
};
