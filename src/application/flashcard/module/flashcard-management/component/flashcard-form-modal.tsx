import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FlashCard } from "@/__lib__/model";
import { PublicModal } from "@/component";
import { Button, Form, FormInstance, FormProps, Input, notification, Select } from "antd";
import { CentralRequestor } from "@/__lib__/access";
import { CommandApi } from "@/access";
import { BaseForm } from "@/__lib__/form";

export type FlashcardFormModalRef = {
    open: (openedFlashcard?: FlashCard) => void;
};
type Props = {
    collectionId: string,
    onCloseModal?: (submitted?: boolean) => void;
};
export const FlashcardFormModal = forwardRef<FlashcardFormModalRef, Props>((
    {
        collectionId,
        onCloseModal,
    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        open: (openedFlashcard?: FlashCard) => {
            setVisible(true);
            setFlashCard(openedFlashcard);
            if (openedFlashcard) {
                formRef.current?.setFields(Object.entries(openedFlashcard).map(([key, value]) => ({
                    name: key,
                    value: value,
                })));
            } else {
                formRef.current?.resetFields();
            }
        },
    }));

    const formRef = useRef<FormInstance<FlashCard>>(null);
    const [flashCard, setFlashCard] = useState<FlashCard>();
    const [submitting, setSubmitting] = useState(false);
    const [visible, setVisible] = useState(false);

    const closeModal = (submitted?: boolean) => {
        setVisible(false);
        setFlashCard(undefined);
        formRef.current?.resetFields();
        onCloseModal?.(submitted);
    };

    const handleSubmit: FormProps<FlashCard>['onFinish'] = async (values) => {
        const payload = {
            ...values,
            collection_id: collectionId,
        };
        try {
            setSubmitting(true);
            if (flashCard) {
                await CentralRequestor.post<Record<string, unknown>>(
                    CommandApi.Flashcard.updateItem(flashCard._id),
                    { data: payload },
                );
            } else {
                await CentralRequestor.post<Record<string, unknown>>(
                    CommandApi.Flashcard.addItem(),
                    { data: payload },
                );
            }
            notification.success({
                message: 'Submit successfully!',
            });
            closeModal(true);
        } catch (error) {
            notification.error({
                message: 'Submit failed. Try again later!',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const isUpdateFlashCard = !!flashCard;

    return (
        <PublicModal
            open={visible}
            onCancel={() => closeModal()}
            footer={null}
            maskClosable
            noPadding
            forceRender
            title={isUpdateFlashCard ? 'Update Flash Card' : 'Create Flash Card'}
            destroyOnClose
        >
            <BaseForm
                ref={formRef}
                // name="flashcard-form"
                autoComplete="off"
                onFinish={handleSubmit}
            >
                <Form.Item<FlashCard>
                    name="front_type"
                    label="Front Type"
                    rules={[{ required: true, message: 'Please input flashcard FRONT type!' }]}
                >
                    <Select
                        allowClear
                        placeholder="Select type of card side"
                        options={[
                            { label: 'Image Url', value: 'IMAGE_URL' },
                            { label: 'Text', value: 'TEXT' },
                        ]}
                    />
                </Form.Item>
                <Form.Item<FlashCard>
                    name="front_value"
                    label="Front value"
                    rules={[{ required: true, message: 'Please input flashcard FRONT value!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FlashCard>
                    name="back_type"
                    label="Back Type"
                    rules={[{ required: true, message: 'Please input flashcard BACK type!' }]}
                >
                    <Select
                        allowClear
                        placeholder="Select type of card side"
                        options={[
                            { label: 'Image Url', value: 'IMAGE_URL' },
                            { label: 'Text', value: 'TEXT' },
                        ]}
                    />
                </Form.Item>
                <Form.Item<FlashCard>
                    name="back_value"
                    label="Back Value"
                    rules={[{ required: true, message: 'Please input flashcard BACK value!' }]}
                >
                    <Input />
                </Form.Item>

                <div className="base-form-footer">
                    <Button onClick={() => closeModal()}>Dismiss</Button>
                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                            disabled={submitting}
                        >{isUpdateFlashCard ? 'Save Changes' : 'Create'}</Button>
                    </Form.Item>
                </div>
            </BaseForm>
        </PublicModal>
    );
});
