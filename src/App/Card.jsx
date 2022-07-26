import css from "./Card.module.scss";
import React from "react";


export const Card = ({card, onClick}) => {
    const insideDivRef = React.useRef();

    const innerOnCardClick = () => {
        insideDivRef.current.classList.add(css.picked)
        onClick?.();
    };

    return (
        <div className={css.card} onClick={innerOnCardClick}>
            <div className={css.inside} ref={insideDivRef}>
                <div className={css.front}>
                    <img src={card.img} alt="card=image"/>
                </div>
                <div className={css.back}>
                    <img
                        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/codepen-logo.png"
                        alt="Codepen"/>
                </div>
            </div>
        </div>
    );
};