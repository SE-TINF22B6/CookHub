import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [

    {
        value: 'vegetarian',
        label: 'vegetarian',
    },
    {
        value: 'vegan',
        label: 'vegan',
    },
    {
        value: 'low carb',
        label: 'Lauch-Nahrung',
    },
    {
        value: 'salad',
        label: 'Bizeps-Schrumpf',
    },
    {
        value: 'unknown',
        label: 'Anything normal I guess',
    },
    {
        value: '100% meat',
        label: 'Murica F*ck Yeah!',
    }
    ];

export default function CreateRecipeBlank() {
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
                <TextField
                    id="filled-select-currency"
                    select
                    label="Select your food type"
                    defaultValue="EUR"
                    variant="filled"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </Box>
    );
}