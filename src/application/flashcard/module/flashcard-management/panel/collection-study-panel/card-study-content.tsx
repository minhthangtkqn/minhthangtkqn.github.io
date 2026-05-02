import { useState } from 'react';
import { FlashCard } from "@/__lib__/model";
import styled from "styled-components";
import { FlashCardSideContent } from "../../component";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const StyledCardStudyContent = styled.div`
    height: 100%;
    display: flex;
    position: relative;

    .card-side-content {
        cursor: pointer;
        flex: 1;
    }

    .float-button {
        cursor: pointer;
        width: var(--spacing-4xl);
        height: 100%;
        background-color: #00000020;
        color: var(--contrast-primary);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: var(--fs-5xl);

        &:hover {
            background-color: #00000040;
        }

        &.prev-card {
            left: 0;
        }

        &.next-card {
            right: 0;
        }
    }
`;

export const CardStudyContent = ({
    cardList,
    currentIndex,
    onPrevCard,
    onNextCard,
}: {
    cardList: FlashCard[];
    currentIndex: number;
    onPrevCard?: () => void;
    onNextCard?: () => void;
}) => {
    const [isFront, setFront] = useState(true);

    const getRandomIndex = (avoidIndex: number) => {
        if (cardList.length <= 1) return 0;
        let newIndex = avoidIndex;
        while (newIndex === avoidIndex) {
            newIndex = Math.floor(Math.random() * cardList.length);
        }
        return newIndex;
    };

    const prevCard = () => {
        // const lastIndex = cardList.length - 1; // just help easier to read
        // setCurrentIndex(i => random
        //     ? getRandomIndex(i)
        //     : i === 0 ? lastIndex : i - 1
        // );
        onPrevCard?.();
        setFront(true);
    };

    const nextCard = () => {
        // const lastIndex = cardList.length - 1; // just help easier to read
        // setCurrentIndex(i => random
        //     ? getRandomIndex(i)
        //     : i === lastIndex ? 0 : i + 1
        // );
        onNextCard?.();
        setFront(true);
    };

    return <StyledCardStudyContent>
        <div className="float-button prev-card" onClick={prevCard}><LeftCircleOutlined /></div>
        <FlashCardSideContent
            type={isFront ? cardList[currentIndex].front_type : cardList[currentIndex].back_type}
            value={isFront ? cardList[currentIndex].front_value : cardList[currentIndex].back_value}
            preview={false}
            onClick={() => setFront(f => !f)}
        />
        <div className="float-button next-card" onClick={nextCard}><RightCircleOutlined /></div>
    </StyledCardStudyContent>;
};
