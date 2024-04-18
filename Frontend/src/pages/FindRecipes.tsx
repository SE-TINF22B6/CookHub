import React, {useState} from "react";
import "../style/FindRecipes.css";
import {RecipeClient} from "../clients/RecipeClient";
import Button from "@mui/material/Button";

export default function FindRecipes() {

    const [data, setData] = useState<any[]>([]);

    async function findBtn(name: string) {
        let client: RecipeClient = new RecipeClient();
        setData(await client.getRecipeByName(name));
    }

    async function findAll() {
        const client = new RecipeClient();
        setData(await client.getAllRecipes());
    }


    return (

        <div className="RecipeBrowser" >
            <Button onClick={()=>findBtn("Pizza")}>
                Find Pizza
            </Button>
            {data ? (
                <div>
                    {data.map(el =>
                        <ul>
                        <li>{el.id}</li>
                        <li>{el.name}</li>
                        <li>{el.creationDate}</li>
                        <li>{el.ingredients}</li>
                    </ul>
                    )}
                </div>
            ) : (
                <div>Loading...</div>
            )}
            <Button onClick={findAll}>
                Find all Recipes
            </Button>
        </div>

    );
}