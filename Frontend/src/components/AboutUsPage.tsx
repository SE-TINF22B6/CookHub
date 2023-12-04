import team from "../assets/CookHub_Team_&_Roles.png";
import '../design/AboutUsPage.css';
import React from "react";
import logo from "../assets/Logo_no_background.svg";

export default function AboutUsPage(){
    return(
        <div className="AboutUsPage">


            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    <a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a>
                    <a className='About-link' target="_self" href='/about'>About us</a>
                    <a className='Impressum-link' target="_self" href='/impressum'>Impressum</a>
                </ul>
            </header>


            <div className="body">

                <img src={team} className="Team_Roles" alt="team" width="1000" height="500"/>
                <br/>
                <ul>
                    <li><a className='LandingPage' target="_self" href='/'>Welcome</a></li>
                    <li><a href='/login'>Login</a></li>
                    <li><a href='/faqs'>FAQ's</a></li>
                    <li><a href='/impressum'>Impressum</a></li>
                </ul>
            </div>

        </div>
    );
}