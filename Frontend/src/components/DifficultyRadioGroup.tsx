import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
    return (
        <FormControl>
            <FormLabel id="difficultyRadioGroup">Choose  the difficulty of the recipe</FormLabel>
            <RadioGroup
                row
                aria-labelledby="Difficulty-Radio-Group"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="unpack & eat" control={<Radio/>} label="unpack & eat"/>
                <FormControlLabel value="I know where the kitchen is" control={<Radio/>} label="I know where the kitchen is"/>
                <FormControlLabel value="stove = pizza" control={<Radio/>} label="stove = pizza"/>
                <FormControlLabel value="ketchup isn't a spice" control={<Radio/>} label="ketchup isn't a spice"/>
                <FormControlLabel value="Gordon Ramsay is my dad" control={<Radio/>} label="Gordon Ramsay is my dad"/>
            </RadioGroup>
        </FormControl>
    );
}
