import "../style/Welcome.css"
import React, {useState} from "react";
import "../style/Login.css"
import chef from "../assets/Chef_Carlo_without_background (1).png";
import {UserClient} from "../clients/UserClient";

export default function Login() {

    let email = '';
    let password = '';
    let [message, setMessage] = useState('');

    return (
        <div id="LoginPage">
            <div id="LoginPageBody">
                <div className="Item">
                    <div id="LoginPageBodyLeft">
                        <div className="EnterInformation">
                            <div className="InputMail">
                                <label
                                    form="exampleInputEmail1"
                                    className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onInput={event => email = event.currentTarget.value}></input>
                            </div>
                            <div className="InputPassword">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    onInput={event => password = event.currentTarget.value}></input>
                            </div>
                            <div style={{fontSize: 12}}>{message}</div>
                            <input
                                type="button"
                                className="SubmitLogin"
                                value="Submit"
                                onClick={() =>
                                    new UserClient().sendLoginRequest(email, password).then(
                                        response => setMessage(JSON.parse(response)))}/>
                            <br/>
                            <h3>
                                <span style={{fontSize: 18}}>Don't have an account yet?</span>
                                <br/>
                                <a className="SubmitButton" style={{fontSize: 20}} href='/signup'>Sign up</a>
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="Item">
                    <div id="LoginPageBodyRight">
                        <div className='speech-bubble'>
                            <span
                                style={{
                                    color: '#C9FE71',
                                    backgroundColor: '#262525FF',
                                    fontWeight: 'bold',
                                    textShadow: '3'
                                }}>
                                Ready to dive into a world of culinary delights? <br/>
                                Log in to get access to a treasure trove of recipes, cooking tips, and foodie inspiration. <br/>
                                Join our community of cooking enthusiasts and elevate your kitchen experience. <br/>
                                Whether it's your first time here or you're returning for more culinary adventures, we're thrilled to have you aboard.
                                <br/><br/>
                                Let's get coooooking!
                            </span>
                        </div>
                        <div className="Chef-Carlos">
                            <img src={chef} className="Chef-Carlo2" alt="chef"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}