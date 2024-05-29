import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';


import {RecipeDataParams} from "../models/RecipeDataParams";





export default function InfoTable(data: RecipeDataParams) {
    let recipe = data;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <TableContainer component={Paper}
                        sx={{
                            minWidth: isSmallScreen ? 300 : 800, // Kleinere Mindestbreite für kleine Bildschirme
                            minHeight: 400
                        }}
        >
            <Table sx={{minWidth: 200}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#c7fc70'}}>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Creator</TableCell>
                        <TableCell align="right">Likes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipe.data?.adventureTexts.map((text) => {
                        let result = text?.split('\n',1)[0];
                        return(
                        <TableRow

                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >

                            <TableCell component="th" scope="row">
                                {result}
                            </TableCell>
                            <TableCell align="right">{recipe.data?.creatorName}</TableCell>
                            <TableCell align="right">{recipe.data?.likeCount}</TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
