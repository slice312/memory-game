import React from "react";
import cn from "classnames";
import sourceCodeImg from "src/assets/images/source-code.svg";
import css from "./styles.module.scss";

export const Card = ({onClick, card, isInactive, isFlipped}) => {
    const handleClick = () => {
        !isFlipped && !isInactive && onClick(card);
    };

    return (
        <div
            className={cn(css.card, {
                [css.isFlipped]: isFlipped,
                [css.isInactive]: isInactive
            })}
            onClick={handleClick}
        >
            <div className={css.cardView} >
                <img src={sourceCodeImg} alt="card-back-skin"/>
            </div>
            <div className={cn(css.cardView, css.backSide)}>
                <img src={card.image} alt="card-image"/>
            </div>
        </div>
    );
};