import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';



export default function FloatingActionButtons() {

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Fab color="primary" aria-label="edit">
                <EditIcon />
            </Fab>
            <Fab color="error" aria-label="like">
                <FavoriteIcon />
            </Fab>
        </Box>

    );
}