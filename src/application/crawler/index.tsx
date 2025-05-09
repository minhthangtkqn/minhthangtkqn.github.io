import './crawler.scss';
import { DashboardPanel } from "./dashboard-panel";
import { BaseLayout } from "@/__lib__/layout";

export const CrawlerAppInfo = {
    name: 'crawler' as const,
};

export const CrawlerApp = () => {
    return (
        <BaseLayout
            PrimaryComponent={DashboardPanel}
            className="crawler-app-layout"
        />
    );
};
