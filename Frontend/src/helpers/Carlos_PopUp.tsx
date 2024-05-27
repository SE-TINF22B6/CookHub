import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from "@mui/material/Grid";
import * as React from 'react';
import chef from "../assets/Chef_Carlo_without_background (1).png";
import '../style/Carlos_PopUp.css';

export default function Carlos_PopUp(buttonTitle: string, text: string, buttonTextColor: string = '#000000', buttonBorderColor: string = '#000000', backgroundColor: string = '#c7fc71') {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button className="dialog-button"
                onClick={handleClickOpen}
                style={{
                    color: buttonTextColor,
                    border: `2px solid ${buttonBorderColor}`,
                    backgroundColor: backgroundColor,
                    borderRadius: '10px',
                    minWidth: '15%',
                    padding: '1%',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                }}
            >
                {buttonTitle}
            </button>

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
