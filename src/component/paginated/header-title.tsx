import { SyncOutlined } from "@ant-design/icons";
import { ComposeHeader } from "../compose-header";

type PaginatedHeaderTitle = {
    title?: React.ReactNode;
    loading?: boolean;
    refreshData: () => void;
};

export const PaginatedHeaderTitle = (props: PaginatedHeaderTitle) => {
    const {
        title,
        loading,
        refreshData,
    } = props;

    return <ComposeHeader.HeaderItem>
        {title} <SyncOutlined onClick={refreshData} spin={loading} style={{ cursor: 'pointer' }} />
    </ComposeHeader.HeaderItem>;
};