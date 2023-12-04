import logo from "../assets/Logo_no_background.svg";
import "../design/LandingPage.css"
import React, {useState} from "react";
import "../design/LoginPage.css"
import chef from "../assets/Chef_Carlo_without_background (1).png";
import {UserClient} from "../clients/UserClient";

export default function LoginPage() {

    let email = '';
    let password = '';
    let [message, setMessage] = useState('');

    return (
        <div className="LoginPage">
            <header className="App-header">
                <a href="/">
                    <img src={logo} className="App-logo" alt="logo"/>
                </a>

                <ul>
                    <li><a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a></li>
                    <li><a className='About-link' target="_self" href='/about'>About us</a></li>
                    <li><a className='Impressum-link' target="_self" href='/impressum'>Impressum</a></li>
                </ul>
            </header>

            <div className="container LoginPageBody text-center">

                <div className="row">

                    <div className="col-6">
                        {/*<h1 className="StartAdventure">Start your Eatventure!</h1><br/><br/>*/}

                        <div className="EnterInformation">

                            <form className={"container col-md-6"}>
                                <div className="InputMail">
                                    <label form="exampleInputEmail1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           aria-describedby="emailHelp"
                                           onInput={event => email = event.currentTarget.value}></input>
                                </div>
                                <div className="InputPassword">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1"
                                            onInput={event => password = event.currentTarget.value}></input>
                                </div>
                                <div style={{fontSize: 12}}>{message}</div>

                                <input type="button" className="SubmitLogin" value="Submit"
                                   onClick={() => new UserClient().sendLoginRequest(email, password).then(response => setMessage(JSON.parse(response)))}/>
                            </form>

                            <br/>

                            <h3>
                                <span style={{fontSize: 12}}>Don't have an account yet?</span>
                                <br/>
                                <a className="SubmitButton" href='/signup'>Sign up</a>
                            </h3>
                        </div>
                    </div>


                    <div className="col-6">

                        <div className='speech-bubble'>
                            <span style={{color:'#C9FE71', backgroundColor:'lightgrey', fontWeight:'bold'}}>Ready</span> to dive into a world of culinary delights? <br/>
                            <span style={{color:'#C9FE71', backgroundColor:'lightgrey', fontWeight:'bold'}}>Log in</span> to get access to a treasure trove of recipes,
                            cooking tips, and foodie inspiration. <br/>
                            <span style={{color:'#C9FE71', backgroundColor:'lightgrey', fontWeight:'bold'}}>Join</span> our community of cooking enthusiasts
                            and elevate your kitchen experience. Whether it's your first time here or you're
                            returning for more culinary adventures, we're thrilled to have you aboard. <br/> <br/>
                            <span style={{color:'#C9FE71', backgroundColor:'lightgrey', fontWeight:'bold'}}>Let's get coooooking!
                            </span>
                        </div>

                        <h2 className="LoginPageText"> </h2>

                        <div className="Loginpage_images">
                            <img src={chef} className="Chef-Carlo2" alt="chef" />
                        </div>

                    </div>


                </div>


            </div>
        </div>
    );
}