import React from "react";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

import {PlayerContext} from "src/features/playerContext";


export const ModalResult = ({showModal, onRestart, onClose}) => {
    const playerContext = React.useContext(PlayerContext);

    const innerOnClose = () => {
        onRestart();
        onClose();
    };

    const navigate = useNavigate();

    const redirectToLeaderboard = () => navigate("/leaderboard");


    const duration = dayjs.duration(playerContext.elapsedTime);
    const timeStr = dayjs.duration({
        seconds: duration.seconds(),
        minutes: duration.minutes()
    }).format("mm:ss");


    return (
        <Dialog
            open={showModal}
            maxWidth={false}
        >
            <DialogTitle sx={{m: 0, p: 2}} variant="h4">
                Result
                <IconButton
                    aria-label="close"
                    onClick={innerOnClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{padding: "30px 80px 30px 100px"}}>
                <Typography variant="h5" gutterBottom>
                     &nbsp;&nbsp;&nbsp;Time: {timeStr}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Moves: {playerContext.moves}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    &nbsp;Score: {playerContext.score}
                </Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent: "space-between", gap: "15px", padding: "15px 25px"}}>
                <Button variant="contained" autoFocus onClick={innerOnClose}>
                    Play again
                </Button>
                <Button variant="contained" onClick={redirectToLeaderboard}>
                    Leaderboard
                </Button>
            </DialogActions>
        </Dialog>
    );
};