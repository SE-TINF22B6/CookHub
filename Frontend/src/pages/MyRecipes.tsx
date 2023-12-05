import React from "react";
import "../style/MyRecipes.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from "../components/Rating";
import FloatingActionButtons from "../components/FloatingActionButtons";
import InfoTable from "../components/InfoTable";
import BtnAdvntrz from "../assets/Logos_Icons/Button_Adventurize_it.png"

import Ramen from "../assets/recipes/recipe_Ramen_01_23.jpg";
import Button from '@mui/material/Button';


const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 600,
    height: 565,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    backgroundColor: '#c7fc70',
    textAlign: 'center',
    boxShadow: '4px 4px #000000',
}));

const name = '0815 Ramen';



export default function MyRecipes() {
    return (

        <div className="RecipePage" >

            <p className="NameOfDish">
                <h1 style={{
                    textShadow: "2px 2px #C9FE71",
                    color: "#000000",
                    fontSize: "50px",
                    fontFamily: "Arial",
                    fontWeight: "bold"
                }}>🗇 {name}</h1>
            </p>

            <Box sx={{ flexGrow: 1 }}>
                <Grid className="ContainerTop" container spacing={2}>

                    <Grid className="Row1_left" lg={8}>
                        <Item>
                            <img className="RecipeImage" src={Ramen} alt="Gute_Rahmenbedingungen" />
                        </Item>
                    </Grid>

                    <Grid className="Row1_right" lg={4}>
                        <Item>
                            <Stack direction="row" spacing={2}>
                                <DemoPaper className="InfoCardPaper" square={false}>
                                    <h1>Info Card</h1>
                                </DemoPaper>
                            </Stack>
                        </Item>
                    </Grid>


                    <Grid className="Row2_left" lg={10}>
                        <Item>
                            <Stack direction="row" spacing={2}>
                                <Item><Rating /></Item>
                                <Item><FloatingActionButtons /></Item>
                            </Stack>
                        </Item>
                    </Grid>
                    <Grid className="Row2_right" lg={2}>
                        <Stack direction="row" spacing={2}>
                            <Item>
                                <Button className="MakeShoppingList" variant="contained" color="success">
                                    Make Shopping List
                                </Button>
                            </Item>
                            <Item>
                                <a className="AdvBtn" href={'/adventure'}>
                                    <img src={BtnAdvntrz} className="AdvBtn_self" alt="AdventurizeIt" style={{textShadow: '2px 2px #000000'} } />
                                </a>
                            </Item>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid className="ContainerMid" container spacing={1}>

                    <Grid className="Row3_full" lg={12}>
                        <Item>
                            <Stack direction="row" spacing={2}>
                                <div className="InfoTable">
                                    <InfoTable />
                                </div>
                            </Stack>
                        </Item>
                    </Grid>


                </Grid>

            </Box>
        </div>
    );
}