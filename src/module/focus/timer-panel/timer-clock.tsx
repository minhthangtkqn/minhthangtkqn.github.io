import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from "styled-components";
import { Button } from "antd";

const StyledTimerClock = styled.div<{ $type?: 'default' | 'antd' | 'success' | 'warning' | 'danger'; }>`
    ${props => {
        if (!props.$type || props.$type === 'default') {
            return `
                --type-border-color: var(--main-primary);
                --type-background-color: var(--main-primaryLighter);
                --type-color: var(--contrast-primaryLighter);
            `;
        }

        return `
            --type-border-color: var(--main-${props.$type});
            --type-background-color: var(--main-${props.$type}Lighter);
            --type-color: var(--contrast-${props.$type}Lighter);
        `;
    }}
    font-size: var(--fs-8xl);
    padding: var(--spacing-4xl);
    border: var(--bd);
    border-width: var(--spacing-xs);
    border-radius: var(--br-max);
    border-color: var(--type-border-color);
    background-color: var(--type-background-color);
    color: var(--type-color);
    min-height: 16rem;
    width: 16rem;
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

const DEFAULT_COUNTDOWN_IN_MINUTES = 15;
type TimerClock = {
    initialCountdownInMinutes?: number;
    type?: Pick<React.ComponentProps<typeof StyledTimerClock>, '$type'>['$type'];
    onChange?: (is_running: boolean) => void;
};
export type TimerClockRef = {
    start: () => void;
    pause: () => void;
};
export const TimerClock = forwardRef<TimerClockRef, TimerClock>(({
    initialCountdownInMinutes = DEFAULT_COUNTDOWN_IN_MINUTES,
    type = 'default',
    onChange,
}, ref) => {
    const initialCountdownInSeconds = initialCountdownInMinutes * 60;

    const [countdownInSeconds, setCountdownInSeconds] = useState(initialCountdownInSeconds);
    const [isRunning, setRunning] = useState(false);
    const [intervalInstance, setIntervalInstance] = useState<ReturnType<typeof setInterval>>();

    useImperativeHandle(ref, () => ({
        start: handleStart,
        pause: handlePause,
    }));

    const handleStart = () => {
        setRunning(true);
        if (!countdownInSeconds) {
            setCountdownInSeconds(initialCountdownInSeconds);
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
        setCountdownInSeconds(initialCountdownInSeconds);
    };

    const playAlertSound = (playTimes: number = 1) => {
        if (!playTimes) {
            return;
        }

        // const audioUrl = 'http://bruitages.free.fr/horloges/sonnette_reveil.wav';
        const audioUrl = 'http://cd.textfiles.com/999wavs/WAVS_C/CUCKOO.WAV';
        const audioInstance = new Audio(audioUrl);
        audioInstance.addEventListener(
            'ended',
            () => playAlertSound(playTimes - 1),
        );
        audioInstance.play();
    };

    useEffect(() => {
        if (countdownInSeconds === 0) {
            handlePause();
            playAlertSound(3);
        }
    }, [countdownInSeconds]);

    const remainingMinutes = Math.floor((countdownInSeconds % (60 * 60)) / 60);
    const remainingSeconds = countdownInSeconds % 60;

    return (
        <StyledTimerClock
            $type={type}
            onClick={() => isRunning ? handlePause() : handleStart()}
        >
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
