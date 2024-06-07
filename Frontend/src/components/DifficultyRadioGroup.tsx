import * as React from 'react';
import "../style/DifficultyRadioGroup.css";
import {CreateRecipeModel} from "../models/CreateRecipeModel";
import {useEffect} from "react";

export default function DifficultyRadioGroup(data: {recipe: CreateRecipeModel, setRecipe: React.Dispatch<React.SetStateAction<CreateRecipeModel>>}) {
    const {recipe, setRecipe} = data;
    const setDifficulty = (value: number) => setRecipe({...recipe, difficulty: value});

    useEffect(() => {
        setDifficulty(50); // default value
    });

    return (

        <fieldset
            className={"difficultyRadioGroup"}
            style={{textAlign: 'left'}}
        >

            <div>
                <input type="radio" id="unpack" name="radio-group" value="0" onClick={() => setDifficulty(0)}/>
                <label htmlFor="unpack" style={{marginLeft: '10px'}}>Unpack & eat</label>
            </div>
            <div>
                <input type="radio" id="kitchen" name="radio-group" value="25" onClick={() => setDifficulty(25)}/>
                <label htmlFor="kitchen" style={{marginLeft: '10px'}}>I know where the kitchen is</label>
            </div>
            <div>
                <input type="radio" id="pizza" name="radio-group" value="50" onClick={() => setDifficulty(50)} defaultChecked={true}/>
                <label htmlFor="pizza" style={{marginLeft: '10px'}}>Mid</label>
            </div>
            <div>
                <input type="radio" id="ketchup" name="radio-group" value="75" onClick={() => setDifficulty(75)}/>
                <label htmlFor="ketchup" style={{marginLeft: '10px'}}>I know what I'm doing</label>
            </div>
            <div>
                <input type="radio" id="ramsay" name="radio-group" value="100" onClick={() => setDifficulty(100)}/>
                <label htmlFor="ramsay" style={{marginLeft: '10px'}}>Gordon Ramsay is my dad</label>
            </div>

        </fieldset>

    );
}
