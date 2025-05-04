import './focus.scss';
import { TimerPanel } from "./timer-panel";
import { TaskPanel } from "./task-panel";
import { BaseLayout } from "@/__lib__/layout";

export const FocusAppInfo = {
    name: 'focus' as const,
};

export const FocusApp = () => {
    return (
        <BaseLayout
            PrimaryComponent={TimerPanel}
            SecondaryComponent={TaskPanel}
            className="focus-app-layout"
        />
    );
};
