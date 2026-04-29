import { useRequest } from "@/__lib__/access";
import { ComposePanel, Loading, TomButton, TomEmpty } from "@/__lib__/general-component";
import { LayoutPanelSlot } from "@/__lib__/layout";
import { FlashCard, FlashCardCollection } from "@/__lib__/model";
import { QueryApi } from "@/access";
import { FlashcardApplicationParam } from "@/application/flashcard/model";
import { useSearchParams } from "@/util";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CollectionListPanelInfo, CollectionDetailPanelInfo } from "../info";

export const CollectionStudyPanel = () => {
    const { params, updateSearchParams } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);

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

    return <ComposePanel>
        <ComposePanel.Header
            title={<>
                <TomButton
                    icon={<ArrowLeftOutlined />}
                    onClick={handleBack}
                >Back</TomButton>
                <span>{collectionData?.title}</span>
            </>}
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
                : <div>STUDY CARD</div>}
        </ComposePanel.Body>
    </ComposePanel>;
};
