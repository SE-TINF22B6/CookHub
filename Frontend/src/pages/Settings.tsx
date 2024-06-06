import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, {useEffect} from "react";
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
    const [passwordChangeMessage, setPasswordChangeMessage] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
        setPasswordChangeMessage("");
    };

    const handleClose = () => {
        setOpen(false);
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
            alert("Please upload a picture first");
            return
        } else {

            document.querySelector(".userPicture")?.firstElementChild?.setAttribute("src", imgUrl);
            const response = await new UserClient().changeProfilePicture(imgUrl ?? null);

            if (response) {

                alert("Successufly changed PP");
                window.location.reload();

            } else {
                alert("Something went wrong");
            }
        }


    }

    useEffect(() => {
        if (data) {
            setChangedDataName(data);
        }
    }, [data]);

    if (!data) {
        return (
            <>
                <NotLoggedIn></NotLoggedIn>
            </>
        );
    }

    return <div className="SettingsPage">

        <div id={"header"}>
            <h1>Settings</h1>
        </div>

        <div id={"body"}>

            <div className={"body-left"}>

                <h2>Username: {changedData?.name}</h2>

                <br/>

                <span className={"userPicture"}>
                    <img id="user-image"
                         src={`https://localhost:44328/images/profile-pictures/${changedData?.profilePicture}`}
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
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        const result = await new UserClient().changeUsername(newName);

                        if (result === 200) {
                            if (changedData) {
                                setChangedDataName({...changedData, name: newName});
                            }
                            alert("Username changed successfully to " + newName);
                        } else {
                            alert("Error. Server responded with status: " + result);
                        }
                    }}
                >Submit
                </Button>

                <br/><br/>

                <h2>Change Password</h2>
                <TextField id="filled-basic" label="Current password" variant="filled"/>
                <TextField id="filled-basic" label="Enter new Password" variant="filled"/>
                <TextField id="filled-basic" label="Repeat new password" variant="filled"/>
                <Button variant="contained" color="primary">Submit</Button>
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
                <ImageUploader/>
                <Button variant="contained" color="secondary" onClick={handlePicChange}>Change</Button>

                <br/>

                <Button
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
                        <span style={{color:"red"}}>{passwordChangeMessage}</span>
                    </DialogContent>
                    <DialogActions sx={{
                        backgroundColor: "#C9FE71"
                    }}>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={async () => {
                            const data = await handleDeleteAccount(currentPassword);
                            if (!data.ok) {
                                setPasswordChangeMessage(await data.text());
                            }else {
                                setPasswordChangeMessage("SUCCESS");
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