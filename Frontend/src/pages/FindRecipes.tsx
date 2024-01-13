import Grid from '@mui/material/Grid';
import React from "react";
import "../style/FindRecipes.css";
import Card from "../components/ComplexCard";

function generateCards() {
    let cards = [];
    for (let i = 0; i < 6; i++) {
        cards.push(
            <Grid item md={4} key={i}>
                <Card/>
            </Grid>
        );
    }
    return cards;
}



export default function FindRecipes() {

    let cards = generateCards();

    return (
        <div className="RecipeBrowser-Container">
            <div className="header">
                <h1>RECIPE BROWSER</h1>
                <input type="text" placeholder="Search" id="outlined-basic" className="search-input"/>
            </div>

            <div className="cards-container">
                {cards}
                {cards}
            </div>
        </div>

    );
}