import { CommandApi, QueryApi } from "@/access";
import { REFRESH_CURRENT_FLASHCARD, useSearchParams } from "@/util";
import { FlashcardApplicationParam } from "../model";
import { Flashcard } from "@/__lib__/model";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { FlashcardFormModal, FlashcardFormModalRef } from "./flashcard-form-modal";
import { useRef } from "react";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";
import { ComposeHeader } from "@/__lib__/general-component";
import { PaginatedHeaderTitle, PaginatedList, PaginatedListRef } from "@/__lib__/paginated";

const StyledFlashcardList: typeof PaginatedList = styled(PaginatedList)`
    &.flashcard-list {
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

export const FlashcardListPanel = () => {
    const { params, updateSearchParams } = useSearchParams();
    const currentFlashcardId = params.get(FlashcardApplicationParam.flashcardId);

    const paginatedListRef = useRef<PaginatedListRef>(null);
    const flashcardFormModalRef = useRef<FlashcardFormModalRef>(null);

    const deleteItem = async (itemId: string) => {
        try {
            await CentralRequestor.delete(CommandApi.Flashcard.removeItem(itemId));
            if (itemId === currentFlashcardId) {
                updateSearchParams(prev => {
                    prev.set(FlashcardApplicationParam.flashcardId, '');
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
        }
    };

    return (<>
        <FlashcardFormModal
            ref={flashcardFormModalRef}
            onCloseModal={() => {
                paginatedListRef.current?.refresh();
                REFRESH_CURRENT_FLASHCARD();
            }}
        />

        <StyledFlashcardList<Flashcard>
            ref={paginatedListRef}
            title="Flashcard"
            className="flashcard-list"
            baseUrl={QueryApi.Flashcard.list()}
            Header={(props) => <ComposeHeader>
                <PaginatedHeaderTitle {...props} />

                <ComposeHeader.HeaderItem right>
                    <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => flashcardFormModalRef.current?.open()}
                    >New card</Button>
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
                            onClick={() => flashcardFormModalRef.current?.open(data)}
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
            activeId={currentFlashcardId ?? ''}
            onActive={(id) => {
                updateSearchParams(prev => {
                    prev.set(FlashcardApplicationParam.flashcardId, id);
                    return prev;
                });
            }}
        />
    </>);
};
