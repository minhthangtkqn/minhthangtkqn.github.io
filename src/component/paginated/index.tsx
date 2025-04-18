import { forwardRef, useImperativeHandle } from 'react';
import styled from "styled-components";
import { ComposeHeader } from "../compose-header";
import { SyncOutlined } from "@ant-design/icons";
import { useRequest } from "@/util";
import { DefaultPaginatedHeader, PaginatedHeader } from "./header";

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

const StyledFlashcardItem = styled.div`
    border-top: var(--bd);
    border-bottom: var(--bd);
    padding: var(--spacing-sm) var(--spacing);
    margin-bottom: -1px;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: var(--main-hovered);
    }

    &.selected-flashcard {
        background-color: var(--main-activated);
    }

    .left-content {
        flex: 1;

        .title {
            font-weight: var(--fw-5);
        }

        .description {
            font-size: var(--fs-sm);
            color: var(--main-grey);
        }
    }
`;

type PaginatedList<Data extends Record<string, unknown>> = {
    Header?: React.ComponentType<PaginatedHeader>;
    title?: string;
    baseUrl?: string;
    keyExtractor?: (data: Data) => string;
};
export type PaginatedListRef = {};
export const PaginatedList = forwardRef(function BasePaginatedList<Data extends Record<string, unknown>>(
    props: PaginatedList<Data>,
    ref: React.ForwardedRef<PaginatedListRef>,
) {
    const {
        Header = DefaultPaginatedHeader,
        title,
        baseUrl,
        keyExtractor = (data) => data?._id,
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
            </div>
        </StyledPaginatedList>
    );
});
