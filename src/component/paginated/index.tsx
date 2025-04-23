import { forwardRef, useImperativeHandle } from 'react';
import styled from "styled-components";
import { useRequest } from "@/util";
import { DefaultPaginatedHeader, PaginatedHeader } from "./header";
import { DefaultPaginatedListRow, PaginatedListRow } from "./list-row";

/**
 * Ref override để giúp `forwardRef` nhận generic type
 */
declare module 'react' {
    function forwardRef<T, P = Record<string, unknown>>(
        render: (props: P, ref: ForwardedRef<T>) => React.ReactElement | null,
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const StyledPaginatedList = styled.div`
    /* flex: 1; */
    border: var(--bd);
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--contrast-primary);

    .paginated-list-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
`;

type PaginatedList<Data extends Record<string, unknown>> = {
    Header?: React.ComponentType<PaginatedHeader>;
    Row?: React.ComponentType<PaginatedListRow<Data>>;
    title?: string;
    baseUrl?: string;
    activeId?: string;
    onActive?: (id: string) => void;
    keyExtractor?: (data: Data) => string;
};
export type PaginatedListRef = {};
export const PaginatedList = forwardRef(function BasePaginatedList<Data extends Record<string, unknown>>(
    props: PaginatedList<Data>,
    ref: React.ForwardedRef<PaginatedListRef>,
) {
    const {
        Header = DefaultPaginatedHeader,
        Row = DefaultPaginatedListRow,
        title,
        baseUrl,
        activeId,
        keyExtractor = (data) => (data?._id ?? '') as string,
        onActive,
    } = props;

    useImperativeHandle(ref, () => ({}));

    const {
        data: itemList,
        loading: itemListLoading,
        refresh: refreshItemList,
    } = useRequest<Data[]>(baseUrl);

    return (
        <StyledPaginatedList>
            <Header title={title} refreshData={refreshItemList} />
            <div className="paginated-list-body">
                {itemList?.map(item => <Row
                    key={keyExtractor(item)}
                    data={item}
                    keyExtractor={keyExtractor}
                    activeId={activeId}
                    onActive={onActive}
                />)}
            </div>
        </StyledPaginatedList>
    );
});
