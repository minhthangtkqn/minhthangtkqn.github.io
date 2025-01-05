import { QueryApi } from "@/access";
import { useRequest } from "@/util";
import styled from "styled-components";
import { FlashcardModuleParam } from "../model";
import { useSearchParams } from "react-router-dom";
import { Flashcard } from "@/__lib__/model";

const StyledFlashcardListContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const StyledFlashcardList = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing);
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-sm);
    flex: 1;
    overflow-y: auto;
`;

const StyledFlashcardItem = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    padding: var(--spacing-sm);
    cursor: pointer;

    &:hover {
        background-color: var(--main-primaryLighter);
    }

    .description {
        font-size: var(--fs-sm);
        color: var(--main-tertiary);
    }
`;

export const FlashcardListPanel = () => {
    const {
        data: flashcardList,
    } = useRequest<Flashcard[]>(QueryApi.Flashcard.list());
    const [, updateSearchParams] = useSearchParams();

    return (
        <StyledFlashcardListContainer>
            <StyledFlashcardList>
                {flashcardList?.map(item => <StyledFlashcardItem
                    key={item._id}
                    onClick={() => {
                        updateSearchParams(prev => {
                            prev.set(FlashcardModuleParam.flashcardId, item._id);
                            return prev;
                        });
                    }}
                >
                    <div className="title">{item.title}</div>
                    <div className="description truncate">{item.description}</div>
                </StyledFlashcardItem>)}
            </StyledFlashcardList>
        </StyledFlashcardListContainer>
    );
};
