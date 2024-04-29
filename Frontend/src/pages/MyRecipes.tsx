import {FormControl, InputLabel, NativeSelect} from "@mui/material";
import React, {useEffect, useState} from "react";
import "../style/MyRecipes.css";
import Ramen from "../assets/recipes/recipe_Ramen_01_23.jpg";
import Rating from "../components/Rating";
import RD from "../helpers/RecipesDB_Simulator";
import InfoTable from "../components/InfoTable";
import AdventurizeIt from "../assets/fillElements/Adventurizeit_btn.png"
import {useParams} from "react-router-dom";
import {RecipeClient} from "../clients/RecipeClient";



export default function MyRecipes() {
    let {slug} = useParams();
    const [data, setData] = useState<any>(null);
    const result:any[] = [];



    useEffect(() => {
        async function findRecipe(slug:string|undefined) {
            try {
                let client: RecipeClient = new RecipeClient();
                setData(await client.getRecipeById(Number(slug)));
            } catch (error) {
                console.log("Fehler beim Laden des Rezeptes: ", error);
            }
        }

        if (slug) {
            findRecipe(slug);
        }

    }, [slug]);

    useEffect(() => {
        if(data){
            console.log(data);
        }

    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }


    return (

        <div className="MainContainer">

            <div id={"Top-Container"}>

                <div id={"Top-Left-Container"}>
                    <img id="RecipeImage" src={data.pictureUrl? data.pictureUrl: Ramen} alt="Gute_Rahmenbedingungen"/>
                </div>

                <div id={"Top-Right-Container"}>

                    <h1>🗇 {data.name}</h1>

                    {/* TODO: Replace star rating with heart/thumb */}
                    <Rating/>
                    <br/>
                    <span className={"infoText"}>
                            {/* TODO: implement logic to get data from db */}
                        <p>Preparation Time: {data.prepTime}</p>
                            <p>Cooking Time: {data.cookingTime}</p>
                            <p>Difficulty: {data.difficulty}</p>
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
                        {data.ingredients.length != 0 ?
                            data.ingredients.map((item:any) =>{
                                return <li>item</li>
                            }) : <li>No Ingredients available</li>
                        }

                    </ul>
                </div>

                <div id={"Middle-Right-Container"}>
                    <h2>Instruction:</h2>
                    <br/>
                    <span id="InstructionText" style={{color: "black"}}>
                            {data.instructionText?
                                data.ingredients.map((item:any) =>{
                                    return <p>item</p>
                                }) : <p>No Instruction available</p>
                            }
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
