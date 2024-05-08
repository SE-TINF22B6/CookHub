import '../style/SignUp.css';
import * as React from 'react';
import chef from "../assets/Chef_Carlo_without_background (1).png";


export default function SignUp() {
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
                    <form>
                        <label htmlFor="username">Username:</label><br/>
                        <input type="text" id="username" name="username"/><br/><br/>

                        <label htmlFor="email">Email:</label><br/>
                        <input type="email" id="email" name="email"/><br/><br/><br/>

                        <label htmlFor="password">Password:</label><br/>
                        <input type="password" id="password" name="password"/><br/><br/>

                        <label htmlFor="password">Repeat Password:</label><br/>
                        <input type="password" id="password" name="password"/><br/><br/><br/>

                        <input type="submit" value="Submit"/>
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