import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import css from "./styles.module.scss";
import {PlayerContext} from "src/playerContext";
import {useNavigate} from "react-router-dom";


export const ModalResult = ({showModal, onRestart, onClose}) => {
    const playerContext = React.useContext(PlayerContext);

    const innerOnClose = () => {
        onClose();
    };


    const navigate = useNavigate();

    const redirectToLeaderboard = () => {
        navigate("/leaderboard");
    };


    return (
        <Dialog
            open={showModal}
            maxWidth={false}
        >
            <DialogTitle sx={{m: 0, p: 2}}>
                Result
                <IconButton
                    aria-label="close"
                    // onClick={}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className={css.content}>
                <Typography variant="h4" align="center" gutterBottom>
                    Game Mode: {playerContext.gameMode}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Time: {2}
                </Typography>
                <Typography variant="h5">
                    Moves: {playerContext.moves}
                </Typography>
                <Typography variant="h5">
                    Score: {playerContext.moves}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={innerOnClose}>
                    Play again
                </Button>
                <Button onClick={redirectToLeaderboard}>
                    Leaderboard
                </Button>
            </DialogActions>
        </Dialog>
    );
};