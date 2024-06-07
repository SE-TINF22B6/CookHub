import React from 'react';
import '../style/NotLoggedIn.css';
import ButtonGroup from "@mui/material/ButtonGroup";

export default function NotLoggedIn() {
    return (
        <div className="container">
            <div className="login-box">
                <h1 className="login-text">You are not logged in!</h1>
                <h1 className="login-text">Please login or sign up!</h1>
                <ButtonGroup
                    className="button-container">
                    <a href={"/login"}>
                        <button className="log-in-button">To Login</button>
                    </a>
                    <a href={"/signup"}>
                        <button className="sign-up-button">Sign Up</button>
                    </a>
                </ButtonGroup>
            </div>
        </div>
    );
}
