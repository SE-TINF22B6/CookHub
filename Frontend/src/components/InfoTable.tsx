import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    ingredient: string,
    quantity: string,
    usage: string,
    substitute: string,
) {
    return { ingredient, quantity, usage, substitute };
}


const rows = [
    createData('Ramen Noodles', '250g', 'Cooked, base of the soup', 'Soba Noodles'),
    createData('Vegetable Broth', '1.5l', 'Base of the soup', 'Chicken Broth'),
    createData('Miso', '50g', 'Flavor enhancer for the broth', 'Tahini'),
    createData('Eggs', '4 pcs', 'Halved as topping', 'Tofu'),
    createData('Mushrooms', '120g', 'Cooked, as topping', 'Tofu'),
    createData('Pak Choi', '2 pcs', 'Cooked, as topping', 'Spinach'),
    createData('Spring Onion', '1 pc', 'Chopped as topping', 'Chives'),
    createData('Ginger', '2cm', 'Finely chopped in broth', 'Ground Ginger'),
    createData('Garlic Cloves', '2 pcs', 'Finely chopped in broth', 'Garlic Powder'),
    createData('Soy Sauce', '2 tbsp', 'Mixed in broth', 'Tamari'),
    createData('Sesame Oil', '2 tbsp', 'In broth and as topping', 'Canola Oil'),
    createData('Apple Vinegar', '1 tbsp', 'Mixed in broth', 'Rice Vinegar'),
    createData('Sesame', '1 tbsp', 'Sprinkled as topping', 'Flax Seeds'),

];

export default function InfoTable() {
    return (
        <TableContainer component={Paper} sx={{minWidth: 1090, minHeight: 400}}>
            <Table sx={{ minWidth: 200,}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#c7fc70' }}>
                        <TableCell>Ingredient</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Usage</TableCell>
                        <TableCell align="right">Substitute</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.ingredient}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.ingredient}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.usage}</TableCell>
                            <TableCell align="right">{row.substitute}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}