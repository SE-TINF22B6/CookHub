import * as React from 'react';
import "../style/DifficultyRadioGroup.css";

export default function RowRadioButtonsGroup() {
    return (

        <fieldset
            className={"difficultyRadioGroup"}
            style={{textAlign: 'left'}}
        >

            <div>
                <input type="radio" id="unpack" name="radio-group" value="unpack & eat"/>
                <label htmlFor="unpack" style={{marginLeft: '10px'}}>unpack & eat</label>
            </div>
            <div>
                <input type="radio" id="kitchen" name="radio-group" value="I know where the kitchen is"/>
                <label htmlFor="kitchen" style={{marginLeft: '10px'}}>I know where the kitchen is</label>
            </div>
            <div>
                <input type="radio" id="pizza" name="radio-group" value="stove = pizza"/>
                <label htmlFor="pizza" style={{marginLeft: '10px'}}>stove = pizza</label>
            </div>
            <div>
                <input type="radio" id="ketchup" name="radio-group" value="ketchup isn't a spice"/>
                <label htmlFor="ketchup" style={{marginLeft: '10px'}}>ketchup isn't a spice</label>
            </div>
            <div>
                <input type="radio" id="ramsay" name="radio-group" value="Gordon Ramsay is my dad"/>
                <label htmlFor="ramsay" style={{marginLeft: '10px'}}>Gordon Ramsay is my dad</label>
            </div>

        </fieldset>

    );
}
