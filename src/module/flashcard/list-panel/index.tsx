import { CommandApi, QueryApi } from "@/access";
import { useRequest } from "@/util";
import { FlashcardModuleParam } from "../model";
import { useSearchParams } from "react-router-dom";
import { Flashcard } from "@/__lib__/model";
import { DeleteOutlined, EditOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { FlashcardFormModal, FlashcardFormModalRef } from "./flashcard-form-modal";
import { useRef } from "react";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";

const StyledFlashcardListContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const StyledFlashcardList = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    .list-header {
        font-size: var(--fs-xl);
        font-weight: bold;
        text-transform: uppercase;
        background-color: var(--main-primary);
        color: var(--contrast-primary);
        padding: var(--spacing-sm);
        min-height: var(--min-height-header);
        display: flex;
        align-items: center;
        /* column-gap: var(--spacing-sm); */
        
        .list-header-title {
            display: flex;
            /* align-items: center; */
            column-gap: var(--spacing-sm);
            cursor: pointer;
        }
    }

    .list-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        row-gap: var(--spacing-sm);
        padding: var(--spacing-sm);
    }
`;

const StyledFlashcardItem = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing-sm);
    cursor: pointer;
    display: flex;

    &:hover {
        background-color: var(--main-primaryLighter);
    }

    &.selected-flashcard {
        background-color: var(--main-primaryLighter);
    }

    .left-content {
        flex: 1;

        .title {
            font-weight: var(--fw-5);
        }

        .description {
            font-size: var(--fs-sm);
            color: var(--main-tertiaryDarker);
        }
    }
`;

export const FlashcardListPanel = () => {
    const {
        data: flashcardList,
        loading: flashcardListLoading,
        refresh: refreshFlashcardList,
    } = useRequest<Flashcard[]>(QueryApi.Flashcard.list());
    const [params, updateSearchParams] = useSearchParams();
    const currentFlashcardId = params.get(FlashcardModuleParam.flashcardId);

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
            }}
        />

        <StyledFlashcardListContainer>
            <StyledFlashcardList>
                <div className="list-header">
                    <div className="list-header-title" onClick={() => refreshFlashcardList()}>
                        <div>Flashcard</div>
                        <SyncOutlined
                            className="reload-icon"
                            spin={flashcardListLoading}
                        />
                    </div>

                    <Button
                        size="small"
                        style={{ marginLeft: 'auto' }}
                        onClick={() => flashcardFormModalRef.current?.open()}
                    ><PlusOutlined /> New card</Button>
                </div>
                <div className="list-body">
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
        </StyledFlashcardListContainer>
    </>
    );
};
