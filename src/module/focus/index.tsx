import React from 'react';
import { TimerPanel } from "./timer-panel";
import { TaskPanel } from "./task-panel";
import { BaseLayout } from "@/component";

export const FocusModuleInfo = {
    name: 'focus',
};

export const FocusModule = () => {
    return (
        <BaseLayout
            primarySlot={<TimerPanel />}
            secondarySlot={<TaskPanel />}
        />
    );
};
