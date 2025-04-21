import { CommandApi, QueryApi } from "@/access";
import { REFRESH_CURRENT_FLASHCARD, useRequest, useSearchParams } from "@/util";
import { FlashcardModuleParam } from "../model";
import { Flashcard } from "@/__lib__/model";
import { DeleteOutlined, EditOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { FlashcardFormModal, FlashcardFormModalRef } from "./flashcard-form-modal";
import { useRef } from "react";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";
import { ComposeHeader } from "@/component";
import { PaginatedListRef } from "@/component/paginated";

const StyledFlashcardList = styled.div`
    flex: 1;
    border: var(--bd);
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    background-color: var(--contrast-primary);

    .paginated-list-header-title {
        display: flex;
        column-gap: var(--spacing-sm);
        cursor: pointer;
    }

    .paginated-list-body {
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

export const FlashcardListPanel = () => {
    const {
        data: flashcardList,
        loading: flashcardListLoading,
        refresh: refreshFlashcardList,
    } = useRequest<Flashcard[]>(QueryApi.Flashcard.list());
    const { params, updateSearchParams } = useSearchParams();
    const currentFlashcardId = params.get(FlashcardModuleParam.flashcardId);

    const paginatedListRef = useRef<PaginatedListRef>(null);
    const flashcardFormModalRef = useRef<FlashcardFormModalRef>(null);

    const deleteItem = async (itemId: string) => {
        try {
            await CentralRequestor.delete(CommandApi.Flashcard.removeItem(itemId));
            if (itemId === currentFlashcardId) {
                updateSearchParams(prev => {
                    prev.set(FlashcardModuleParam.flashcardId, '');
                    return prev;
                });
            }
            notification.success({
                message: 'Delete successfully!',
            });
            refreshFlashcardList();
        } catch (error) {
            notification.error({
                message: 'Delete failed. Try again later!',
            });
        }
    };

    return (<>
        <FlashcardFormModal
            ref={flashcardFormModalRef}
            onCloseModal={() => {
                refreshFlashcardList();
                REFRESH_CURRENT_FLASHCARD();
            }}
        />

        {/* <PaginatedList<Flashcard>
            ref={paginatedListRef}
            title="Flashcard"
            baseUrl={QueryApi.Flashcard.list()}
        /> */}

        <StyledFlashcardList>
            <ComposeHeader>
                <ComposeHeader.HeaderItem span>
                    <div className="paginated-list-header-title" onClick={() => refreshFlashcardList()}>
                        <div>Flashcard</div>
                        <SyncOutlined
                            className="reload-icon"
                            spin={flashcardListLoading}
                        />
                    </div>
                </ComposeHeader.HeaderItem>

                <ComposeHeader.HeaderItem right>
                    <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => flashcardFormModalRef.current?.open()}
                    >New card</Button>
                </ComposeHeader.HeaderItem>
            </ComposeHeader>
            <div className="paginated-list-body">
                {flashcardList?.map(item => <StyledFlashcardItem
                    key={item._id}
                    className={item._id === currentFlashcardId ? 'selected-flashcard' : undefined}
                    onClick={() => {
                        updateSearchParams(prev => {
                            prev.set(FlashcardModuleParam.flashcardId, item._id);
                            return prev;
                        });
                    }}
                >
                    <div className="left-content truncate">
                        <div className="title">{item.title}</div>
                        <div className="description truncate">{item.description}</div>
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
                            onClick={() => flashcardFormModalRef.current?.open(item)}
                        />
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => Modal.confirm({
                                onOk: () => deleteItem(item._id),
                                title: 'Are you sure?',
                                content: 'This item will be deleted.'
                            })}
                        />
                    </div>
                </StyledFlashcardItem>)}
            </div>
        </StyledFlashcardList>
    </>);
};
