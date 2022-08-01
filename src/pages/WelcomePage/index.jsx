import React from "react";
import css from "./styles.module.scss";
import {PlayerContext} from "src/playerContext";
import {FormControl, InputLabel, Select, MenuItem, Button, TextField, FormHelperText} from "@mui/material";
import {useNavigate} from "react-router-dom";


export const WelcomePage = () => {

    const {name, setName} = React.useContext(PlayerContext);

    const [gameMode, setGameMode] = React.useState(4);

    const navigate = useNavigate();

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("submit");
        navigate("/game");
    };

    return (
        <div className={css.root}>
            <div className={css.wrap}>
                <h1 className={css.pageTitle}>
                    Memory Game
                </h1>
                <form className={css.form} onSubmit={onFormSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <FormControl>
                        <InputLabel id="game-mode-label">Game Mode</InputLabel>
                        <Select
                            labelId="game-mode-label"
                            id="demo-simple-select-helper"
                            value={gameMode}
                            label="Game Mode"
                            onChange={(e) => {
                                setGameMode(e.target.value);
                            }}
                        >
                            <MenuItem value={4}>2 x 2</MenuItem>
                            <MenuItem value={16}>4 x 4</MenuItem>
                            <MenuItem value={20}>5 x 4</MenuItem>
                        </Select>
                        <FormHelperText>With label + helper text</FormHelperText>
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Play
                    </Button>
                </form>
            </div>
        </div>
    );
};
