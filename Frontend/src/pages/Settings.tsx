import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import "../style/Settings.css";
import ImageUploader from "../components/ImageUploader";
import Carlos_PopUp from "../helpers/Carlos_PopUp";
import DeleteIcon from '@mui/icons-material/Delete';
import {UserDataParams} from "../models/UserDataParams";
import NotLoggedIn from "../components/NotLoggedIn";


export default function Settings(userProfile: UserDataParams) {

    let data = userProfile.data;
    const [currentPassword, setCurrentPassword] = React.useState('');
    // Mock password for testing purposes
    let password = "password";


    if (!data) {
        return (
            <>
                <NotLoggedIn></NotLoggedIn>
            </>
        );
    }

    return (

        <div className="SettingsPage">

            <div id={"header"}>
                <h1>Settings</h1>
            </div>

            <div id={"body"}>

                <div className={"body-left"}>

                    <h2>Username: {data?.name}</h2>

                    <br/>

                    <span className={"userPicture"}>
                        <img id="user-image"
                             src={`https://localhost:44328/images/profile-pictures/${data?.profilePicture}`}
                             alt="User"/>
                    </span>

                    <br/>

                    {Carlos_PopUp(
                        "Info",
                        "In this section you can change your username, password and profile picture. " +
                        "You can also delete your account, but be careful, this action is irreversible! " +
                        "To delete your account, you need to enter your current password.",
                        '#000000',
                        '#000000',
                        'rgb(0,175,99)'
                    )}

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
                    <TextField id="filled-basic" label="New Username" variant="filled"/>
                    <Button variant="contained" color="primary">Submit</Button>

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

                    <br/>

                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon fontSize={"small"}/>}
                        color="error"
                        onClick={() => {
                            // Implement onClick functionality by checking the current password

                            if (currentPassword == password) {
                                if (window.confirm("Are you sure you want to delete your account?")) {
                                    // Implement account deletion functionality
                                    alert("Account deleted successfully!");
                                }
                            } else {
                                alert("Incorrect password!");
                            }
                        }}>
                        Delete Account
                    </Button>

                    <TextField
                        id="filled-basic"
                        label="Current password"
                        variant="filled"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <br/> <br/>

                </Box>
            </div>
        </div>
    );
}