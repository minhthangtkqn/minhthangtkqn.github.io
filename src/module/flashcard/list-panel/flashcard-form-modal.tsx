import { forwardRef, useImperativeHandle, useState } from 'react';
import { Flashcard } from "@/__lib__/model";
import { PublicModal } from "@/component";

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
        <PublicModal
            open={visible}
            onCancel={closeModal}
            footer={null}
            maskClosable
            noPadding
        >
            <div>Modal content</div>
        </PublicModal>
    );
});
