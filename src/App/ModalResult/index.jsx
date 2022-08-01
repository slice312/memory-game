import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import css from "./styles.module.scss";


export const ModalResult = ({showModal, onRestart}) => {
    return showModal
        ? (
            <div className={css.root}>

                <div className={css.modalWrap}>
                    Result
                    <p>Timer: 00:00</p>
                    <p>Score: 0</p>
                    <p>Ok</p>
                </div>
            </div>
        )
        : null;
};