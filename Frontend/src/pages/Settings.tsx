import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import "../style/Settings.css";
import ImageUploader from "../components/ImageUploader";
import UserImage from "../assets/Hotdog.svg";
import DeleteIcon from '@mui/icons-material/Delete';




const value = "HotDog";


export default function Settings() {
    return (

        <div className="SettingsPage">

            <div id={"header"}>
                <h1>Settings</h1>
            </div>

            <div id={"body"}>

                {/* IMPLEMENT:
                - change username
                - change password
                - delete account
                - change profile picture
                - dark mode (optional
                */}


                <div className={"body-left"}>

                    <h2>Username: {value}</h2>

                    <br/><br/>

                    <span className={"userPicture"}>
                        <img src={UserImage} alt="User" style={{width: '100%'}}/>
                    </span>
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
                    <h2>Delete Account</h2>
                    <Button
                        variant="contained"
                        startIcon={<DeleteIcon fontSize={"small"}/>}
                        color="error"
                        onClick={() => {
                            // Implement onClick functionality
                        }}>
                        Delete Account
                    </Button>

                    <br/><br/>

                    <h2>Change Profile Picture</h2>
                    <ImageUploader/>

                </Box>
            </div>
        </div>
    );
}