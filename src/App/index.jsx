import {useEffect, useState, useRef, useDebugValue} from "react";
import {Button} from "@mui/material";
import {cardsData} from "./data";
import {ModalResult} from "./ModalResult";
import {Card} from "./Card";
import _ from "lodash";
import React from "react";
import {Game} from "./Game";
import {PlayerProvider} from "./playerContext/provider";


export const App = () => {

    return (
        <PlayerProvider>
            <Game/>
        </PlayerProvider>
    );
};


