import { Flashcard } from "@/__lib__/model";
import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export type FlashcardFormModalRef = {
    open: (openedFlashcard?: Flashcard) => void;
};
type Props = {};
export const FlashcardFormModal = forwardRef<FlashcardFormModalRef, Props>((
    { },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        open: (openedFlashcard?: Flashcard) => {
            setVisible(true);
            setFlashcard(openedFlashcard);
        },
    }));

    const [flashcard, setFlashcard] = useState<Flashcard>();
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
        setFlashcard(undefined);
    };

    return (
        <Modal
            open={visible}
            onCancel={closeModal}
            footer={null}
            maskClosable
        >
            <div className="modal-header"></div>
            <div></div>
        </Modal>
    );
});
