import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from 'react';

export type FlashcardFormModalRef = {
    open: () => void;
};
type Props = {};
export const FlashcardFormModal = forwardRef<FlashcardFormModalRef, Props>((
    {

    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        open: () => setVisible(true),
    }));

    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <Modal
            open={visible}
            onCancel={closeModal}
            maskClosable
        >FlashcardFormModal</Modal>
    );
});
