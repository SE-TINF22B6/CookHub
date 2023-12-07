import chef from "../assets/Chef_Carlo_without_background (1).png";
import React from "react";
import '../style/Welcome.css';
import logo from "../assets/Logo_no_background.svg";
import Item from "@mui/material/Grid";
import Grid from "@mui/material/Grid";

export default function Welcome() {
    return (
        <div className="LandingPage">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    <a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a>
                    <a className='About-link' target="_self" href='/about'>About us</a>
                    <a className='Impressum-link' target="_self" href='/impressum'>Impressum</a>
                </ul>
            </header>

            <div className="LandingBody">

                <Grid className='Stack' container spacing={2}>
                    <Grid item md={6}>
                        <Item>
                            <h1 className="Landingpage_title">
                            Start your Cooking <br/> Adventure
                            </h1>
                            <br/>
                            <p className="Landingpage_text">
                                Tired of standing in front of the stove feeling bored, cooking the same recipes?
                                Welcome to our exciting cooking app, where culinary adventures await!
                                Explore a world of flavor explosions and creative recipes that will elevate your cooking skills.
                                Ready for the adventure in your kitchen?
                                Let's cook together!
                            <br/>
                                <a className="Login-link" target="_self" href='/login'>Start Journey</a>
                            </p>
                        </Item>
                    </Grid>

                    <Grid item md={6}>
                        <Item>
                            <img src={chef} className="Chef" alt="chef" width="500vw" height="500vw"/>
                        </Item>

                    </Grid>
                </Grid>

            </div>
        </div>
    );
}