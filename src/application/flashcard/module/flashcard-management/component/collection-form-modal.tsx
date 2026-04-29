import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { FlashCardCollection } from "@/__lib__/model";
import { PublicModal } from "@/component";
import { Button, Form, FormInstance, FormProps, Input, notification } from "antd";
import styled from "styled-components";
import { CentralRequestor } from "@/__lib__/access";
import { CommandApi } from "@/access";

const StyledForm = styled(Form)`
    padding: var(--spacing-sm);

    .ant-form-item:last-child {
        margin-bottom: 0;
    }
`;

export type CollectionFormModalRef = {
    open: (openedCollection?: FlashCardCollection) => void;
};
type Props = {
    onCloseModal?: () => void;
};
export const CollectionFormModal = forwardRef<CollectionFormModalRef, Props>((
    {
        onCloseModal,
    },
    ref,
) => {
    useImperativeHandle(ref, () => ({
        open: (openedCollection?: FlashCardCollection) => {
            setVisible(true);
            setCollection(openedCollection);
            if (openedCollection) {
                formRef.current?.setFields(Object.entries(openedCollection).map(([key, value]) => ({
                    name: key,
                    value: value,
                })));
            } else {
                formRef.current?.resetFields();
            }
        },
    }));

    const formRef = useRef<FormInstance<FlashCardCollection>>(null);
    const [collection, setCollection] = useState<FlashCardCollection>();
    const [submitting, setSubmitting] = useState(false);
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        setVisible(false);
        setCollection(undefined);
        formRef.current?.resetFields();
        onCloseModal?.();
    };

    const handleSubmit: FormProps<FlashCardCollection>['onFinish'] = async (values) => {
        try {
            setSubmitting(true);
            if (collection) {
                await CentralRequestor.post<Record<string, unknown>>(
                    CommandApi.FlashcardCollection.updateItem(collection._id),
                    { data: values },
                );
            } else {
                await CentralRequestor.post<Record<string, unknown>>(
                    CommandApi.FlashcardCollection.addItem(),
                    { data: values },
                );
            }
            notification.success({
                message: 'Submit successfully!',
            });
            closeModal();
        } catch (error) {
            notification.error({
                message: 'Submit failed. Try again later!',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const isUpdateCollection = !!collection;

    return (
        <PublicModal
            open={visible}
            onCancel={closeModal}
            footer={null}
            maskClosable
            noPadding
            forceRender
            title={isUpdateCollection ? 'Update Collection' : 'Create Collection'}
        >
            <StyledForm
                ref={formRef}
                name="flashcard-collection-form"
                autoComplete="off"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                onFinish={handleSubmit}
            >
                <Form.Item<FlashCardCollection>
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: 'Please input flashcard title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FlashCardCollection>
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
                        loading={submitting}
                        disabled={submitting}
                    >{isUpdateCollection ? 'Save Changes' : 'Create'}</Button>
                </Form.Item>
            </StyledForm>
        </PublicModal>
    );
});
