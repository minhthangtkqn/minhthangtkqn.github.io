import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams, useSubscribe } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { FlashcardCollection, REFRESH_FLASHCARD_COLLECTION_KEY } from "@/__lib__/model";
import { Empty } from "antd";
import { Loading } from "@/__lib__/general-component";

export const FlashcardCollectionDetailPanelInfo = {
    name: 'flashcard-collection-detail' as const,
};

const StyledFlashcardCollectionDetailContainer = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing);
    height: 100%;
    background-color: var(--contrast-primary);
    position: relative; // for loading positioning

    // centralize the empty indicator
    &:has(.empty-indicator) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .empty-indicator {
        margin: 0;
    }
`;

const StyledFlashcardCollectionDetail = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-sm);

    .title {
        font-size: var(--fs-xl);
        font-weight: bold;
    }

    .description {
        
    }
`;

export const FlashcardCollectionDetailPanel = () => {
    const { params } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);

    const {
        data: collectionData,
        loading: collectionLoading,
        refresh: refreshFlashcardCollection,
    } = useRequest<FlashcardCollection>(collectionId ? QueryApi.FlashcardCollection.item(collectionId) : undefined);
    useSubscribe(REFRESH_FLASHCARD_COLLECTION_KEY, refreshFlashcardCollection);

    return (
        <StyledFlashcardCollectionDetailContainer>
            {collectionLoading && <Loading />}
            {(collectionId && collectionData)
                ? <StyledFlashcardCollectionDetail>
                    <div className="title">{collectionData.title}</div>
                    <div className="description">{collectionData.description}</div>
                </StyledFlashcardCollectionDetail>
                : <Empty
                    className="empty-indicator"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            }
        </StyledFlashcardCollectionDetailContainer>
    );
};
