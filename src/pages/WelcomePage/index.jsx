import React from "react";
import css from "./styles.module.scss";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    FormHelperText,
} from "@mui/material";
import {useNavigate, Link} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {GameMode} from "src/shared/constants";
import {PlayerContext} from "src/playerContext";



export const WelcomePage = () => {
    const playerContext = React.useContext(PlayerContext);

    React.useEffect(() => {
        setValue("name", playerContext.name);
    }, [playerContext.name])

    const navigate = useNavigate();

    const {control, handleSubmit, setValue} = useForm();

    const onFormSubmit = (data) => {
        if (data.name && data.gameMode) {
            playerContext.setName(data.name);
            playerContext.setGameMode(data.gameMode);
            navigate("/game");
        }
    };

    return (
        <div className={css.root}>
            <div className={css.wrap}>
                <h1 className={css.pageTitle}>
                    Memory Game
                </h1>
                <form className={css.form} onSubmit={handleSubmit(onFormSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{required: "Name required"}}
                        defaultValue={playerContext.name}
                        render={({field, fieldState}) => (
                            <TextField
                                name="name"
                                label="Name"
                                type="text"
                                variant="outlined"
                                value={field.value}
                                error={!!fieldState.error}
                                onChange={field.onChange}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />


                    <Controller
                        name="gameMode"
                        control={control}
                        rules={{required: "Game mode required"}}
                        defaultValue={GameMode.Mode3x4}
                        render={({field, fieldState}) => (
                            <FormControl>
                                <InputLabel id="game-mode-label">
                                    Game Mode
                                </InputLabel>
                                <Select
                                    labelId="game-mode-label"
                                    value={field.value}
                                    label="Game Mode"
                                    onChange={field.onChange}
                                >
                                    <MenuItem value={GameMode.Mode3x4}>3 x 4</MenuItem>
                                    <MenuItem value={GameMode.Mode4x4}>4 x 4</MenuItem>
                                    <MenuItem value={GameMode.Mode5x6}>5 x 6</MenuItem>
                                    <MenuItem value={GameMode.Mode6x6}>6 x 6</MenuItem>
                                </Select>
                                <FormHelperText>Cards grid size</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Button variant="contained" type="submit">
                        Play
                    </Button>
                    <Button component={Link} to="/leaderboard" variant="contained" color="primary">
                        Leaderboard
                    </Button>
                </form>
            </div>
        </div>
    );
};
