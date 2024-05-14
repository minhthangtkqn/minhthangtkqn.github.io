import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from "styled-components";
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

const StyledTimerClock = styled.div`
`;

const COUNT_DOWN = 20 * 60;
type Props = {};
export type TimerClockRef = {
    start: () => void;
    pause: () => void;
};
export const TimerClock = forwardRef<TimerClockRef, Props>(({ }, ref) => {
    const [tempCountdown, setTempCountdown] = useState(COUNT_DOWN);
    const [intervalInstance, setIntervalInstance] = useState<ReturnType<typeof setInterval>>();

    useImperativeHandle(ref, () => ({
        start: handleStart,
        pause: handlePause,
    }));

    const handleStart = () => {
        const interval = setInterval(() => setTempCountdown(prev => prev - 1), 1000);
        setIntervalInstance(interval);
    };

    const handlePause = () => {
        clearInterval(intervalInstance);
    };

    return (
        <StyledTimerClock>
            {/* {} */}
        </StyledTimerClock>
    );
});
