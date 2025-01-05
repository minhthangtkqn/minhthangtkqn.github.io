import { QueryApi } from "@/access";
import { useRequest } from "@/util";
import styled from "styled-components";
import { FlashcardModuleParam } from "../model";
import { useSearchParams } from "react-router-dom";
import { Flashcard } from "@/__lib__/model";
import { SyncOutlined } from "@ant-design/icons";

const StyledFlashcardListContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const StyledFlashcardList = styled.div`
    border: var(--bd);
    border-radius: var(--br);
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;

    .list-header {
        font-size: var(--fs-xl);
        font-weight: bold;
        text-transform: uppercase;
        background-color: var(--main-primary);
        color: var(--contrast-primary);
        padding: var(--spacing-sm);
        min-height: var(--min-height-header);
        display: flex;
        align-items: center;
        column-gap: var(--spacing-sm);
        cursor: pointer;
    }

    .list-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        row-gap: var(--spacing-sm);
        padding: var(--spacing-sm);
    }
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
        color: var(--main-tertiaryDarker);
    }
`;

export const FlashcardListPanel = () => {
    const {
        data: flashcardList,
        loading: flashcardListLoading,
        refresh: refreshFlashcardList,
    } = useRequest<Flashcard[]>(QueryApi.Flashcard.list());
    const [, updateSearchParams] = useSearchParams();

    return (
        <StyledFlashcardListContainer>
            <StyledFlashcardList>
                <div className="list-header" onClick={() => refreshFlashcardList()}>
                    <div>Flashcard</div>
                    <SyncOutlined
                        className="reload-icon"
                        spin={flashcardListLoading}
                    />
                </div>
                <div className="list-body">
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
                </div>
            </StyledFlashcardList>
        </StyledFlashcardListContainer>
    );
};
