import { useRequest } from "@/__lib__/access";
import { ComposePanel, TomButton } from "@/__lib__/general-component";
import { LayoutPanelSlot } from "@/__lib__/layout";
import { FlashCardCollection } from "@/__lib__/model";
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

    return <ComposePanel>
        <ComposePanel.Header
            title={<>
                <TomButton
                    icon={<ArrowLeftOutlined />}
                    onClick={() => {
                        updateSearchParams(prev => {
                            prev.set(LayoutPanelSlot.PRIMARY, CollectionListPanelInfo.name);
                            prev.set(LayoutPanelSlot.SECONDARY, CollectionDetailPanelInfo.name);
                            prev.delete(LayoutPanelSlot.EXTENSION);

                            if (collectionId) {
                                prev.set(FlashcardApplicationParam.collectionId, collectionId);
                            }

                            return prev;
                        });
                    }}
                >Back</TomButton>
                <span>&nbsp;TITLE</span>
            </>}
        />

        <ComposePanel.Body>
            <div>BODY</div>
        </ComposePanel.Body>
    </ComposePanel>;
};
