import { mergeClass } from "@/util";
import styled from "styled-components";
import { DefaultPaginatedListRowItem, PaginatedListRowItem } from "./list-row-item";

export const StyledPaginatedListRowContainer = styled.div`
    border-top: var(--bd);
    border-bottom: var(--bd);
    padding: var(--spacing-sm) var(--spacing);
    margin-bottom: -1px;
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: var(--main-hovered);
    }

    &.paginated-list-row {
        
    }

    &.paginated-list-row-active {
        background-color: var(--main-activated);
    }
`;

export type PaginatedListRowContainer<Data extends Record<string, unknown>> = PaginatedListRowItem<Data> & {
    RowItem?: React.ComponentType<PaginatedListRowItem<Data>>;
};

/**
 * Component đảm nhiệm các behavior như click, active ... của row.
 * @props `RowItem` Component hiển thị UI của row.
 */
export const DefaultPaginatedListRowContainer = <Data extends Record<string, unknown>>(props: PaginatedListRowContainer<Data>) => {
    const {
        data,
        activeId,
        onActive,
        keyExtractor,
        RowItem = DefaultPaginatedListRowItem,
    } = props;

    return <StyledPaginatedListRowContainer
        key={keyExtractor(data)}
        className={mergeClass(
            'paginated-list-row',
            keyExtractor(data) === activeId ? 'paginated-list-row-active' : undefined,
        )}
        onClick={() => onActive?.(keyExtractor(data))}
    >
        <RowItem {...props} />
    </StyledPaginatedListRowContainer>;
};
