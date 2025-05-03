import { ComposeHeader } from "@/__lib__/general-component";
import { PaginatedHeaderTitle } from "./header-title";

export type PaginatedHeader = {
    title?: React.ReactNode;
    loading?: boolean;
    refreshData: () => void;
};

export const DefaultPaginatedHeader = (props: PaginatedHeader) => {
    return <ComposeHeader>
        <PaginatedHeaderTitle {...props} />
    </ComposeHeader>;
};