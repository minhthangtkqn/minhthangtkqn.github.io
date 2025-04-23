import { mergeClass } from "@/util";
import styled from "styled-components";

const StyledPaginatedListRow = styled.div`
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

export type PaginatedListRow<Data extends Record<string, unknown>> = {
    data: Data;
    activeId?: string;
    onActive?: (id: string) => void;
    keyExtractor: (data: Data) => string;
};

export const DefaultPaginatedListRow = <Data extends Record<string, unknown>>(props: PaginatedListRow<Data>) => {
    const {
        data,
        activeId,
        onActive,
        keyExtractor,
    } = props;

    return <StyledPaginatedListRow
        key={keyExtractor(data)}
        className={mergeClass(
            'paginated-list-row',
            keyExtractor(data) === activeId ? 'paginated-list-row-active' : undefined,
        )}
        onClick={() => onActive?.(keyExtractor(data))}
    >
        {keyExtractor(data)}
    </StyledPaginatedListRow>;
};