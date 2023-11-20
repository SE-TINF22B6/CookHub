import pic1 from "./assets/Landingpage_noodles_in_bowl.svg";
import pic2 from "./assets/Landingpage_noodles_with_basi.svg";
import pic3 from "./assets/Landingpage_meat_pieces.svg";
import React from "react";
import './Frontend.css';
import logo from "./assets/Logo_no_background.svg";

export default function LandingPage() {
    return (
        <div className="LandingPage">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    <li><a className='FAQs-link' target="_self" href='faqs'>FAQ's</a></li>
                    <li><a className='About-link' target="_self" href='about'>About us</a></li>
                    <li><a className='Impressum-link' target="_self" href='impressum'>Impressum</a></li>
                </ul>
                <a className='Login-link' target="_self" href='login'>Login</a>

            </header>
            <div className="body">
                <h2>
                    Tired of standing in front of the stove feeling bored, cooking the same recipes? Welcome to our
                    exciting cooking app, where culinary adventures await! Explore a world of flavor explosions and
                    creative recipes that will elevate your cooking skills. Ready for the adventure in your kitchen?
                    Let's cook together!
                </h2>

                <img src={pic1} className="Landingpage_noodles_in_bowl" alt="bowl"/>
                <img src={pic2} className="Landingpage_noodles_with_basi" alt="basel"/>
                <img src={pic3} className="Landingpage_meat_pieces" alt="meat"/>


            </div>
        </div>
    );
}