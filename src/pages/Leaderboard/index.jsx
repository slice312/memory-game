import React from "react";
import {Link} from "react-router-dom";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import dayjs from "dayjs";
import lstore from "store";
import cn from "classnames";

import {GameMode} from "src/shared/constants";
import "./styles.scss";


export const Leaderboard = () => {
    const currentUser = lstore.get("user");

    const [gameMode, setGameMode] = React.useState(GameMode.Mode3x4);

    const leaderboard = (lstore.get("leaderboard") || [])
        .filter(x => x.gameMode === gameMode);


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
                    <div className="gradient-line"></div>

                    <div className="dropdown_block">
                        <FormControl>
                            <InputLabel id="game-mode-label">
                                Game Mode
                            </InputLabel>
                            <Select
                                sx={{width: 150}}
                                labelId="game-mode-label"
                                value={gameMode}
                                label="Game mode"
                                onChange={e => setGameMode(e.target.value)}
                            >
                                <MenuItem value={GameMode.Mode3x4}>3 x 4</MenuItem>
                                <MenuItem value={GameMode.Mode4x4}>4 x 4</MenuItem>
                                <MenuItem value={GameMode.Mode5x6}>5 x 6</MenuItem>
                                <MenuItem value={GameMode.Mode6x6}>6 x 6</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="info__footer">
                        <div className={cn("info__user", "black_mode")}>
                            <div className="user__number">
                                <p>#</p>
                            </div>
                            <div className="user__name">
                                <div className="user__name-one">
                                    <p className="name">Name</p>
                                </div>
                                <p>Score</p>
                                <p>Time</p>
                                <p>Moves</p>
                            </div>
                        </div>
                        {
                            leaderboard.map((x, i) => {
                                const duration = dayjs.duration(x.elapsedTime);
                                const timeStr = dayjs.duration({
                                    seconds: duration.seconds(),
                                    minutes: duration.minutes()
                                }).format("mm:ss");

                                const isCurrentUser = x.name === currentUser?.name;
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
                                                <p className="name">{x.name}</p>
                                            </div>
                                            <p>{x.score}</p>
                                            <p>{timeStr}</p>
                                            <p>{x.moves}</p>
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