import logo from "./assets/Logo_no_background.svg";
import React from "react";

export default function FAQsPage(){
    return(
        <div className="FAQPage">
            <header className="header">
                <title>FAQ's</title>
            </header>
            <div className="body">

                <h1>FAQ's</h1>

                <h2>Do I need an account to use the app?</h2>
                <p>You don't need an account to use the basic functions of the app. But you need one if you want to save and manage your own recipes or your favourites.</p>

                <h2>Do I have to pay for an account?</h2>
                <p>No, you don't have to pay for an account. It's free.</p>

                <h2>Can I use the app on my phone?</h2>
                <p>Yes, you can use the app on your phone. It's optimized for mobile devices.</p>

                <h2>How do I find recipes based on ingredients I already have?</h2>
                <p>In the app, you can input the ingredients you have on hand, and the app will suggest recipes that can be made with those ingredients.</p>

                <h2>Can I save my favorite recipes for easy access?</h2>
                <p>Yes, the app allows you to save your favorite recipes in a personalized cookbook section for quick and easy access.</p>

                <h2>Is there a feature to adjust recipe servings?</h2>
                <p>The app includes a feature that allows you to adjust the servings for a recipe, and it automatically recalculates the ingredient quantities needed.</p>

                <h2>How can I find recipes that cater to specific dietary needs?</h2>
                <p>The app has filters that let you search for recipes based on dietary preferences such as vegetarian, vegan, gluten-free, keto, etc.</p>

                <h2>Can I create a shopping list from a recipe?</h2>
                <p>Yes, you can generate a shopping list directly from a recipe, which includes all the necessary ingredients in the right quantities.</p>

                <h2>Are there video tutorials available for the recipes?</h2>
                <p>Some recipes come with video tutorials that guide you step-by-step through the cooking process.</p>

                <h2>How do I share a recipe with friends or family?</h2>
                <p>The app provides options to share recipes through various platforms like email, social media, or directly within the app.</p>

                <h2>Is there a way to track my nutritional intake?</h2>
                <p>The app may offer a feature to track nutritional information for each recipe, helping you keep track of your dietary intake.</p>

                <h2>How often are new recipes added to the app?</h2>
                <p>New recipes are added regularly, ensuring a diverse and up-to-date selection.</p>

                <h2>Can I submit my own recipes to the app?</h2>
                <p>Depending on the app's features, you might be able to submit your own recipes and share them with the app community.</p>

                <img src={logo} className="App-logo" alt="logo"/>

                <ul>
                    <li><a className='LandingPage' target="_self" href='/'>Welcome</a></li>
                    <li><a href='/login'>Login</a></li>
                    <li><a href='/about'>About us</a></li>
                    <li><a href='/impressum'>Impressum</a></li>
                </ul>


            </div>

        </div>
    );
}