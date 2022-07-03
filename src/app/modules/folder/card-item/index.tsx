import './index.scss';
import React from 'react'
import { Card } from "app/model";

type Props = {
    card: Card;
};

export const CardItem: React.FC<Props> = ({ card }) => {
    return (
        <div className="card-item">
            <div className="card-item__word">{card.word}</div>
            <div className="card-item__description">{card.description}</div>
        </div>
    );
};
