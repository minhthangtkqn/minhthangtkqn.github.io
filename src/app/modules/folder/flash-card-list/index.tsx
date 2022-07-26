import './index.scss';
import React from 'react';
import { FlashCard } from 'app/model';
import { CardItem } from '../card-item';

type FlashCardList = {
    flashCardList: FlashCard[];
};
export const FlashCardList: React.ComponentType<FlashCardList> = ({ flashCardList }) => {
    return (
        <div className="flashcard-list">
            {flashCardList.map(card => {
                return (
                    <CardItem card={card} />
                );
            })}
        </div>
    );
};
