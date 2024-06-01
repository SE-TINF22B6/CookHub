import '../style/SignUp.css';
import * as React from 'react';
import chef from "../assets/Chef_Carlo_without_background (1).png";
import {useEffect, useState} from "react";
import {UserClient} from "../clients/UserClient";



export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRe, setPasswordRe] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showResponseError, setShowResponseError] = useState(false);

    useEffect(() => {

        const usernameRegex = /^[A-Za-z0-9_]{4,16}$/;
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,24}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/;

        const validateForm = ()=> {
            if (userName === "") {
               setMessage("");
               setShowResponseError(false);
               return;
            }
            if (!usernameRegex.test(userName)) {
               setMessage("Username must be 4-16 characters long and can only contain letters, numbers, and underscores.");
               setShowResponseError(false);
               setIsFormValid(false);
               return;
            }

            if (!emailRegex.test(email)) {
               setMessage("Please enter a valid email address.");
               setShowResponseError(false);
               setIsFormValid(false);
               return;
            }

            if (password !== passwordRe) {
               setMessage("Passwords don't match!");
               setShowResponseError(false);
               setIsFormValid(false);
               return;
            }

            if (!passwordRegex.test(password)) {
               setMessage("Password must be 8-32 characters long, contain at least one letter, one number, and one special character.");
               setShowResponseError(false);
               setIsFormValid(false);
               return;
            }

            if (!showResponseError) {
               setMessage("");
            }

            setIsFormValid(true);
       }

       validateForm();
    }, [userName, email, password, passwordRe, isFormValid, showResponseError]);

    const handleSignUp = async () => {
        if (isFormValid) {
            const error = await new UserClient().userSignup(userName, email, password);

            if (!error) {
                window.location.href = "/profile";
            }

            setShowResponseError(true);
            setMessage(error);
        }
    };

    return (
        <div className="SignUpPage">

            <div className="headerSignUp">
                <h1 style={{
                    textShadow: "2px 2px #C9FE71",
                    color: "#000000",
                    fontSize: "40px",
                    fontFamily: "Arial",
                    fontWeight: "bold"
                }}>Sign Up</h1>
            </div>

            <div className="bodySignUp">

                <div className="formContainer">
                    <form onSubmit={(e) =>{e.preventDefault();}}>
                        <label htmlFor="username">Username:</label><br/>
                        <input type="text" id="username" name="username" onChange={(e)=>setUserName(e.target.value)}/><br/><br/>

                        <label htmlFor="email">Email:</label><br/>
                        <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/><br/><br/><br/>

                        <label htmlFor="password">Password:</label><br/>
                        <input type="password" id="password_1" name="password" onChange={(e) => setPassword(e.target.value)}/><br/><br/>

                        <label htmlFor="password">Repeat Password:</label><br/>
                        <input type="password" id="password_2" name="password" onChange={(e) => setPasswordRe(e.target.value)}/><br/><br/><br/>
                        <span id="messageContainer" style={{width:"200px", color:"red", fontSize: "14px", marginBottom: "30px", display:"block"}}>{message}</span>
                        <input type="submit" id="submitButton" value="Submit" onClick={handleSignUp}/>
                    </form>
                </div>


                <div className="carlosContainer">

                    <div className='speech-bubble'>
                        Choose a username that fits to your cooking profile.<br/><br/>
                        Insert your Email to confirm your account.<br/><br/>
                        Your password must have more than 6 symbols and at least 1 special symbol.<br/><br/>
                    </div>

                    <div className="carlos-image">
                        <img className="chef-carlos" src={chef} alt="chef"/>
                    </div>


                </div>

            </div>

        </div>
    );
}