import { SyncOutlined } from "@ant-design/icons";
import { ComposeHeader } from "../compose-header";

export type PaginatedHeader = {
    title?: React.ReactNode;
    loading?: boolean;
    refreshData: () => void;
};

export const DefaultPaginatedHeader = (props: PaginatedHeader) => {
    const {
        title,
        loading,
        refreshData,
    } = props;

    return <ComposeHeader>
        <ComposeHeader.HeaderItem>
            {title} <SyncOutlined spin={loading} />
        </ComposeHeader.HeaderItem>
    </ComposeHeader>;
};