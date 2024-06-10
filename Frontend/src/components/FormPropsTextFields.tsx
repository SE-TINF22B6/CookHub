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
                <div>
                    <TextField
                      id="filled-helperText"
                      label="Name of the recipe"
                      defaultValue=""
                      variant="filled"
                      onChange={e => setRecipe({...recipe, name: e.target.value})}
                      sx={{ margin: '0.2rem !important' }}
                    />

                    <CreateRecipeBlank recipe={recipe} setRecipe={setRecipe}/>
                </div>

                <div>
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
                        sx={{ margin: '0.2rem !important' }}
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
                        sx={{ margin: '0.2rem !important' }}
                    />

                </div>
            </div>
        </Box>
    );
}
