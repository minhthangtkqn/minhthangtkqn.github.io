import './focus.scss';
import { TimerPanel } from "./timer-panel";
import { TaskPanel } from "./task-panel";
import { BaseLayout } from "@/component";

export const FocusModuleInfo = {
    name: 'focus' as const,
};

export const FocusModule = () => {
    return (
        <BaseLayout
            primarySlot={<TimerPanel />}
            secondarySlot={<TaskPanel />}
            className="focus-module-layout"
        />
    );
};
