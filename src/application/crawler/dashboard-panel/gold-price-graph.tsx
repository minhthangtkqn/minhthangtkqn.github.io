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
    const standardizeData = (data: GoldPrice[]) => {
        return data.map(item => ({
            ...item,
            date: dayjs(new Date(item._created)).format('HH:mm:ss DD-MM-YYYY'),
        }));
    };

    return (
        <StyledGoldPriceGraphContainer>
            <LineChart width={900} height={600} data={standardizeData(data)}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" height={250} angle={90} tickMargin={80} />
                <YAxis width={100} />
                <Tooltip content={CustomTooltip} />
                {/* <Tooltip /> */}
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
            </LineChart>
        </StyledGoldPriceGraphContainer>
    );
};

const CustomTooltip = ({ active, payload, label }: { active?: any, payload?: any, label?: any; }) => {
    if (active && payload && payload.length) {
        return (
            <StyledCustomGraphTooltip>
                <p className="label">{label}</p>
                <p className="value">Price: {currencyFormatter.format(payload[0].value)}</p>
            </StyledCustomGraphTooltip>
        );
    }

    return null;
};
