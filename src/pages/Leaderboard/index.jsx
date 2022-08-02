import React, {useState} from "react";
import {Link} from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./styles.scss";
import store from "store";
import dayjs from "dayjs";
import cn from "classnames";
import {PlayerContext} from "../../playerContext";
import {Button} from "@mui/material";


const data = [
    {id: 0, label: "timeSpan"},
    {id: 1, label: "score"},
    {id: 2, label: "moves"},
];

const mode = [
    {id: 0, label: "5x4"},
    {id: 1, label: "4x4"},
    {id: 2, label: "4x3"},
];


export const Leaderboard = () => {
    const playerContext = React.useContext(PlayerContext);

    const [isOpen, setOpen] = useState(false);
    const [items, setItem] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);
    const toggleDropdown = () => setOpen(!isOpen);
    const handleItemClick = (id) => {
        selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
        setOpen(!isOpen);
    };

    const [isOpens, setOpens] = useState(false);
    const [itemss, setItems] = useState(mode);
    const [selectedItems, setSelectedItems] = useState(null);
    const toggleDropdowns = () => setOpens(!isOpens);
    const handleItemClicks = (id) => {
        selectedItems == id ? setSelectedItems(null) : setSelectedItems(id);
        setOpens(!isOpens);
    };


    const leaderboard = store.get("leaderboard") || [];

    return (
        <div className="leaderboard">
            <div className="leaderboard__container">
                <div className="leaderboard__logo">
                    <p>Leaderboards</p>
                </div>
                <div className="leaderboard__info">
                    <div className="info__header">
                        <Button component={Link} to="/" variant="contained" color="primary">
                            Home
                        </Button>
                        <Button component={Link} to="/game" variant="contained" color="primary">
                            Play Game
                        </Button>
                    </div>
                    <div className="loader"></div>
                    {/*TODO: вернуть*/}
                    {/*<div className="dropdown_block">*/}
                    {/*    <div className="dropdown">*/}
                    {/*        <div className="dropdown-header" onClick={toggleDropdowns}>*/}
                    {/*            {selectedItems*/}
                    {/*                ? itemss.find((item) => item.id == selectedItems).label*/}
                    {/*                : "Game mode"}*/}
                    {/*            <ArrowDropUpIcon className={`icon ${isOpens && "open"}`}/>*/}
                    {/*        </div>*/}
                    {/*        <div className={`dropdown-body ${isOpens && "open"}`}>*/}
                    {/*            {itemss.map((item, i) => (*/}
                    {/*                <div*/}
                    {/*                    key={i}*/}
                    {/*                    className="dropdown-item"*/}
                    {/*                    onClick={(e) => handleItemClicks(e.target.id)}*/}
                    {/*                    id={item.id}*/}
                    {/*                >*/}
                    {/*<span*/}
                    {/*    className={`dropdown-item-dot ${*/}
                    {/*        item.id == selectedItems && "selected"*/}
                    {/*    }`}*/}
                    {/*></span>*/}
                    {/*                    {item.label}*/}
                    {/*                </div>*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="info__footer">
                        {
                            leaderboard.map((x, i) => {
                                const duration = dayjs.duration(x.elapsedTime);
                                const timeStr = dayjs.duration({
                                    seconds: duration.seconds(),
                                    minutes: duration.minutes()
                                }).format("mm:ss");

                                const isCurrentUser = x.name === playerContext.name;
                                return (
                                    <div className={cn("info__user", {
                                        ["black_mode"]: !isCurrentUser,
                                        ["red_mode"]: isCurrentUser
                                    })} key={i}>
                                        <div className="user__number">
                                            <p>{i + 1}</p>
                                        </div>
                                        <div className="user__name">
                                            <div className="user__name-one">
                                                {/*<img src={img} alt=""/>*/}
                                                <p className="name">{x.name}</p>
                                            </div>
                                            <div className="user__name-two">
                                                <p>score: {x.score}</p>
                                                <p>time: {timeStr}</p>
                                                <p>moves: {x.moves}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

