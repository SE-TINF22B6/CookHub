import React from "react";
import Accordion from "react-bootstrap/Accordion"
import "../style/FAQs.css";

export default function FAQsPage() {
    return (
        <div className="FAQPage">

            <div className="QA">
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
        </div>
    );

}
