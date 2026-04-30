import { CentralRequestor, useRequest } from "@/__lib__/access";
import { FlashCard } from "@/__lib__/model";
import { CommandApi, QueryApi } from "@/access";
import styled from "styled-components";
import { Loading, TomEmpty } from "@/__lib__/general-component";
import { FlashCardBoardItem } from "./item";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { FlashcardFormModal, FlashcardFormModalRef } from "../flashcard-form-modal";
import { notification } from "antd";

const FlashCardBoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing);

    .flash-card-item {
        width: 100%;
    }
`;

export type FlashCardBoardRef = {
    refreshList: () => void;
};
type FlashCardBoard = {
    collectionId: string,
    onQuerySuccess?: (cardAmount: number | undefined) => void,
};
export const FlashCardBoard = forwardRef<FlashCardBoardRef, FlashCardBoard>((
    {
        collectionId,
        onQuerySuccess,
    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        refreshList: refreshFlashCardList,
    }));

    const flashcardFormModalRef = useRef<FlashcardFormModalRef>(null);

    const {
        data: flashCardList,
        loading: flashCardListLoading,
        refresh: refreshFlashCardList,
        queryCount,
    } = useRequest<FlashCard[]>(collectionId
        ? QueryApi.Flashcard.list(collectionId)
        : undefined
    );

    useEffect(() => {
        if (queryCount > 0) {
            onQuerySuccess?.(flashCardList?.length);
        }
    }, [queryCount, flashCardList]);

    const deleteCard = async (cardId: string) => {
        try {
            await CentralRequestor.delete(CommandApi.Flashcard.removeItem(cardId));
            notification.success({
                message: 'Delete successfully!',
            });
            refreshFlashCardList();
        } catch (error) {
            notification.error({
                message: 'Delete failed. Try again later!',
            });
            console.error('delete error', error);
        }
    };

    return <>
        <FlashcardFormModal
            ref={flashcardFormModalRef}
            collectionId={collectionId}
            onCloseModal={(submitted) => {
                if (submitted) {
                    refreshFlashCardList();
                }
            }}
        />

        <FlashCardBoardContainer className="flash-card-board">
            {flashCardListLoading && <Loading />}
            {(flashCardList?.length ?? 0) > 0
                ? flashCardList?.map((item, index) => <FlashCardBoardItem
                    key={item._id}
                    data={item}
                    index={index}
                    onChangeCard={() => flashcardFormModalRef.current?.open(item)}
                    onDeleteCard={() => deleteCard(item._id)}
                />)
                : <TomEmpty />
            }
        </FlashCardBoardContainer>
    </>;
});

export { FlashCardSideContent } from './item';
