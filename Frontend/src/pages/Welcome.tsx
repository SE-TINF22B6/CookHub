import React from "react";
import '../style/Welcome.css';
import chef from "../assets/Chef_Carlo_without_background (1).png";

export default function Welcome() {
    return (

        <div id="LandingPage">

            <div id="LeftContainer">


                <h1 className="title"> Start your Cooking Adventure </h1>
                <br/>
                <p className="text">
                    Tired of standing in front of the stove feeling bored, cooking the same recipes?
                    Welcome to our exciting cooking app, where culinary adventures await!
                    Explore a world of flavor explosions and creative recipes that will elevate your cooking skills.
                    Ready for the adventure in your kitchen?
                    Let's cook together!
                </p>
                <a className="StartJourneyButton"
                   target="_self"
                   href='/login'>Start Journey
                </a>


            </div>


            <div id="RightContainer">

                <div className="ChefAndBackground">
                    <img src={chef} className="Chef" alt="chef"/>
                </div>

            </div>


        </div>
    );
}