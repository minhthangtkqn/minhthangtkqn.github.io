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
        margin-top: var(--spacing);
    }
`;

export const TimerPanel: React.FC = () => {
    const [isRunning, setRunning] = useState(false);
    const timerClockRef = useRef<TimerClockRef>(null);

    const handleClickStart = (is_running: boolean) => {
        if (is_running) {
            timerClockRef.current?.pause();
        } else {
            timerClockRef.current?.start();
        }
    };

    const handleChangeTimer = (is_running: boolean) => {
        setRunning(is_running);
    };

    return (
        <StyledTimerPanel>
            <div className="title">Timer</div>

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

            <TimerClock
                ref={timerClockRef}
                onChange={handleChangeTimer}
                type="default"
            />

            <Button
                size="large"
                type="primary"
                className="start-btn"
                onClick={() => handleClickStart(isRunning)}
            >{isRunning ? 'PAUSE' : 'START'}</Button>
        </StyledTimerPanel>
    );
};
