import './index.scss';
import React from 'react'
import { FlashCard } from "app/model";

type Props = {
    card: FlashCard;
};

export const CardItem: React.FC<Props> = ({ card }) => {
    return (
        <div className="card-item">
            <div className="card-item__word">{card.name}</div>
            <div className="card-item__description">{card.description}</div>
        </div>
    );
};
