import styled from "styled-components";
import { FlashcardModuleParam } from "../model";
import { useSearchParams } from 'react-router-dom';
import { useRequest } from "@/util";
import { QueryApi } from "@/access";
import { Flashcard } from "@/__lib__/model";
import { Spin } from "antd";


const StyledFlashcardDetailContainer = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing);
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
    const [params, updateSearchParams] = useSearchParams();
    const flashcardId = params.get(FlashcardModuleParam.flashcardId);

    const {
        data: flashcardData,
        loading,
    } = useRequest<Flashcard>(flashcardId ? QueryApi.Flashcard.item(flashcardId) : undefined);

    return (
        <Spin spinning={loading} tip="Loading...">
            <StyledFlashcardDetailContainer>
                {flashcardData
                    ? <StyledFlashcardDetail>
                        <div className="title">{flashcardData.title}</div>
                        <div className="description">{flashcardData.description}</div>
                    </StyledFlashcardDetail>
                    : null
                }
            </StyledFlashcardDetailContainer>
        </Spin>
    );
};
