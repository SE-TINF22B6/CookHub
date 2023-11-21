import logo from "./assets/Logo_no_background.svg";
import React from "react";

export default function LoginPage(){
    return(
        <div className="LoginPage">
            <header className="header">
                <h1>Login to your adventure!</h1>

            </header>
            <div className="body">
                <img src={logo} className="App-logo" alt="logo" width="500" height="500"/>

                <h2>
                    Ready to dive into a world of culinary delights? <br/>
                    Log in to CookHub to unlock your access to a treasure trove of recipes, <br/>
                    cooking tips, and foodie inspiration. Join our community of cooking enthusiasts <br/>
                    and elevate your kitchen experience. Whether it's your first time here or you're <br/>
                    returning for more culinary adventures, we're thrilled to have you aboard. <br/>
                    Let's get cooking!
                </h2>


                <br/><br/>

                <h3>
                    Please enter your login details:
                </h3>

                <form>
                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <br/>
                    <label>
                        Password:
                        <input type="text" name="password" />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
                </form>

                <br/>

                <h3>
                    Don't have an account yet? <br/>
                    <a href='/signup'>Sign up here!</a>
                </h3>

                <br/><br/><br/><br/>

                <ul>
                    <li><a className='LandingPage' target="_self" href='/'>Welcome</a></li>
                    <li><a href='/faqs'>FAQ's</a></li>
                    <li><a href='/about'>About us</a></li>
                    <li><a href='/impressum'>Impressum</a></li>
                </ul>



            </div>
        </div>

    );
}