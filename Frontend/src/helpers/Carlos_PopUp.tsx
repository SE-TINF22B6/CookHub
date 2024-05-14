import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from "@mui/material/Grid";
import * as React from 'react';
import chef from "../assets/Chef_Carlo_without_background (1).png";
import '../style/Carlos_PopUp.css';

export default function Carlos_PopUp(buttonTitle: string, text: string) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <React.Fragment>
            <Button
                variant="outlined"
                onClick={handleClickOpen}
                style={{color: '#C9FE71', borderColor: '#C9FE71'}}
            > {buttonTitle}
            </Button>

            <Dialog
                id={"carlos-dialog"}
                open={open}
                onClose={handleClose}
                aria-labelledby="carlos-dialog"
                aria-describedby="carlos-dialog-description"
            >

                <DialogContent>
                    <DialogContentText id="carlos-dialog-description">
                        <Grid item md={7}>

                            <div className='speech-bubble'>
                                <span style={{
                                    color: '#C9FE71',
                                    backgroundColor: '#262525FF',
                                    fontWeight: 'bold',
                                    textShadow: '3'
                                }}> {text}
                                </span>
                            </div>

                            <div className="carlos-image-div">
                                <img src={chef} className="carlos-image" alt="chef"/>
                            </div>

                        </Grid>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button className="dialog-button" onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
