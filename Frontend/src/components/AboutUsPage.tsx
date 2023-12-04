import team from "../assets/CookHub_Team_&_Roles.png";
import '../design/AboutUsPage.css';
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