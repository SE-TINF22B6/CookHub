import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function createData(
    name: string,
    creator: string,
    rating: string,
) {
    return { name, creator, rating};
}


const rows = [
    createData('Ramen Noodles of Death', 'AlphaUser', '⭐⭐⭐⭐'),
    createData('Out of Ramen', 'Cooker69', '⭐⭐'),

];


export default function InfoTable() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <TableContainer component={Paper}
                        sx={{
                            minWidth: isSmallScreen ? 300 : 800, // Kleinere Mindestbreite für kleine Bildschirme
                            minHeight: 400
                        }}
        >
            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#c7fc70' }}>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Creator</TableCell>
                        <TableCell align="right">Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.creator}</TableCell>
                            <TableCell align="right">{row.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
