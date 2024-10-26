import React from 'react';
import { TimerPanel } from "./timer-panel";
import { TaskPanel } from "./task-panel";

export const FocusModuleInfo = {
    name: 'focus',
};

export const FocusModule = () => {
    return (
        <div className="layout-base app-body">
            <div className="primary">
                <TimerPanel />
            </div>
            <div className="secondary">
                <TaskPanel />
            </div>
        </div>
    );
};
