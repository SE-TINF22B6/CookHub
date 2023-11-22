import pic1 from "./assets/Landingpage_noodles_in_bowl.svg";
import pic2 from "./assets/Landingpage_noodles_with_basi.svg";
import pic3 from "./assets/Landingpage_meat_pieces.svg";
import chef from "./assets/Chef_Carlo_without_background (1).png";
import React from "react";
import './Frontend.css';
import logo from "./assets/Logo_no_background.svg";

export default function LandingPage() {
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

            <div className="body">
                <h1 className="Landingpage_title">
                    Start your Cooking <br/> Adventure
                </h1> <br/>

                <p className="Landingpage_text">
                    Tired of standing in front of the stove feeling bored, cooking the same recipes?
                    Welcome to our exciting cooking app, where culinary adventures await!
                    Explore a world of flavor explosions and creative recipes that will elevate your cooking skills.
                    Ready for the adventure in your kitchen?
                    Let's cook together!<br/>

                    <a className="Start-Journey" target="_self" href='/login'>Start Journey</a>
                </p>
            </div>
            <div className="Landingpage_images">
                <div className="Upper_pics">
                    <ul>
                        <li><img src={chef} className="Chef_Carlo" alt="chef"/></li>
                        <li><img src={pic1} className="Landingpage_noodles_in_bowl" alt="bowl"/></li>
                    </ul>
                </div>
                <div className="Lower_pics">
                    <ul>
                        <li><img src={pic2} className="Landingpage_noodles_with_basi" alt="basel"/></li>
                        <li><img src={pic3} className="Landingpage_meat_pieces" alt="meat"/></li>
                    </ul>
                </div>
            </div>

        </div>
    );
}