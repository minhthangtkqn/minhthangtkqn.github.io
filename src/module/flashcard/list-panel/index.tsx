import { useEffect } from 'react';
import { QueryApi } from "@/access";
import { useRequest } from "@/util";
import styled from "styled-components";

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
`;

type Flashcard = {
    _id: string;
    title: string;
    description: string;
};

export const FlashcardListPanel = () => {
    const {
        data,
        error,
        loading,
        queryCount,
        refresh,
    } = useRequest<Flashcard[]>(QueryApi.Flashcard.list());

    useEffect(() => {
        console.log('🚀 ~ FlashcardListPanel ~ data:', data);
    }, [data]);

    return (
        <StyledFlashcardListContainer>
            <StyledFlashcardList>
                {data?.map(item => <StyledFlashcardItem>{item.title}</StyledFlashcardItem>)}
            </StyledFlashcardList>
        </StyledFlashcardListContainer>
    );
};
