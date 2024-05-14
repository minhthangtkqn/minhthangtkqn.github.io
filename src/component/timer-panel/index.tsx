import React, { useRef, useState } from 'react';
import { Button, Menu } from "antd";
import styled from "styled-components";
import { TimerClock, TimerClockRef } from "./timer-clock";

const StyledTimerPanel = styled.div`
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title {
        font-size: var(--fs-4xl);
    }

    .timer-menu {
        padding-top: var(--spacing-md);
        padding-bottom: var(--spacing-md);
        font-size: var(--fs-lg);
        width: 100%;
        border-bottom: none;
        justify-content: center;
    }

    .start-btn {
        font-size: var(--fs-4xl);
        line-height: var(--fs-4xl);
    }
`;

export const TimerPanel: React.FC = () => {
    const [running, setRunning] = useState(false);
    const timerClockRef = useRef<TimerClockRef>(null);

    const handleRunTimer = () => {
        timerClockRef.current?.start();
        setRunning(true);
    };

    const handlePauseTimer = () => {
        timerClockRef.current?.pause();
        setRunning(false);
    };

    return (
        <StyledTimerPanel>
            {/* title */}
            <div className="title">Title</div>

            {/* timer type menu */}
            <Menu
                className="timer-menu"
                items={[
                    {
                        key: '1',
                        label: 'Pomodoro',
                    },
                    {
                        key: '2',
                        label: 'Rest',
                    },
                    {
                        key: '3',
                        label: 'Long rest',
                    },
                ]}
                mode="horizontal"
            />

            {/* timer clock */}
            <TimerClock ref={timerClockRef} />

            {/* start timer button */}
            <Button
                size="large"
                type="primary"
                className="start-btn"
                onClick={running ? handlePauseTimer : handleRunTimer}
            >{running ? 'PAUSE' : 'START'}</Button>
        </StyledTimerPanel>
    );
};
