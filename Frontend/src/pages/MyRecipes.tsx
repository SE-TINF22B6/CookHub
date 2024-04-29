import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import React from "react";
import "../style/MyRecipes.css";
import Ramen from "../assets/recipes/recipe_Ramen_01_23.jpg";
import Rating from "../components/Rating";
import RD from "../helpers/RecipesDB_Simulator";
import InfoTable from "../components/InfoTable";
import AdventurizeIt from "../assets/fillElements/Adventurizeit_btn.png"


// Just a try to get the data from the DB_Fetcher
let recipe = RD.map((recipe) => {
    console.log(recipe);
    console.log(recipe.name);
    console.log(recipe.preparationTime);
    console.log(recipe.cookingTime);
    console.log(recipe.difficulty);
    console.log(recipe.ingredients);
    console.log(recipe.instructions);
    console.log(recipe.rating);
    return recipe.toString();
});

console.log(recipe);

const name = "Klassische Ramensuppe";


export default function MyRecipes() {
    return (

        <div className="MainContainer">

            <div id={"Top-Container"}>

                <div id={"Top-Left-Container"}>
                    <img id="RecipeImage" src={Ramen} alt="Gute_Rahmenbedingungen"/>
                </div>

                <div id={"Top-Right-Container"}>

                    <h1>🗇 {name} </h1>

                    {/* TODO: Replace star rating with heart/thumb */}
                    <Rating/>
                    <br/>
                    <span className={"infoText"}>
                            {/* TODO: implement logic to get data from db */}
                        <p>Preparation Time: {}</p>
                            <p>Cooking Time: 15min</p>
                            <p>Difficulty: Easy</p>
                            <p>Rating: 4.5</p>
                        </span>
                    <br/>
                </div>

            </div>


            <div id={"Middle-Container"}>

                <div id={"Middle-Left-Container"}>
                    <h2>Ingredients:</h2>
                    <br/>
                    <FormControl fullWidth style={{maxWidth: 150}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Select Number of Portions
                        </InputLabel>
                        <NativeSelect
                            defaultValue={1}
                            inputProps={{
                                name: 'number of portions',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </NativeSelect>
                    </FormControl>
                    <br/>
                    <br/>
                    {/* TODO: implement logic to get ingredients of recipe out of db */}
                    <ul>
                        <li>120 g Pilze</li>
                        <li>2,0 cm Ingwer</li>
                        <li>2 Knoblauchzehen</li>
                        <li>2 Pak Choi</li>
                        <li>1 Frühlingszwiebel</li>
                        <li>4 Eier</li>
                        <li>2 EL Sesamöl</li>
                        <li>50 g Misopaste</li>
                        <li>2 EL Sojasauce</li>
                        <li>1 EL Apfelessig</li>
                        <li>1,5 l Gemüsebrühe</li>
                        <li>250 g Ramen-Nudeln</li>
                        <li>1 EL Sesamsamen</li>
                    </ul>
                </div>

                <div id={"Middle-Right-Container"}>
                    <h2>Instruction:</h2>
                    <br/>
                    <span id="InstructionText" style={{color: "black"}}>
                            <strong>Gemüse vorbereiten:</strong><br/>
                            Pilze vierteln; Ingwer und Knoblauch fein hacken.
                            Pak Choi in Streifen und Frühlingszwiebel in Ringe
                            schneiden. <br/>

                            <strong>Eier kochen:</strong><br/>
                            Eier 6 Minuten kochen, dann pellen und halbieren.<br/>

                            <strong>Anbraten:</strong><br/>
                            Sesamöl in einem Topf erhitzen. Ingwer und Knoblauch anbraten.<br/>

                            <strong>Brühe zubereiten:</strong><br/>
                            Pilze, Misopaste, Sojasauce, Apfelessig und Gemüsebrühe in den Topf geben.
                            Zum Kochen bringen und 5 Minuten köcheln lassen.<br/>

                            <strong>Nudeln hinzufügen:</strong><br/>
                            Ramen-Nudeln und Pak Choi hinzufügen, 2 Minuten kochen.<br/>

                            <strong>Servieren:</strong><br/>
                            Suppe in Schüsseln verteilen. Je eine halbe Ei hinzufügen, mit
                            Frühlingszwiebelringen und Sesamsamen garnieren.
                        </span>
                </div>

            </div>

            <div id={"Button-Container"}>
                <a href={"https://www.lieferando.de/"} target={"_blank"} rel={"noreferrer"}>
                    <button id={"rageQuitButton"}>
                        Rage Quit
                    </button>
                </a>

                <img id="AdventurizeIt" src={AdventurizeIt} alt="AdventurizeIt" width={"200"}/>


            </div>

            <div id={"Bottom-Container"}>

                <h2 style={{
                    textShadow: "2px 2px #C9FE71",
                    color: "#000000",
                    fontSize: "40px",
                    fontFamily: "Arial",
                    fontWeight: "bold"
                }}>Adventurized Versions:</h2>
                <InfoTable/>

            </div>

        </div>
    );
}
