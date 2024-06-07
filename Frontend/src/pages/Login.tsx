import "../style/Welcome.css"
import React, {useState} from "react";
import "../style/Login.css"
import chef from "../assets/Chef_Carlo_without_background (1).png";
import {UserClient} from "../clients/UserClient";


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const result = await new UserClient().userLogin(email, password);

        if (result === 200) {
            setMessage("Login successful!");

            window.location.href = "/profile";
        } else {
            setMessage("Login failed!");
        }
    };

    return (
        <div id="LoginPage">


            <div id="BodyLeft">
                <div id="FormContainer">

                    <div className="InputMail">
                        <label
                            form="exampleInputEmail1" onSubmit={e => e.preventDefault()}
                            className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={event => setEmail(event.target.value)}></input>
                    </div>

                    <div className="InputPassword">
                        <label
                            htmlFor="exampleInputPassword1"
                            className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={event => setPassword(event.target.value)}></input>
                    </div>
                    <div id="messageContainer" style={{fontSize: 20, color: "red"}}>{message}</div>
                    <button className="SubmitButton" onClick={handleLogin}>
                        Submit
                    </button>
                    <br/>
                    <h3 className={"sign-up"}>
                        <span>Don't have an account yet?</span>
                    </h3>
                    <a className="SignUpLink" href='/signup'>Sign up</a>

                </div>

            </div>


            <div id="BodyRight">

                <div className='bubble'>
                    <span>
                        Ready to dive into a world of culinary delights? <br/>
                        Log in to get access to a treasure trove of recipes, cooking tips, and foodie inspiration. <br/>
                        Join our community of cooking enthusiasts and elevate your kitchen experience. <br/>
                        Whether it's your first time here or you're returning for more culinary adventures, we're thrilled to have you aboard.
                        <br/>
                        <br/>
                        Let's get coooooking!
                    </span>
                </div>


                    <img src={chef} className="Chef-Carlo2" alt="chef"></img>


            </div>

        </div>
    );
}