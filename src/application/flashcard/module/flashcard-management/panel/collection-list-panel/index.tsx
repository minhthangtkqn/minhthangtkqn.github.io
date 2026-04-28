import { CommandApi, QueryApi } from "@/access";
import { REFRESH_CURRENT_FLASHCARD, useSearchParams } from "@/util";
import { FlashcardApplicationParam } from "../../../../model";
import { FlashcardCollection } from "@/__lib__/model";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { FlashcardCollectionFormModal, FlashcardCollectionFormModalRef } from "./flashcard-collection-form-modal";
import { useRef } from "react";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";
import { ComposeHeader } from "@/__lib__/general-component";
import { PaginatedHeaderTitle, PaginatedList, PaginatedListRef } from "@/__lib__/paginated";

export const FlashcardCollectionListPanelInfo = {
    name: 'flashcard-collection-list' as const,
};

const StyledFlashcardCollectionList: typeof PaginatedList = styled(PaginatedList)`
    &.flashcard-collection {
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
    }
`;

export const FlashcardCollectionListPanel = () => {
    const { params, updateSearchParams } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);

    const paginatedListRef = useRef<PaginatedListRef>(null);
    const collectionFormModalRef = useRef<FlashcardCollectionFormModalRef>(null);

    const deleteItem = async (itemId: string) => {
        try {
            await CentralRequestor.delete(CommandApi.FlashcardCollection.removeItem(itemId));
            if (itemId === collectionId) {
                updateSearchParams(prev => {
                    prev.set(FlashcardApplicationParam.collectionId, '');
                    return prev;
                });
            }
            notification.success({
                message: 'Delete successfully!',
            });
            paginatedListRef.current?.refresh();
        } catch (error) {
            notification.error({
                message: 'Delete failed. Try again later!',
            });
            console.error('delete flashcard error', error);
        }
    };

    return (<>
        <FlashcardCollectionFormModal
            ref={collectionFormModalRef}
            onCloseModal={() => {
                paginatedListRef.current?.refresh();
                REFRESH_CURRENT_FLASHCARD();
            }}
        />

        <StyledFlashcardCollectionList<FlashcardCollection>
            ref={paginatedListRef}
            title="Collection"
            className="flashcard-collection"
            baseUrl={QueryApi.FlashcardCollection.list()}
            Header={(props) => <ComposeHeader>
                <PaginatedHeaderTitle {...props} />

                <ComposeHeader.HeaderItem right>
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => collectionFormModalRef.current?.open()}
                    >Add</Button>
                </ComposeHeader.HeaderItem>
            </ComposeHeader>}
            RowItem={({ data }) => {
                return <>
                    <div className="left-content truncate">
                        <div className="title">{data.title}</div>
                        <div className="description truncate">{data.description}</div>
                    </div>
                    <div
                        className="right-content"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => collectionFormModalRef.current?.open(data)}
                        />
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => Modal.confirm({
                                onOk: () => deleteItem(data._id),
                                title: 'Are you sure?',
                                content: 'This item will be deleted.'
                            })}
                        />
                    </div>
                </>;
            }}
            activeId={collectionId ?? ''}
            activeOnMount
            onActive={(id) => {
                updateSearchParams(prev => {
                    prev.set(FlashcardApplicationParam.collectionId, id);
                    return prev;
                });
            }}
        />
    </>);
};
