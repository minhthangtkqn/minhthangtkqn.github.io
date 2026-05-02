import { useRequest } from "@/__lib__/access";
import { ComposePanel, Loading, TomButton, TomEmpty } from "@/__lib__/general-component";
import { LayoutPanelSlot } from "@/__lib__/layout";
import { FlashCard, FlashCardCollection } from "@/__lib__/model";
import { QueryApi } from "@/access";
import { FlashcardApplicationParam } from "@/application/flashcard/model";
import { shuffle, useSearchParams } from "@/util";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CollectionListPanelInfo, CollectionDetailPanelInfo } from "../info";
import styled from "styled-components";
import { CardStudyContent } from "./card-study-content";
import { useEffect, useState } from "react";
import { Checkbox, Modal } from "antd";

const StyledCollectionStudyPanel = styled(ComposePanel)`
    .compose-panel-header {
        .ant-checkbox-wrapper {
            color: inherit;
        }
    }

    .compose-panel-body {
        padding: 0;
    }
`;

export const CollectionStudyPanel = () => {
    const { params, updateSearchParams } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);
    const [random, setRandom] = useState(false);
    const [pointer, setPointer] = useState(0);
    /**
     * List index của card được sắp xếp tùy theo mục đích học
     */
    const [organizedCardIndexList, setOrganizedCardIndexList] = useState<number[]>([]);

    const {
        data: collectionData,
        loading: collectionLoading,
        refresh: refreshCollection,
    } = useRequest<FlashCardCollection>(collectionId
        ? QueryApi.FlashcardCollection.item(collectionId)
        : undefined
    );

    const {
        data: flashCardList,
        loading: flashCardListLoading,
    } = useRequest<FlashCard[]>(collectionId
        ? QueryApi.Flashcard.list(collectionId)
        : undefined
    );

    useEffect(() => {
        if (!flashCardList || flashCardList.length === 0) {
            setOrganizedCardIndexList([]);
        } else {
            const indices = Array.from(flashCardList, (i, idx) => idx);
            setOrganizedCardIndexList(random
                ? shuffle(indices)
                : indices
            );
            setPointer(0);
        }
    }, [flashCardList, random]);

    const handleBack = () => {
        updateSearchParams(prev => {
            prev.set(LayoutPanelSlot.PRIMARY, CollectionListPanelInfo.name);
            prev.set(LayoutPanelSlot.SECONDARY, CollectionDetailPanelInfo.name);
            prev.delete(LayoutPanelSlot.EXTENSION);

            if (collectionId) {
                prev.set(FlashcardApplicationParam.collectionId, collectionId);
            }

            return prev;
        });
    };

    // Lấy Index thực tế dựa trên pointer
    const currentCardIndex = organizedCardIndexList[pointer] ?? 0;

    return <StyledCollectionStudyPanel>
        <ComposePanel.Header
            title={<>
                <TomButton
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                >Back</TomButton>
                <span>{collectionData?.title} {typeof flashCardList?.length === 'number' && flashCardList.length > 0
                    ? `(${pointer + 1}/${flashCardList.length})`
                    : ''}</span>
            </>}
            extra={<Checkbox
                checked={random}
                onChange={(e) => {
                    Modal.confirm({
                        title: 'Progress will be reset?',
                        onOk: () => setRandom(e.target.checked),
                    });
                }}
            >Random</Checkbox>}
        />

        <ComposePanel.Body>
            {flashCardListLoading && <Loading />}
            {!flashCardList?.length
                ? <TomEmpty
                    description={<>
                        <div>This collection is empty.</div>

                        <TomButton
                            icon={<ArrowLeftOutlined />}
                            type="link"
                            onClick={handleBack}
                        >Adding card at collection detail</TomButton>
                    </>}
                />
                : <CardStudyContent
                    cardList={flashCardList}
                    currentIndex={currentCardIndex}
                    onPrevCard={() => {
                        setPointer(p => (p - 1 + organizedCardIndexList.length) % organizedCardIndexList.length); // Quay ngược về cuối
                    }}
                    onNextCard={() => {
                        setPointer(p => (p + 1) % organizedCardIndexList.length); // Tự động quay vòng về 0
                    }}
                />
            }
        </ComposePanel.Body>
    </StyledCollectionStudyPanel>;
};
