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


export const ModalResult = ({showModal, onRestart}) => {
    return (
        <Dialog
            open={showModal}
            maxWidth={false}
        >
            <DialogTitle sx={{m: 0, p: 2}}>
                Modal Title
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
            <DialogContent dividers>
                <Typography  variant="body1" gutterBottom>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </Typography>
                <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                    magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                    ullamcorper nulla non metus auctor fringilla.
                </Typography>
            </DialogContent>


        </Dialog>
    );
};