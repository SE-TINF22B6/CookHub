import logo from "./assets/Logo_no_background.svg";
import React from "react";

export default function AboutUsPage(){
    return(
        <div className="AboutUsPage">
            <header className="header">
                <title>About us</title>
            </header>
            <div className="body">
                <h1>About us</h1>
                <br/>
                <img src={logo} className="App-logo" alt="logo"/>
                <br/>
                <li><a href='login'>Login</a></li> <li>
                <a href='faqs'>FAQ's</a></li>
                <li><a href='about'>About us</a></li>
            </div>

        </div>
    );
}