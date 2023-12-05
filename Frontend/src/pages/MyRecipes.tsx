import React from "react";
import "../style/MyRecipes.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from "../components/Rating";
import Ramen from "../assets/recipes/recipe_Ramen_01_23.jpg";


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

                    <Grid className="Row1_right" xs={4}>
                        <Item>
                            <Stack direction="row" spacing={2}>
                                <DemoPaper className="InfoCardPaper" square={false}>
                                    <h2>InfoCard</h2>
                                </DemoPaper>
                            </Stack>
                        </Item>
                    </Grid>


                    <Grid className="Row2_left" lg={10}>
                        <Item>
                           <Rating />

                        </Item>
                    </Grid>
                    <Grid className="Row2_right" xs={2}>
                        <Item>
                            <div className="RecipeIngredients">
                                <h2>Ingredients</h2>
                                <p>Recipe Ingredients</p>
                                <div className="RecipeText">
                                    <p>Recipe Text</p>
                                </div>
                            </div>
                        </Item>
                    </Grid>








                </Grid>
            </Box>
        </div>
    );
}