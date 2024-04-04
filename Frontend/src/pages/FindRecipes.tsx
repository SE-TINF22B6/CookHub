import Grid from '@mui/material/Grid';
import React from "react";
import "../style/FindRecipes.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "../components/ComplexCard";

function generateCards(numCards: number) {
    let cards = [];
    for (let i = 0; i < numCards; i++) {
        cards.push(
            <Col xs={12} sm={6} md={4} lg={3} key={i}>
                <Card/>
            </Col>
        );
    }
    return cards;
}


export default function FindRecipes() {
    let cards = generateCards(12);
    return (
        <div className="RecipeBrowser-Container">
            <div className="header">
                <h1>RECIPE BROWSER</h1>
                <input type="text" placeholder="Search" id="outlined-basic" className="search-input"/>
            </div>
            <Row className="cards-container">
                {cards}
            </Row>
        </div>
    );
}