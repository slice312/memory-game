import {Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";


export const ModalResult = ({showModal, onRestart}) => {
    return  (
        <Dialog
            open={showModal}
            disableBackdropClick
            disableEscapeKeyDown
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Hurray!!! You completed the challenge
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You completed the game in "moves" moves. Your best score is{" "}
                    "bestScore" moves.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onRestart} color="primary">
                    Restart
                </Button>
            </DialogActions>
        </Dialog>
    );
};