import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams, useSubscribe } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { FlashcardCollection, REFRESH_FLASHCARD_COLLECTION_KEY } from "@/__lib__/model";
import { Collapse, Empty } from "antd";
import { ComposePanel, Loading, TomCollapse } from "@/__lib__/general-component";
import { FlashCardBoard } from "./flash-card-board";

export const FlashcardCollectionDetailPanelInfo = {
    name: 'flashcard-collection-detail' as const,
};

const StyledFlashcardCollectionDetailContainer = styled.div`
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
                ? <ComposePanel>
                    <ComposePanel.Header title={collectionData.title} />
                    <ComposePanel.Body>
                        <TomCollapse
                            items={[
                                {
                                    key: 'collection-information',
                                    label: 'Collection Information',
                                    children: <div>{collectionData.description}</div>,
                                },
                                {
                                    key: 'flash-card-board',
                                    label: 'Flash card board',
                                    children: <FlashCardBoard collectionId={collectionId} />,
                                },
                            ]}
                            defaultActiveKey={[
                                'collection-information',
                                'flash-card-board',
                            ]}
                        />
                    </ComposePanel.Body>
                </ComposePanel>
                : <Empty
                    className="empty-indicator"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            }
        </StyledFlashcardCollectionDetailContainer>
    );
};
