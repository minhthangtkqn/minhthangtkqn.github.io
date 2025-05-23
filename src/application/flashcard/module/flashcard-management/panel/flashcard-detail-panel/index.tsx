import styled from "styled-components";
import { FlashcardApplicationParam } from "../../../../model";
import { useSearchParams, useSubscribe } from "@/util";
import { useRequest } from "@/__lib__/access";
import { QueryApi } from "@/access";
import { Flashcard, REFRESH_FLASHCARD_KEY } from "@/__lib__/model";
import { Empty } from "antd";
import { Loading } from "@/__lib__/general-component";

export const FlashcardDetailPanelInfo = {
    name: 'flashcard-detail' as const,
};

const StyledFlashcardDetailContainer = styled.div`
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

const StyledFlashcardDetail = styled.div`
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

export const FlashcardDetailPanel = () => {
    const { params } = useSearchParams();
    const flashcardId = params.get(FlashcardApplicationParam.flashcardId);

    const {
        data: flashcardData,
        loading: flashcardLoading,
        refresh: refreshFlashcardData,
    } = useRequest<Flashcard>(flashcardId ? QueryApi.Flashcard.item(flashcardId) : undefined);
    useSubscribe(REFRESH_FLASHCARD_KEY, refreshFlashcardData);

    return (
        <StyledFlashcardDetailContainer>
            {flashcardLoading && <Loading />}
            {flashcardId && flashcardData
                ? <StyledFlashcardDetail>
                    <div className="title">{flashcardData.title}</div>
                    <div className="description">{flashcardData.description}</div>
                </StyledFlashcardDetail>
                : <Empty
                    className="empty-indicator"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            }
        </StyledFlashcardDetailContainer>
    );
};
