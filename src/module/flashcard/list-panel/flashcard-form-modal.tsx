import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Flashcard } from "@/__lib__/model";
import { PublicModal } from "@/component";
import { Button, Form, FormInstance, FormProps, Input, notification } from "antd";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";
import { CommandApi } from "@/access";
import { data } from "react-router-dom";

const StyledForm = styled(Form)`
    padding: var(--spacing-sm);

    .ant-form-item:last-child {
        margin-bottom: 0;
    }
`;

export type FlashcardFormModalRef = {
    open: (openedFlashcard?: Flashcard) => void;
};
type Props = {
    onCloseModal?: () => void;
};
export const FlashcardFormModal = forwardRef<FlashcardFormModalRef, Props>((
    {
        onCloseModal,
    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        open: (openedFlashcard?: Flashcard) => {
            setVisible(true);
            setFlashcard(openedFlashcard);
        },
    }));

    const formRef = useRef<FormInstance<Flashcard>>(null);
    const [flashcard, setFlashcard] = useState<Flashcard>();
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
        setFlashcard(undefined);
        formRef.current?.resetFields();
        onCloseModal?.();
    };

    const handleSubmit: FormProps<Flashcard>['onFinish'] = async (values) => {
        try {
            if (flashcard) {
                await CentralRequestor.post<Record<string, unknown>>(
                    CommandApi.Flashcard.updateItem(flashcard._id),
                    { data: values },
                    { method: 'UPDATE' },
                );
            } else {
                await CentralRequestor.post<Record<string, unknown>>(
                    CommandApi.Flashcard.addItem(),
                    { data: values },
                );
            }
            closeModal();
            notification.success({
                message: 'Submit successfully!',
            });
        } catch (error) {
            notification.error({
                message: 'Submit failed. Try again later!',
            });
        }
    };

    return (
        <PublicModal
            open={visible}
            onCancel={closeModal}
            footer={null}
            maskClosable
            noPadding
        >
            <StyledForm
                ref={formRef}
                name="flashcard-form"
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={flashcard}
                onFinish={handleSubmit}
            >
                <Form.Item<Flashcard>
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input flashcard title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<Flashcard>
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input flashcard description!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={null}
                    wrapperCol={{ offset: 6, span: 18 }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                    >Submit</Button>
                </Form.Item>
            </StyledForm>
        </PublicModal>
    );
});
