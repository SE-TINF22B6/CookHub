import React from "react";
import "../style/FindRecipes.css";
import {RecipeClient} from "../clients/RecipeClient";
import Button from "@mui/material/Button";

export default function FindRecipes() {


    function findBtn():void{
        let client : RecipeClient = new RecipeClient();
        client.getRecipeByName("Pizza");
    }

    function findAll():void {
        const client = new RecipeClient();
        client.getAllRecipes();
    }


    return (

        <div className="RecipeBrowser" >
            <Button onClick={findBtn}>
                Find Pizza
            </Button>
            <Button onClick={findAll}>
                Find all Recipes
            </Button>
        </div>

    );
}