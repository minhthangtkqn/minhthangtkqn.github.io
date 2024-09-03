import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from "styled-components";
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';

const StyledTimerClock = styled.div`
    font-size: var(--fs-8xl);
    padding: var(--spacing-4xl);
    border: var(--bd);
    border-width: var(--spacing-xs);
    border-radius: var(--br-max);
    border-color: var(--main-primary);
    background-color: var(--main-primaryLighter);
    height: 10rem;
    width: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        filter: brightness(103%);
    }
`;

const simpleTimeNumberFormat = (value: number) => {
    return value >= 10 ? value : '0' + value;
};

const COUNT_DOWN = 20 * 60;
type Props = {};
export type TimerClockRef = {
    start: () => void;
    pause: () => void;
};
export const TimerClock = forwardRef<TimerClockRef, Props>(({ }, ref) => {
    const [countdownInSeconds, setCountdownInSeconds] = useState(COUNT_DOWN);
    const [isRunning, setRunning] = useState(false);
    const [intervalInstance, setIntervalInstance] = useState<ReturnType<typeof setInterval>>();

    useImperativeHandle(ref, () => ({
        start: handleStart,
        pause: handlePause,
    }));

    const handleStart = () => {
        setRunning(true);
        console.log('🚀 ~ handleStart ~ handleStart:');
        const interval = setInterval(() => setCountdownInSeconds(prev => prev - 1), 1000);
        setIntervalInstance(interval);
    };

    const handlePause = () => {
        clearInterval(intervalInstance);
        setRunning(false);
    };

    useEffect(() => {
        console.log('🚀 ~ TimerClock ~ tempCountdown:', countdownInSeconds);
    }, [countdownInSeconds]);

    const remainingMinutes = Math.floor((countdownInSeconds % (60 * 60)) / 60);
    const remainingSeconds = countdownInSeconds % 60;

    return (
        <StyledTimerClock onClick={() => isRunning ? handlePause() : handleStart()}>
            {simpleTimeNumberFormat(remainingMinutes)}:{simpleTimeNumberFormat(remainingSeconds)}
        </StyledTimerClock>
    );
});
