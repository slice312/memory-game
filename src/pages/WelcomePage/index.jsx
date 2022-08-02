import React from "react";
import css from "./styles.module.scss";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
    FormHelperText
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {GameMode} from "src/shared/constants";



export const WelcomePage = () => {

    const navigate = useNavigate();

    const {control, handleSubmit} = useForm();

    const onFormSubmit = (data) => {
        if (data.name && data.gameMode) {
            navigate("/game", {state: {name: data.name, mode: data.gameMode}});
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
                        defaultValue="Tala"
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
                                    <MenuItem value={GameMode.Mode4x3}>4 x 3</MenuItem>
                                    <MenuItem value={GameMode.Mode4x4}>4 x 4</MenuItem>
                                    <MenuItem value={GameMode.Mode5x6}>5 x 6</MenuItem>
                                    <MenuItem value={GameMode.Mode6x6}>6 x 6</MenuItem>
                                </Select>
                                <FormHelperText>With label + helper text</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Button variant="contained" type="submit">
                        Play
                    </Button>
                </form>
            </div>
        </div>
    );
};
