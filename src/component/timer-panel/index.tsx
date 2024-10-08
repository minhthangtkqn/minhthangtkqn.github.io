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
        font-size: var(--fs-6xl);
    }

    .timer-menu {
        padding-top: var(--spacing-md);
        padding-bottom: var(--spacing-md);
        font-size: var(--fs-xl);
        width: 100%;
        border-bottom: none;
        justify-content: center;

        li.ant-menu-item {
            --menu-item-color: unset;

            &.blue {
                --menu-item-color: var(--main-antd);
                color: var(--menu-item-color);
            }

            &.green {
                --menu-item-color: var(--main-success);
                color: var(--menu-item-color);
            }

            &.ant-menu-item-selected::after {
                color: var(--menu-item-color);
                border-bottom-color: var(--menu-item-color);
            }
            &.ant-menu-item-active {
                color: var(--menu-item-color);

                &:hover {
                    color: var(--menu-item-color);
                }

                &::after {
                    border-bottom-color: var(--menu-item-color);
                }
            }
        }
    }

    .start-btn {
        font-size: var(--fs-4xl);
        line-height: var(--fs-4xl);
        margin-top: var(--spacing);
    }
`;

const TimerKind = {
    POMODORO: 'POMODORO' as const,
    REST: 'REST' as const,
    LONG_REST: 'LONG_REST' as const,
};
type TimerKind = typeof TimerKind[keyof typeof TimerKind];
const TimerKindSchema: Record<TimerKind, { title: string; className?: string; }> = {
    [TimerKind.POMODORO]: {
        title: 'Pomodoro',
        className: 'blue',
    },
    [TimerKind.REST]: {
        title: 'Rest',
        className: 'green',
    },
    [TimerKind.LONG_REST]: {
        title: 'Long Rest',
        className: 'green',
    },
};

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
                // items={[
                //     {
                //         key: '1',
                //         label: 'Pomodoro',
                //         className: 'blue',
                //     },
                //     {
                //         key: '2',
                //         label: 'Rest',
                //         className: 'green',
                //     },
                //     {
                //         key: '3',
                //         label: 'Long rest',
                //         className: 'green',
                //     },
                // ]}
                items={Object.entries(TimerKindSchema).map(([key, item]) => ({
                    key: key,
                    label: item.title,
                    className: item.className,
                }))}
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
