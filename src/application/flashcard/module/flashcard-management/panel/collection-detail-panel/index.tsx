import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams, useSubscribe } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { FlashCardCollection, REFRESH_CURRENT_COLLECTION_KEY } from "@/__lib__/model";
import { ComposePanel, Loading, TomButton, TomCollapse, TomDropdown, TomEmpty } from "@/__lib__/general-component";
import { FlashCardBoard, FlashCardBoardRef } from "./flash-card-board";
import { BookOutlined, DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { FlashcardFormModal, FlashcardFormModalRef } from "../../component";
import { useRef } from "react";
import { LayoutPanelSlot } from "@/__lib__/layout";
import { CollectionStudyPanelInfo } from "../collection-study-panel";
import { Space } from "antd";

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
    const { params, updateSearchParams } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);

    const {
        data: collectionData,
        loading: collectionLoading,
        refresh: refreshCollection,
    } = useRequest<FlashCardCollection>(collectionId
        ? QueryApi.FlashcardCollection.item(collectionId)
        : undefined
    );
    useSubscribe(REFRESH_CURRENT_COLLECTION_KEY, refreshCollection);

    const flashcardFormModalRef = useRef<FlashcardFormModalRef>(null);
    const flashCardBoardRef = useRef<FlashCardBoardRef>(null);

    const studyCard = () => {
        if (collectionId) {
            updateSearchParams(prev => {
                prev.set(LayoutPanelSlot.PRIMARY, CollectionStudyPanelInfo.name);
                prev.delete(LayoutPanelSlot.SECONDARY);
                prev.delete(LayoutPanelSlot.EXTENSION);

                prev.set(FlashcardApplicationParam.collectionId, collectionId);

                return prev;
            });
        }
    };

    return (
        <StyledFlashcardCollectionDetailContainer>
            {collectionLoading && <Loading />}
            {(collectionId && collectionData)
                ? <ComposePanel>
                    <ComposePanel.Header
                        title={collectionData.title}
                        extra={<Space>
                            <TomButton
                                icon={<BookOutlined />}
                                onClick={studyCard}
                            >Study</TomButton>

                            <TomDropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'edit',
                                            label: 'Edit',
                                            icon: <EditOutlined />,
                                            onClick: () => { },
                                        },
                                        {
                                            key: 'delete',
                                            label: 'Delete',
                                            icon: <DeleteOutlined />,
                                            danger: true,
                                            onClick: () => { },
                                        },
                                    ],
                                }}
                                trigger={['click']}
                            >
                                <TomButton
                                    icon={<MoreOutlined />}
                                    onClick={() => { }}
                                />
                            </TomDropdown>
                        </Space>
                        }
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
                                    label: 'Card board',
                                    children: <FlashCardBoard
                                        ref={flashCardBoardRef}
                                        collectionId={collectionId}
                                    />,
                                    extra: <TomButton
                                        icon={<PlusOutlined />}
                                        size="small"
                                        type="link"
                                        onClick={(e) => {
                                            flashcardFormModalRef.current?.open();
                                            e.stopPropagation();
                                        }}
                                    >Add card</TomButton>,
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
                : <TomEmpty
                    className="empty-indicator"
                />
            }
        </StyledFlashcardCollectionDetailContainer>
    );
};
