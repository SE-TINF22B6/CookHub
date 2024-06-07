import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CreateRecipeBlank from '../components/CreateRecipeBlank';
import {CreateRecipeModel} from "../models/CreateRecipeModel";

export default function FormPropsTextFields(data: {recipe: CreateRecipeModel, setRecipe: React.Dispatch<React.SetStateAction<CreateRecipeModel>>}) {
    const {recipe, setRecipe} = data;

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 0.1, width: '40ch'},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <CreateRecipeBlank recipe={recipe} setRecipe={setRecipe}/>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="filled-helperText"
                        label="Name of the recipe"
                        defaultValue=""
                        variant="filled"
                        onChange={e => setRecipe({...recipe, name: e.target.value})}
                    />

                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="filled-number"
                        label="Preparation Time (min)"
                        type="number"
                        InputProps={{ inputProps: { min: 0}}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                e.preventDefault();
                            }
                        }}
                        variant="filled"
                        onChange={e => setRecipe({...recipe, prepTime: +e.target.value})}
                    />
                    <TextField
                        id="filled-number"
                        label="Cooking Time (min)"
                        type="number"
                        InputProps={{ inputProps: { min: 0}}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onKeyDown={(e) => {
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                                e.preventDefault();
                            }
                        }}
                        variant="filled"
                        onChange={e => setRecipe({...recipe, cookingTime: +e.target.value})}
                    />

                </div>
            </div>
        </Box>
    );
}
