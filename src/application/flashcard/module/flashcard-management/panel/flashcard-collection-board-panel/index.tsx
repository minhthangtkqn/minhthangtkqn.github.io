import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { Flashcard } from "@/__lib__/model";
import { Empty } from "antd";
import { Loading } from "@/__lib__/general-component";

export const FlashcardCollectionBoardPanelInfo = {
    name: 'flashcard-collection-board' as const,
};

const StyledFlashcardCollectionBoardContainer = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing);
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

export const FlashcardCollectionBoardPanel = () => {
    // const { params } = useSearchParams();
    // const collectionId = params.get(FlashcardApplicationParam.collectionId);

    const {
        data: collectionList,
        loading: collectionLoading,
    } = useRequest<Flashcard>(QueryApi.FlashcardCollection.list());

    return (
        <StyledFlashcardCollectionBoardContainer>
            {collectionLoading && <Loading />}
            {/* {collectionData
                ? <StyledFlashcardCollectionBoard>
                </StyledFlashcardCollectionBoard>
                : <Empty
                    className="empty-indicator"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            } */}
        </StyledFlashcardCollectionBoardContainer>
    );
};
