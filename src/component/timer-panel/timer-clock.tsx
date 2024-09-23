import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from "styled-components";
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Button } from "antd";

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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        filter: brightness(103%);
    }

    .reset-btn {
        font-size: var(--fs-xl);
    }
`;

const simpleTimeNumberFormat = (value: number) => {
    return value >= 10 ? value : '0' + value;
};

const DEFAULT_COUNT_DOWN = 0.05 * 60;
type TimerClock = {
    onChange?: (is_running: boolean) => void;
};
export type TimerClockRef = {
    start: () => void;
    pause: () => void;
};
export const TimerClock = forwardRef<TimerClockRef, TimerClock>(({
    onChange,
}, ref) => {
    const [countdownInSeconds, setCountdownInSeconds] = useState(DEFAULT_COUNT_DOWN);
    const [isRunning, setRunning] = useState(false);
    const [intervalInstance, setIntervalInstance] = useState<ReturnType<typeof setInterval>>();

    useImperativeHandle(ref, () => ({
        start: handleStart,
        pause: handlePause,
    }));

    const handleStart = () => {
        setRunning(true);
        if (!countdownInSeconds) {
            setCountdownInSeconds(DEFAULT_COUNT_DOWN);
        }
        const interval = setInterval(() => setCountdownInSeconds(prev => prev - 1), 1000);
        setIntervalInstance(interval);
        onChange?.(true);
    };

    const handlePause = () => {
        clearInterval(intervalInstance);
        setRunning(false);
        onChange?.(false);
    };

    const handleReset = () => {
        handlePause();
        setCountdownInSeconds(DEFAULT_COUNT_DOWN);
    };

    const playAlertSound = () => {
        (new Audio('http://bruitages.free.fr/horloges/sonnette_reveil.wav')).play();
    };

    useEffect(() => {
        if (countdownInSeconds === 0) {
            handlePause();
            playAlertSound();
        }
    }, [countdownInSeconds]);

    const remainingMinutes = Math.floor((countdownInSeconds % (60 * 60)) / 60);
    const remainingSeconds = countdownInSeconds % 60;

    return (
        <StyledTimerClock onClick={() => isRunning ? handlePause() : handleStart()}>
            <div>{simpleTimeNumberFormat(remainingMinutes)}:{simpleTimeNumberFormat(remainingSeconds)}</div>
            <Button
                type="link"
                className="reset-btn"
                size="small"
                onClick={handleReset}
            >Reset</Button>
        </StyledTimerClock>
    );
});
