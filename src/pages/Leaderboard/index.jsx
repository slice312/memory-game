import React, {useState} from "react";
// import img from "../assents/img/fon.jpg";
import {Link} from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import "./styles.scss";

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
    return (
        <div className="leaderboard">
            <div className="leaderboard__container">
                <div className="leaderboard__logo">
                    <p>Leaderboards</p>
                </div>
                <div className="leaderboard__info">
                    <div className="info__header">
                        <Link to="/" className="back">
                            Play Game
                        </Link>
                        <Link to="/" className="back">
                            Home
                        </Link>


                    </div>
                    <div className="loader"></div>
                    <div className="dropdown_block">
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={toggleDropdown}>
                                {selectedItem
                                    ? items.find((item) => item.id == selectedItem).label
                                    : "Сортировка по"}
                                <ArrowDropUpIcon className={`icon ${isOpen && "open"}`}/>
                            </div>
                            <div className={`dropdown-body ${isOpen && "open"}`}>
                                {items.map((item) => (
                                    <div
                                        className="dropdown-item"
                                        onClick={(e) => handleItemClick(e.target.id)}
                                        id={item.id}
                                    >
                    <span
                        className={`dropdown-item-dot ${
                            item.id == selectedItem && "selected"
                        }`}
                    ></span>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="dropdown">
                            <div className="dropdown-header" onClick={toggleDropdowns}>
                                {selectedItems
                                    ? itemss.find((item) => item.id == selectedItems).label
                                    : "Выберите режим"}
                                <ArrowDropUpIcon className={`icon ${isOpens && "open"}`}/>
                            </div>
                            <div className={`dropdown-body ${isOpens && "open"}`}>
                                {itemss.map((item) => (
                                    <div
                                        className="dropdown-item"
                                        onClick={(e) => handleItemClicks(e.target.id)}
                                        id={item.id}
                                    >
                    <span
                        className={`dropdown-item-dot ${
                            item.id == selectedItems && "selected"
                        }`}
                    ></span>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="info__footer">
                        <div className="info__user red_mode">
                            <div className="user__number">
                                <p>1</p>
                            </div>
                            <div className="user__name">
                                <div className="user__name-one">
                                    {/*<img src={img} alt=""/>*/}
                                    <p className="name">Sardor</p>
                                </div>
                                <div className="user__name-two">
                                    <p>score: 12</p>


                                    <p>time: 00:00</p>
                                    <p>moves: 2</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

