import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams, useSubscribe } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { FlashcardCollection, REFRESH_FLASHCARD_COLLECTION_KEY } from "@/__lib__/model";
import { Button, Empty } from "antd";
import { ComposePanel, Loading, TomCollapse } from "@/__lib__/general-component";
import { FlashCardBoard, FlashCardBoardRef } from "./flash-card-board";
import { BookOutlined, PlusOutlined } from "@ant-design/icons";
import { FlashcardFormModal, FlashcardFormModalRef } from "../../component";
import { useRef } from "react";

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

    const flashcardFormModalRef = useRef<FlashcardFormModalRef>(null);
    const flashCardBoardRef = useRef<FlashCardBoardRef>(null);

    return (
        <StyledFlashcardCollectionDetailContainer>
            {collectionLoading && <Loading />}
            {(collectionId && collectionData)
                ? <ComposePanel>
                    <ComposePanel.Header
                        title={collectionData.title}
                        extra={<Button icon={<BookOutlined />}>Learn</Button>}
                        type="secondary"
                    />
                    <ComposePanel.Body>
                        <FlashcardFormModal
                            ref={flashcardFormModalRef}
                            collectionId={collectionId}
                            onCloseModal={(submitted) => {
                                if (submitted) {
                                    flashCardBoardRef.current?.refreshList();
                                }
                            }}
                        />

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
                                    children: <FlashCardBoard
                                        ref={flashCardBoardRef}
                                        collectionId={collectionId}
                                    />,
                                    extra: <Button
                                        icon={<PlusOutlined />}
                                        size="small"
                                        type="link"
                                        onClick={(e) => {
                                            flashcardFormModalRef.current?.open();
                                            e.stopPropagation();
                                        }}
                                    >Add card</Button>,
                                    showArrow: false,
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
