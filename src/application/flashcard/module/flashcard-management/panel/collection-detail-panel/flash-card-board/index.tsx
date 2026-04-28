import { useRequest } from "@/__lib__/access";
import { Flashcard } from "@/__lib__/model";
import { QueryApi } from "@/access";
import styled from "styled-components";
import { Loading } from "@/__lib__/general-component";
import { FlashCardBoardItem } from "./item";
import { forwardRef, useImperativeHandle } from "react";

const FlashCardBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-sm);

    .flash-card-item {
        width: 100%;
    }
`;

export type FlashCardBoardRef = {
    refreshList: () => void;
};
export const FlashCardBoard = forwardRef<
    FlashCardBoardRef,
    {
        collectionId: string,
    }
>((
    {
        collectionId,
    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        refreshList: refreshFlashCardList,
    }));

    const {
        data: flashCardList,
        loading: flashCardListLoading,
        refresh: refreshFlashCardList,
    } = useRequest<Flashcard[]>(collectionId
        ? QueryApi.Flashcard.list(collectionId)
        : undefined
    );

    return (
        <FlashCardBoardContainer>
            {flashCardListLoading && <Loading />}
            {flashCardList?.map((item, index) => <FlashCardBoardItem
                key={item._id}
                data={item}
                index={index}
            />)}
        </FlashCardBoardContainer>
    );
});
