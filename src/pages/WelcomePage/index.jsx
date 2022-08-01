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
                        defaultValue=""
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
                        defaultValue={4}
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
                                    <MenuItem value={4}>2 x 2</MenuItem>
                                    <MenuItem value={16}>4 x 4</MenuItem>
                                    <MenuItem value={20}>5 x 4</MenuItem>
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
