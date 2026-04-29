import { ComposePanel } from "@/__lib__/general-component";

export const SamplePanelInfo = {
    name: 'sample' as const,
};

export const SamplePanel = () => {
    // const { params } = useSearchParams();
    // const collectionId = params.get(FlashcardApplicationParam.collectionId);

    // const {
    //     data: collectionList,
    //     refresh: refreshCollectionList,
    //     loading: collectionLoading,
    // } = useRequest<FlashCardCollection[]>(QueryApi.FlashcardCollection.list());

    return <ComposePanel>
        <ComposePanel.Header
            title="TITLE"
        />

        <ComposePanel.Body>
            <div>BODY</div>
        </ComposePanel.Body>
    </ComposePanel>;
};
