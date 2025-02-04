import { forwardRef, useImperativeHandle } from 'react';
import styled from "styled-components";
import { ComposeHeader } from "../compose-header";
import { SyncOutlined } from "@ant-design/icons";

const StyledPaginatedList = styled.div`
    /* flex: 1; */
    border: var(--bd);
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--contrast-primary);

    .paginated-list-header {
        font-size: var(--fs-xl);
        font-weight: bold;
        text-transform: uppercase;
        background-color: var(--main-primary);
        color: var(--contrast-primary);
        padding: var(--spacing-sm);
        min-height: var(--min-height-header);
        display: flex;
        align-items: center;
        column-gap: var(--spacing-sm);
        overflow-x: hidden;

        .paginated-list-header-title {
            display: flex;
            column-gap: var(--spacing-xs);
            cursor: pointer;
        }
    }

    .list-body {
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

type PaginatedListHeader = {};
type PaginatedList<Data extends Record<string, unknown>> = {
    Header?: React.ComponentType<PaginatedListHeader>;
    title?: string;
    keyExtractor?: (data: Data) => string;
};
type PaginatedListRef = {};
export function PaginatedList<Data extends Record<string, unknown>>(
    props: PaginatedList<Data>,
    ref: React.ForwardedRef<PaginatedListRef>,
) {
    const {
        Header,
        title,
    } = props;

    useImperativeHandle(ref, () => ({}));

    return (
        <StyledPaginatedList>
            {Header
                ? <Header />
                :
                <ComposeHeader>
                </ComposeHeader>
            }
        </StyledPaginatedList>
    );
};
