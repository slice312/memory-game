import React from "react";
import cn from "classnames";
import css from "./styles.module.scss";

import sourceCodeImg from "src/assets/images/source-code.svg";


export const Card = ({onClick, card, isInactive, isFlipped}) => {
    const handleClick = () => {
        !isFlipped && !isInactive && onClick(card);
    };

    return (
        <div
            onDragStart={e => e.preventDefault()}
            className={cn(css.card, {
                [css.isFlipped]: isFlipped,
                [css.isInactive]: isInactive
            })}
            onClick={handleClick}
        >
            <div
                className={css.cardView}>
                <img src={sourceCodeImg} alt="card-back-skin"/>
            </div>
            <div className={cn(css.cardView, css.backSide)}>
                <img src={card.image} alt="card-image"/>
            </div>
        </div>
    );
};