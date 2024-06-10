import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import {Chip, FormControl, Input, InputLabel, Select, SelectChangeEvent} from "@mui/material";
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
        <FormControl sx={{ margin: '0.2rem !important', width: '40ch', backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
            <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={recipe.categories}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" sx={{minHeight: 40}} />}
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
    );
}