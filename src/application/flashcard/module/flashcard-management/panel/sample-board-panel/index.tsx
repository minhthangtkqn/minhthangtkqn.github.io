import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { FlashCard, FlashCardCollection } from "@/__lib__/model";
import { Empty } from "antd";
import { ComposeHeader, ComposePanel, Loading } from "@/__lib__/general-component";
import { SyncOutlined } from "@ant-design/icons";

export const FlashcardCollectionListPanelInfo = {
    name: 'flashcard-collection-list' as const,
};

const StyledFlashcardCollectionListContainer = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    /* padding: var(--spacing); */
    overflow: hidden;
    height: 100%;
    background-color: var(--contrast-primary);
    position: relative; // for loading positioning

    // centralize the empty indicator
    &:has(.empty-indicator) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .empty-indicator {
        margin: 0;
    }
`;

const StyledFlashcardCollectionBoard = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-sm);

    .title {
        font-size: var(--fs-xl);
        font-weight: bold;
    }

    .description {
        
    }
`;

export const FlashcardCollectionListPanel = () => {
    // const { params } = useSearchParams();
    // const collectionId = params.get(FlashcardApplicationParam.collectionId);

    const {
        data: collectionList,
        refresh: refreshCollectionList,
        loading: collectionLoading,
    } = useRequest<FlashCardCollection[]>(QueryApi.FlashcardCollection.list());
    console.log('🚀 ~ FlashcardCollectionBoardPanel ~ collectionList:', collectionList);

    return (
        <StyledFlashcardCollectionListContainer>
            <ComposePanel>
                <ComposePanel.Header
                    title={<>
                        Collection <SyncOutlined onClick={refreshCollectionList} spin={collectionLoading} style={{ cursor: 'pointer' }} />
                    </>}
                />
                <ComposePanel.Body>
                    {collectionLoading && <Loading />}
                    {(collectionList?.length ?? 0) > 0
                        ? <StyledFlashcardCollectionBoard>
                        </StyledFlashcardCollectionBoard>
                        : <Empty
                            className="empty-indicator"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    }
                </ComposePanel.Body>
            </ComposePanel>
        </StyledFlashcardCollectionListContainer>
    );
};
