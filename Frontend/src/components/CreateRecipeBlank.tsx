import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {Chip, FormControl, InputLabel, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {CreateRecipeModel} from "../models/CreateRecipeModel";

const categories = [
    'American',
    'Appetizer',
    'Asian',
    'Breakfast',
    'Burger',
    'Chicken',
    'Dessert',
    'Fish',
    'GlutenFree',
    'Grill',
    'Indian',
    'Italian',
    'Kids',
    'LactoseFree',
    'Mexican',
    'Pasta',
    'Pizza',
    'Protein',
    'Salad',
    'Sandwiches',
    'Seafood',
    'Snacks',
    'Soup',
    'Vegan',
    'Vegetarian'
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function CreateRecipeBlank(data: {recipe: CreateRecipeModel, setRecipe: React.Dispatch<React.SetStateAction<CreateRecipeModel>>}) {
    const {recipe, setRecipe} = data;

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setRecipe({...recipe, categories:
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        });
    };

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >


            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={recipe.categories}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Category" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {categories.map((category) => (
                            <MenuItem
                                key={category}
                                value={category}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Box>
    );
}