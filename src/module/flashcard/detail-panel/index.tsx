import styled from "styled-components";
import { FlashcardModuleParam } from "../model";
// import { useSearchParams } from 'react-router-dom';
import { useRequest, useSearchParams, useSubscribe } from "@/util";
import { QueryApi } from "@/access";
import { Flashcard, REFRESH_FLASHCARD_KEY } from "@/__lib__/model";
import { Empty, Spin } from "antd";

const StyledFlashcardDetailContainer = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing);
    height: 100%;
    background-color: var(--contrast-primary);

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
    const flashcardId = params.get(FlashcardModuleParam.flashcardId);

    const {
        data: flashcardData,
        loading,
        refresh: refreshFlashcardData,
    } = useRequest<Flashcard>(flashcardId ? QueryApi.Flashcard.item(flashcardId) : undefined);
    useSubscribe(REFRESH_FLASHCARD_KEY, refreshFlashcardData);

    return (
        <StyledFlashcardDetailContainer>
            <Spin spinning={loading} tip="Loading...">
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
            </Spin>
        </StyledFlashcardDetailContainer>
    );
};
