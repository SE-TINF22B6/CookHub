import logo from "./assets/Logo_no_background.svg";
import React from "react";
import "./FAQsPage.css"

export default function FAQsPage(){
    return(
        <div className="FAQPage">

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    <a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a>
                    <a className='About-link' target="_self" href='/about'>About us</a>
                    <a className='Impressum-link' target="_self" href='/impressum'>Impressum</a>
                </ul>
            </header>


            <div className="container-lg">

                <h1>FAQ's</h1>

                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Do I need an account to use the app?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>You don't need an account to use the basic functions of the app.</strong>
                                But you need one if you want to save and manage your own recipes or your favourites.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Do I have to pay for an account?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>No, you don't have to pay for an account.</strong> It's free.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Can I save my favorite recipes for easy access?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Yes</strong> , the app allows you to save your favorite recipes in a personalized cookbook section for quick and easy access.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Can I create a shopping list from a recipe?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Yes</strong>, you can generate a shopping list directly from a recipe, which includes all the necessary ingredients in the right quantities.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Can I create a shopping list from a recipe?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse"
                             data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>Yes</strong>, you can generate a shopping list directly from a recipe, which includes all the necessary ingredients in the right quantities.
                            </div>
                        </div>
                    </div>

                </div>



                {/*<h2>Can I use the app on my phone?</h2>*/}
                {/*<p>Yes, you can use the app on your phone. It's optimized for mobile devices.</p>*/}

                {/*<h2>How do I find recipes based on ingredients I already have?</h2>*/}
                {/*<p>In the app, you can input the ingredients you have on hand, and the app will suggest recipes that can be made with those ingredients.</p>*/}

                {/*<h2>C</h2>*/}
                {/*<p>Yes, the app allows you to save your favorite recipes in a personalized cookbook section for quick and easy access.</p>*/}

                {/*<h2>Is there a feature to adjust recipe servings?</h2>*/}
                {/*<p>The app includes a feature that allows you to adjust the servings for a recipe, and it automatically recalculates the ingredient quantities needed.</p>*/}

                {/*<h2>How can I find recipes that cater to specific dietary needs?</h2>*/}
                {/*<p>The app has filters that let you search for recipes based on dietary preferences such as vegetarian, vegan, gluten-free, keto, etc.</p>*/}


                {/*<p>Yes, you can generate a shopping list directly from a recipe, which includes all the necessary ingredients in the right quantities.</p>*/}

                {/*<h2>Are there video tutorials available for the recipes?</h2>*/}
                {/*<p>Some recipes come with video tutorials that guide you step-by-step through the cooking process.</p>*/}

                {/*<h2>How do I share a recipe with friends or family?</h2>*/}
                {/*<p>The app provides options to share recipes through various platforms like email, social media, or directly within the app.</p>*/}

                {/*<h2>Is there a way to track my nutritional intake?</h2>*/}
                {/*<p>The app may offer a feature to track nutritional information for each recipe, helping you keep track of your dietary intake.</p>*/}

                {/*<h2>How often are new recipes added to the app?</h2>*/}
                {/*<p>New recipes are added regularly, ensuring a diverse and up-to-date selection.</p>*/}

                {/*<h2>Can I submit my own recipes to the app?</h2>*/}
                {/*<p>Depending on the app's features, you might be able to submit your own recipes and share them with the app community.</p>*/}


            </div>

        </div>
    );
}