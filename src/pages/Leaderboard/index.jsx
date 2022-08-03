import React from "react";
import {Link} from "react-router-dom";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import dayjs from "dayjs";
import lstore from "store";
import cn from "classnames";

import {GameMode} from "src/shared/constants";
import css from "./styles.module.scss";


export const Leaderboard = () => {
    const currentUser = lstore.get("user");

    const [gameMode, setGameMode] = React.useState(GameMode.Mode3x4);

    const leaderboard = (lstore.get("leaderboard") || [])
        .filter(x => x.gameMode === gameMode);


    return (
        <div className={css.leaderboard}>
            <div className={css.container}>
                <div className={css.title}>
                    <p>Leaderboard</p>
                </div>
                <div className={css.info}>
                    <div className={css.infoHeader}>
                        <Button component={Link} to="/" variant="contained" color="primary">
                            Home
                        </Button>
                        <Button component={Link} to="/game" variant="contained" color="primary">
                            Play Game
                        </Button>
                    </div>
                    <div className={css.gradientLine}></div>

                    <div className={css.dropdownBlock}>
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
                    <div className={css.infoFooter}>
                        <div className={cn(css.infoUser, css.blackMode)}>
                            <div className={css.userNumber}>
                                <p>#</p>
                            </div>
                            <div className={css.userName}>
                                <div className={css.user__name_one}>
                                    <p>Name</p>
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
                                    <div className={cn(css.infoUser, {
                                        [css.blackMode]: !isCurrentUser,
                                        [css.redMode]: isCurrentUser
                                    })} key={i}>
                                        <div className={css.userNumber}>
                                            <p>{i + 1}</p>
                                        </div>
                                        <div className={css.userName}>
                                            <div className={css.user__name_one}>
                                                <p>{x.name}</p>
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