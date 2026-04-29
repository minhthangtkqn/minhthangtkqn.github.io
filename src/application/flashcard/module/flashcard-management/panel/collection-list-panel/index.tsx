import { CommandApi, QueryApi } from "@/access";
import { REFRESH_CURRENT_FLASHCARD, useSearchParams } from "@/util";
import { FlashcardApplicationParam } from "../../../../model";
import { FlashCardCollection } from "@/__lib__/model";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, notification } from "antd";
import { CollectionFormModal, CollectionFormModalRef } from "../../component";
import { useRef } from "react";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";
import { ComposeHeader, TomButton } from "@/__lib__/general-component";
import { PaginatedHeaderTitle, PaginatedList, PaginatedListRef } from "@/__lib__/paginated";

const StyledCollectionList: typeof PaginatedList = styled(PaginatedList)`
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

export const CollectionListPanel = () => {
    const { params, updateSearchParams } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);

    const paginatedListRef = useRef<PaginatedListRef>(null);
    const collectionFormModalRef = useRef<CollectionFormModalRef>(null);

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
            console.error('Delete error', error);
        }
    };

    return (<>
        <CollectionFormModal
            ref={collectionFormModalRef}
            onCloseModal={() => {
                paginatedListRef.current?.refresh();
                REFRESH_CURRENT_FLASHCARD();
            }}
        />

        <StyledCollectionList<FlashCardCollection>
            ref={paginatedListRef}
            title="Collection"
            className="flashcard-collection"
            baseUrl={QueryApi.FlashcardCollection.list()}
            Header={(props) => <ComposeHeader>
                <PaginatedHeaderTitle {...props} />

                <ComposeHeader.HeaderItem right>
                    <TomButton
                        icon={<PlusOutlined />}
                        onClick={() => collectionFormModalRef.current?.open()}
                    >Add</TomButton>
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
                        <TomButton
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => collectionFormModalRef.current?.open(data)}
                        />
                        <TomButton
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
            activeId={collectionId ?? undefined}
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
