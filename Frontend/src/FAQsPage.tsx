import logo from "./assets/Logo_no_background.svg";
import React from "react";
import Accordion from "react-bootstrap/Accordion"
import "./design/FAQs.css";

export default function FAQsPage() {
    return (
        <div className="FAQPage">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    <a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a>
                    <a className='About-link' target="_self" href='/about'>About us</a>
                    <a className='Impressum-link' target="_self" href='/impressum'>Impressum</a>
                </ul>
            </header>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header> Do I need an account to use the app?</Accordion.Header>
                    <Accordion.Body>
                        <strong>You don't need an account to use the basic functions of the app.</strong>
                        But you need one if you want to save and manage your own recipes or your favourites.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Do I have to pay for an account?</Accordion.Header>
                    <Accordion.Body>
                        <strong>No, you don't have to pay for an account.</strong> It's free.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Can I save my favorite recipes for easy access?</Accordion.Header>
                    <Accordion.Body>
                        <strong>Yes</strong> , the app allows you to save your favorite recipes in a
                        personalized cookbook section for quick and easy access.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Can I create a shopping list from a recipe?</Accordion.Header>
                    <Accordion.Body>
                        <strong>Yes</strong>, you can generate a shopping list directly from a recipe, which
                        includes all the necessary ingredients in the right quantities.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );

}


{/*<h2>Can I use the app on my phone?</h2>*/
}
{/*<p>Yes, you can use the app on your phone. It's optimized for mobile devices.</p>*/
}

{/*<h2>How do I find recipes based on ingredients I already have?</h2>*/
}
{/*<p>In the app, you can input the ingredients you have on hand, and the app will suggest recipes that can be made with those ingredients.</p>*/
}

{/*<h2>C</h2>*/
}
{/*<p>Yes, the app allows you to save your favorite recipes in a personalized cookbook section for quick and easy access.</p>*/
}

{/*<h2>Is there a feature to adjust recipe servings?</h2>*/
}
{/*<p>The app includes a feature that allows you to adjust the servings for a recipe, and it automatically recalculates the ingredient quantities needed.</p>*/
}

{/*<h2>How can I find recipes that cater to specific dietary needs?</h2>*/
}
{/*<p>The app has filters that let you search for recipes based on dietary preferences such as vegetarian, vegan, gluten-free, keto, etc.</p>*/
}


{/*<p>Yes, you can generate a shopping list directly from a recipe, which includes all the necessary ingredients in the right quantities.</p>*/
}

{/*<h2>Are there video tutorials available for the recipes?</h2>*/
}
{/*<p>Some recipes come with video tutorials that guide you step-by-step through the cooking process.</p>*/
}

{/*<h2>How do I share a recipe with friends or family?</h2>*/
}
{/*<p>The app provides options to share recipes through various platforms like email, social media, or directly within the app.</p>*/
}

{/*<h2>Is there a way to track my nutritional intake?</h2>*/
}
{/*<p>The app may offer a feature to track nutritional information for each recipe, helping you keep track of your dietary intake.</p>*/
}

{/*<h2>How often are new recipes added to the app?</h2>*/
}
{/*<p>New recipes are added regularly, ensuring a diverse and up-to-date selection.</p>*/
}

{/*<h2>Can I submit my own recipes to the app?</h2>*/
}
{/*<p>Depending on the app's features, you might be able to submit your own recipes and share them with the app community.</p>*/
}
