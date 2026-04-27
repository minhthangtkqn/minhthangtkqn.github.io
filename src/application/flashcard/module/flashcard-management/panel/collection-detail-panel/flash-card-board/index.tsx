import { useRequest } from "@/__lib__/access";
import { Flashcard } from "@/__lib__/model";
import { QueryApi } from "@/access";
import { DeleteOutlined, EditOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Modal, Space } from "antd";
import React, { useRef } from 'react';
import styled from "styled-components";
import { FlashcardFormModalRef } from "../../flashcard-list-panel/flashcard-form-modal";

const FlashCardBoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(100px, auto);
    row-gap: var(--spacing-sm);
    column-gap: var(--spacing-sm);

    .flash-card-item {
        flex: 1;   
    }
`;

export const FlashCardBoard = ({
    collectionId,
}: {
    collectionId: string,
}) => {
    // const {
    //     data: flashCardList,
    //     loading: flashCardListLoading,
    //     refresh: refreshFlashCardList,
    // } = useRequest<Flashcard>(collectionId
    //     ? QueryApi.FlashcardCollection.flashCard.list(collectionId)
    //     : undefined
    // );

    const flashcardFormModalRef = useRef<FlashcardFormModalRef>(null);

    return (
        <FlashCardBoardContainer>
            {/* {flashCardList.map()} */}
            <Card
                size="small"
                title="Small size card"
                extra={<Space>
                    <Button
                        type="link"
                        size="small"
                        icon={<EditOutlined />}
                    // onClick={() => flashcardFormModalRef.current?.open(data)}
                    />
                    <Button
                        type="link"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={() => Modal.confirm({
                            // onOk: () => deleteItem(data._id),
                            title: 'Are you sure?',
                            content: 'This item will be deleted.'
                        })}
                    />
                </Space>}
            // style={{ width: 300 }}
            >
                <div></div>
                <Button
                    icon={<RetweetOutlined />}
                    type="dashed"
                >View { }</Button>
            </Card>
        </FlashCardBoardContainer>
    );
};
