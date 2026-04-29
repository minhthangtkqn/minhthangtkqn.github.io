import { ComposePanel, TomButton } from "@/__lib__/general-component";
import { FlashcardApplicationParam } from "@/application/flashcard/model";
import { useSearchParams } from "@/util";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const CollectionStudyPanelInfo = {
    name: 'collection-study' as const,
};

export const CollectionStudyPanel = () => {
    const { params, updateSearchParams } = useSearchParams();
    const collectionId = params.get(FlashcardApplicationParam.collectionId);

    // const {
    //     data: collectionList,
    //     refresh: refreshCollectionList,
    //     loading: collectionLoading,
    // } = useRequest<FlashCardCollection[]>(QueryApi.FlashcardCollection.list());

    return <ComposePanel>
        <ComposePanel.Header
            title={<>
                <TomButton icon={<ArrowLeftOutlined />}>Back</TomButton>
                <span>&nbsp;TITLE</span>
            </>}
        />

        <ComposePanel.Body>
            <div>BODY</div>
        </ComposePanel.Body>
    </ComposePanel>;
};
