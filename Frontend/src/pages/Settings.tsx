import Box from "@mui/material/Box";
import Placeholder from "../assets/fillElements/placeholder.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import "../style/Settings.css";
import {UserClient} from "../clients/UserClient";
import ImageUploader from "../components/ImageUploader";
import CARLOS_POPUP from "../helpers/CARLOS_POPUP";
import DeleteIcon from '@mui/icons-material/Delete';
import {UserDataParams} from "../models/UserDataParams";
import NotLoggedIn from "../components/NotLoggedIn";
import {UserData} from "../models/UserData";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


export default function Settings(userProfile: UserDataParams) {

    let data = userProfile.data;

    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newName, setNewName] = React.useState('');
    const [changedData, setChangedDataName] = React.useState<UserData | null>(null);
    const [open, setOpen] = React.useState(false);
    const [openName, setOpenName] = React.useState(false);
    const [openFile, setOpenFile] = React.useState(false);
    const [openFileSuccess, setOpenFileSuccess] = React.useState(false);
    const [openPassDialog, setOpenPassDialog] = React.useState(false);
    const [passwordDeleteChange, setPasswordDeleteChange] = React.useState("");


    const [newNameMessage, setNewNameMessage] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordMessage, setNewPasswordMessage] = React.useState("");
    const [showResponseError, setShowResponseError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [passwordRe, setPasswordRe] = useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [passwordAfterChangeMessage, setPasswordAfterChangeMessage] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
        setPasswordDeleteChange("");
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleClickOpenName = () => {
        setOpenName(true);
    };

    const handleCloseName = () => {
        setOpenName(false);
    };


    const handleClickOpenFile = () => {
        setOpenFile(true);

    };

    const handleCloseFile = () => {
        setOpenFile(false);
    };


    const handleClickOpenFileSucces = () => {
        setOpenFileSuccess(true);
    };

    const handleCloseFileSuccess = () => {
        setOpenFileSuccess(false);
    };


    const handleClickOpenPassDialog = () => {
        setOpenPassDialog(true);
    };

    const handleClosePassDialog = () => {
        setOpenPassDialog(false);
    };

    async function handleDeleteAccount(password: string) {
        console.log(password);
        const response = await new UserClient().deleteProfile(password);
        return response;

    }


    const handlePicChange = async (e: any) => {
        e.preventDefault();

        let imgUrl: string = document.querySelector(".ImageInput")?.firstElementChild?.getAttribute("src") ?? "";

        if (imgUrl === "/static/media/photo_placeholder.47177532c4d2205871f4.png") {
            handleClickOpenFile();
            return
        } else {

            document.querySelector(".userPicture")?.firstElementChild?.setAttribute("src", imgUrl);
            const response = await new UserClient().changeProfilePicture(imgUrl ?? null);
            if (response) {
                handleClickOpenFileSucces();



            } else {

            }
        }



    }

    useEffect(() => {
        if (data) {
            setChangedDataName(data);
        }

        const usernameRegex = /^[A-Za-z0-9_]{4,16}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/;

        const validateForm = () => {
            if (newName) {
                setShowResponseError(false);
                setNewNameMessage("");

                if (!usernameRegex.test(newName)) {
                    setNewNameMessage("Username must be 4-16 characters long and can only contain letters, numbers, and underscores.");
                    setShowResponseError(false);
                    setIsFormValid(false);
                }

            }


            if (newPassword) {

                if (newPassword !== passwordRe) {
                    setNewPasswordMessage("Passwords don't match!");
                    setShowResponseError(false);
                    setIsFormValid(false);
                    return;
                }
                if (!passwordRegex.test(newPassword)) {
                    setNewPasswordMessage("Password must be 8-32 characters long, contain at least one letter, one number, and one special character.");
                    setShowResponseError(false);
                    setIsFormValid(false);
                    return;
                }
                if (!newPassword && !passwordRe) {
                    setNewPasswordMessage("");
                    setShowResponseError(false);
                    setIsFormValid(false);
                    return;
                }

            }


        }

        if (!showResponseError) {
            setNewNameMessage("");
            setNewPasswordMessage("")
        }

        setIsFormValid(true);

        validateForm();


    }, [data, newName, newPassword, passwordRe, isFormValid, showResponseError]);

    if (!data) {
        return (
            <>
                <NotLoggedIn></NotLoggedIn>
            </>
        );
    }


    return <div className="SettingsPage">

        <div id={"header"}>
            <h1 style={{color: '#C9FE71', textShadow: '2px 2px #000'}}>Settings</h1>
        </div>

        <div id={"body"}>

            <div className={"body-left"}>

                <h2 id="usernameInfo">Username: {changedData?.name}</h2>

                <br/>

                <span className={"userPicture"}>
                    <img id="user-image"
                         src={changedData?.profilePicture ? `https://localhost:44328/images/profile-pictures/${changedData?.profilePicture}` : Placeholder}
                         alt="User"/>
                </span>

                <br/>


                <CARLOS_POPUP
                    buttonTitle="Info"
                    text="In this section you can change your username, password and profile picture. You can also delete your account, but be careful, this action is irreversible! To delete your account, you need to enter your current password."
                    buttonTextColor="#000000"
                    buttonBorderColor="#000000"
                    backgroundColor='rgb(0,175,99)'
                />

                <br/><br/>

            </div>

            <Box className={"body-middle"}
                 component="form"
                 sx={{
                     '& > :not(style)': {m: 1, width: '25ch'},
                 }}
                 noValidate
                 autoComplete="off"
            >
                <h2>Change Username</h2>
                <TextField
                    id="filled-basic"
                    label="New Username"
                    variant="filled"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />

                <Button
                    id="changeUsernameButton"
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        const result = await new UserClient().changeUsername(newName);
                        if (result === 200) {
                            if (changedData) {
                                setChangedDataName({...changedData, name: newName});
                                handleClickOpenName();
                            }

                        } else {
                            alert("Error. Something went wrong: " + result);
                        }
                    }}
                >Submit
                </Button>
                <Dialog
                    open={openName}
                    onClose={handleCloseName}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-window"
                >
                    <DialogTitle id="alert-dialog-title"
                                 className="delete-dialog-title">{"Information"}</DialogTitle>
                    <DialogContent>
                        <p id="alert-dialog-description" className="delete-dialog-description">
                            Your name was changed to
                            <strong style={{display: "block", textAlign: "center"}}>{newName}</strong>
                        </p>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button className="dialog-button" onClick={handleCloseName} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <span id="newNameMessage"
                      style={{color: "red", fontSize: "22px", fontStyle: "bold"}}>{newNameMessage}</span>

                <br/><br/>

                <h2>Change Password</h2>
                <TextField id="oldPassword" className="filled-basic" label="Current password" variant="filled"
                           value={oldPassword} type="password" onChange={e => setOldPassword(e.target.value)}/>
                <TextField id="newPassword" className="filled-basic" label="Enter new Password" variant="filled"
                           value={newPassword} type="password"
                           onChange={(e) => setNewPassword(e.target.value)}/>
                <TextField id="repeatNewPassword" className="filled-basic" label="Repeat new password" variant="filled"
                           value={passwordRe} type="password"
                           onChange={(e) => setPasswordRe(e.target.value)}/>
                <Button id="changePasswordButton" variant="contained" color="primary" onClick={async () => {
                    if (newPassword !== passwordRe) {
                        return
                    }
                    const response = await new UserClient().changePassword(oldPassword, newPassword);
                    if (response === 200) {
                        handleClickOpenPassDialog();
                        setPasswordAfterChangeMessage("Password Changed");

                    } else {
                        setPasswordAfterChangeMessage(response?.toString() ?? "Error");
                    }
                    setOldPassword("");
                    setNewPassword("")
                    setPasswordRe("");

                }}>
                    Submit
                </Button>
                <span style={{color: "red", fontSize: "22px", fontStyle: "bold"}}
                      id="passwordValidationMessage">{newPasswordMessage}</span>
                <span style={{color: "red", fontSize: "22px", fontStyle: "bold"}}
                      id="passwordAfterChangeMessage">{passwordAfterChangeMessage}</span>

                <Dialog
                    open={openPassDialog}
                    onClose={handleClosePassDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-window"
                >
                    <DialogTitle id="alert-dialog-title"
                                 className="delete-dialog-title">{"Information"}</DialogTitle>
                    <DialogContent>
                        <p id="alert-dialog-description" className="delete-dialog-description">

                            <strong style={{display: "block", textAlign: "center"}}>Your password was successfully changed </strong>
                        </p>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button className="dialog-button" onClick={handleClosePassDialog} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>

            <Box className={"body-right"}
                 component="form"
                 sx={{
                     '& > :not(style)': {m: 1, width: '25ch'},
                 }}
                 noValidate
                 autoComplete="off"
            >
                <h2>Change Profile Picture</h2>
                <ImageUploader recipe={null} setRecipe={null}/>
                <Button id="changeProfilePictureButton" variant="contained" color="secondary"
                        onClick={handlePicChange}>Change</Button>

                <Dialog
                    open={openFile}
                    onClose={handleCloseFile}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-window"
                >
                    <DialogTitle id="alert-dialog-title"
                                 className="delete-dialog-title">{"Something went wrong!"}</DialogTitle>
                    <DialogContent>
                        <p id="alert-dialog-description" className="delete-dialog-description">
                            Please select a file first!
                        </p>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button className="dialog-button" onClick={handleCloseFile} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openFileSuccess}
                    onClose={handleCloseFileSuccess}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    className="dialog-window"
                >
                    <DialogTitle id="alert-dialog-title"
                                 className="delete-dialog-title">{"Information"}</DialogTitle>
                    <DialogContent>
                        <p id="alert-dialog-description" className="delete-dialog-description">

                            <strong style={{display: "block", textAlign: "center"}}>Your profile picture was
                                successfully changed</strong>
                        </p>
                    </DialogContent>
                    <DialogActions className="dialog-actions">
                        <Button className="dialog-button" onClick={() => {handleCloseFileSuccess();  window.location.reload();}} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>

                <br/>

                <Button
                    id="deleteAccountButton"
                    variant="contained"
                    startIcon={<DeleteIcon fontSize={"small"}/>}
                    color="error"
                    onClick={handleClickOpen}>
                    Delete Account
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle sx={{
                        color: "black",
                        fontSize: "20px",
                        fontStyle: "bold",
                        textShadow: "none",
                        backgroundColor: "#C9FE71",
                    }}>
                        Delete Account
                    </DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: "#38527D",

                    }}>
                        <DialogContentText sx={{color: "red"}}>
                            Please Enter your password to confirm!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <span id="passwordDeleteMessage" style={{color: "red"}}>{passwordDeleteChange}</span>
                    </DialogContent>
                    <DialogActions sx={{
                        backgroundColor: "#C9FE71"
                    }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button id="confirmAccountDeletion" onClick={async () => {
                            const data = await handleDeleteAccount(currentPassword);
                            if (!data.ok) {
                                setPasswordDeleteChange(await data.text());
                            } else {
                                setPasswordDeleteChange("SUCCESS");
                                window.location.reload();
                            }
                        }

                        }>Delete</Button>
                    </DialogActions>
                </Dialog>

                <br/> <br/>

            </Box>
        </div>
    </div>;
}