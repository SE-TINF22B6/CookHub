import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
    {
        value: 0,
        label: 'unpack & eat',
    },
    {
        value: 25,
        label: 'I know where the kitchen is',
    },
    {
        value: 50,
        label: 'stove = pizza',
    },
    {
        value: 75,
        label: 'ketchup isn\'t a spice',
    },
    {
        value: 100,
        label: 'Gordon Ramsay is my dad',
    },
];

function valuetext(value: number) {
    return `Level ${value}`;
}

export default function DiscreteSliderLabel() {
    return (
        <Box sx={{ width: 800 }}>
            <Slider
                aria-label="Always visible"
                defaultValue={50}
                getAriaValueText={valuetext}
                step={25}
                marks={marks}
                valueLabelDisplay="on"
            />
        </Box>
    );
}
