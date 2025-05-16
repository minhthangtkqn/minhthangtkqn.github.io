import { GoldPrice } from "@/model";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import styled from "styled-components";
import dayjs from "dayjs";
import { currencyFormatter } from "@/util";

const StyledGoldPriceGraphContainer = styled.div`
    padding: var(--spacing-sm) var(--spacing-sm);
    border: var(--bd);
`;

const StyledCustomGraphTooltip = styled.div`
    background-color: white;
    border: var(--bd);
    border-radius: var(--spacing-xxs);
    padding: 0 var(--spacing);

    .value {
        color: var(--sub-purple);
    }
`;
type Props = {
    data: GoldPrice[];
};
export const GoldPriceGraph: React.ComponentType<Props> = ({ data }: Props) => {
    const standardizeData = (list: GoldPrice[]) => {
        return list.map(item => ({
            ...item,
            date: dayjs(new Date(item._created)).format('DD-MM-YYYY (HH:mm:ss)'),
        }));
    };

    const getYAxisScaleDomain = (list: GoldPrice[]) => {
        const minValue = Math.min(...(list.map(item => item.price)));
        const maxValue = Math.max(...(list.map(item => item.price)));
        const valueOffset = maxValue - minValue;
        const graphEdgeOffsetRate = 0.2;
        const nearestRoundLimit = 10000;
        return [
            Math.floor((minValue - graphEdgeOffsetRate * valueOffset) / nearestRoundLimit) * nearestRoundLimit,
            Math.ceil((maxValue + graphEdgeOffsetRate * valueOffset) / nearestRoundLimit) * nearestRoundLimit,
        ];
    };

    return (
        <StyledGoldPriceGraphContainer>
            <LineChart
                width={900}
                height={400}
                data={standardizeData(data)}
                margin={{
                    top: 15,
                    right: 50,
                    bottom: 15,
                    left: 25,
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
                <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </StyledGoldPriceGraphContainer>
    );
};

const CustomTooltip = ({ active, payload, label }: { active?: any, payload?: any, label?: any; }) => {
    if (active && payload && payload.length) {
        return (
            <StyledCustomGraphTooltip>
                <p className="label"><b>{label}</b></p>
                <p className="value">Price: {currencyFormatter.format(payload[0].value)}</p>
            </StyledCustomGraphTooltip>
        );
    }

    return null;
};
