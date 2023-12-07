import "../style/Welcome.css"
import React, {useState} from "react";
import "../style/Login.css"
import chef from "../assets/Chef_Carlo_without_background (1).png";
import {UserClient} from "../clients/UserClient";
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'

export default function Login() {

    let email = '';
    let password = '';
    let [message, setMessage] = useState('');

    return (

        <div id="LoginPage">
            <Grid id="LoginPageBody" container>
                <Item>
                    <div id="LoginPageBodyLeft">
                        <Grid item md={5}>
                            <div className="EnterInformation">
                                <form className={"container col-md-6"}>
                                    <div className="InputMail">
                                        <label form="exampleInputEmail1" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1"  aria-describedby="emailHelp" onInput={event => email = event.currentTarget.value}></input>
                                    </div>
                                    <div className="InputPassword">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1" onInput={event => password = event.currentTarget.value}></input>
                                    </div>
                                    <div style={{fontSize: 12}}>{message}</div>
                                    <input type="button" className="SubmitLogin" value="Submit" onClick={() => new UserClient().sendLoginRequest(email, password).then(response => setMessage(JSON.parse(response)))}/>
                                </form>
                                <br/>
                                <h3>
                                    <span style={{fontSize: 18}}>Don't have an account yet?</span>
                                    <br/>
                                    <a className="SubmitButton" style={{fontSize: 20}} href='/signup'>Sign up</a>
                                </h3>
                            </div>

                        </Grid>
                    </div>
                </Item>

                <Item>
                    <div id="LoginPageBodyRight">
                        <Grid item md={7}>
                            <div className='speech-bubble'>
                                <span style={{color:'#C9FE71', backgroundColor:'#262525FF', fontWeight:'bold', textShadow: '3'}}>Ready</span> to dive into a world of culinary delights? <br/>
                                <span style={{color:'#C9FE71', backgroundColor:'#262525FF', fontWeight:'bold'}}>Log in</span> to get access to a treasure trove of recipes,
                                cooking tips, and foodie inspiration. <br/>
                                <span style={{color:'#C9FE71', backgroundColor:'#262525FF', fontWeight:'bold'}}>Join</span> our community of cooking enthusiasts
                                and elevate your kitchen experience. Whether it's your first time here or you're
                                returning for more culinary adventures, we're thrilled to have you aboard. <br/> <br/>
                                <span style={{color:'#C9FE71', backgroundColor:'#262525FF', fontWeight:'bold'}}>Let's get coooooking!</span>
                            </div>
                            <h2 className="LoginPageText"> </h2>
                            <div className="Loginpage_images">
                                <img src={chef} className="Chef-Carlo2" alt="chef" />
                            </div>
                        </Grid>
                    </div>
                </Item>

            </Grid>
        </div>

    );
}