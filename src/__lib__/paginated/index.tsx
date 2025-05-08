import { forwardRef, useImperativeHandle, useState } from 'react';
import styled from "styled-components";
import { useRequest } from "@/__lib__/access";
import { DefaultPaginatedHeader, PaginatedHeader } from "./header";
import { DefaultPaginatedListRowContainer, PaginatedListRowContainer } from "./list-row";
import { DefaultPaginatedListRowItem, PaginatedListRowItem } from "./list-row-item";
import { Loading } from "@/__lib__/general-component";

/**
 * Ref override để giúp `forwardRef` nhận generic type
 */
declare module 'react' {
    function forwardRef<T, P = Record<string, unknown>>(
        render: (props: P, ref: ForwardedRef<T>) => React.ReactElement | null,
    ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const StyledPaginatedList = styled.div`
    height: 100%;
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
        position: relative; // for loading positioning
    }
`;

type PaginatedList<Data extends Record<string, unknown>> = {
    Header?: React.ComponentType<PaginatedHeader>;
    RowContainer?: React.ComponentType<PaginatedListRowContainer<Data>>;
    RowItem?: React.ComponentType<PaginatedListRowItem<Data>>;
    title?: string;
    baseUrl?: string;
    activeId?: string;
    activeOnMount?: boolean;
    onActive?: (id: string) => void;
    keyExtractor?: (data: Data) => string;
} & Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>;
export type PaginatedListRef = {
    refresh: () => void;
};
export const PaginatedList = forwardRef(function BasePaginatedList<Data extends Record<string, unknown>>(
    props: PaginatedList<Data>,
    ref: React.ForwardedRef<PaginatedListRef>,
) {
    const {
        Header = DefaultPaginatedHeader,
        RowContainer = DefaultPaginatedListRowContainer,
        RowItem = DefaultPaginatedListRowItem,
        title,
        baseUrl,
        activeId,
        activeOnMount = false,
        keyExtractor = (data) => (data?._id ?? '') as string,
        onActive,
        className,
    } = props;

    const [activeOnMountDone, setActiveOnMountDone] = useState(false);

    useImperativeHandle(ref, () => ({
        refresh: () => refreshItemList(),
    }));

    const {
        data: itemList,
        loading: itemListLoading,
        refresh: refreshItemList,
    } = useRequest<Data[]>(
        baseUrl,
        {
            onSuccess: (data) => {
                if (activeOnMount && !activeOnMountDone) {
                    setActiveOnMountDone(true);
                    if (data.length > 0) {
                        onActive?.(keyExtractor(data[0]));
                    }
                }
            },
        },
    );

    return (
        <StyledPaginatedList className={className}>
            <Header title={title} refreshData={refreshItemList} loading={itemListLoading} />
            <div className="paginated-list-body">
                {itemListLoading && <Loading />}
                {itemList?.map(item => <RowContainer
                    key={keyExtractor(item)}
                    data={item}
                    keyExtractor={keyExtractor}
                    activeId={activeId}
                    onActive={onActive}
                    RowItem={RowItem}
                />)}
            </div>
        </StyledPaginatedList>
    );
});

export { DefaultPaginatedHeader } from './header';
export { PaginatedHeaderTitle } from './header-title';
export {
    DefaultPaginatedListRowContainer,
    StyledPaginatedListRowContainer,
    type PaginatedListRowContainer,
} from './list-row';
