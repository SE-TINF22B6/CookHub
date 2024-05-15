import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CreateRecipeBlank from '../components/CreateRecipeBlank';

export default function FormPropsTextFields() {
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
                <CreateRecipeBlank/>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="filled-helperText"
                        label="Name of the recipe"
                        defaultValue=""
                        variant="filled"
                    />

                    <TextField
                        id="filled-helperText"
                        label="≈ costs to expect (€)"
                        defaultValue=""
                        variant="filled"
                        helperText=""
                    />

                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <TextField
                        id="filled-number"
                        label="Preparation Time (min)"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />
                    <TextField
                        id="filled-number"
                        label="Cooking Time (min)"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />

                </div>
            </div>
        </Box>
    );
}
