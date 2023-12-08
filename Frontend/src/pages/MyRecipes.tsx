import React from "react";
import "../style/MyRecipes.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from "../components/Rating";
import InfoTable from "../components/InfoTable";
import BtnAdvntrz from "../assets/Logos_Icons/Button_Adventurize_it.png"
import StickyNote from "../assets/fillElements/StickyNote_2.png";
import Ramen from "../assets/recipes/recipe_Ramen_01_23.jpg";
import Button from '@mui/material/Button';


const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 1500,
    height:1600,
    position: 'relative',
    bottom: '83vh',
    left: '58vw',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    backgroundColor: '#c7fc70',
    textAlign: 'center',
    boxShadow: '4px 4px #000000',
}));

const name = 'Klassische Ramensuppe';


export default function MyRecipes() {
    return (

        <div className="RecipePage">

            <Box className="LeftBox" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>

                    <Stack className="TopStackLeft" spacing={2}>
                        <Grid className="MenuName" item xs={6}>
                            <div id="HeaderContainerL">
                                <h1 style={{
                                    textShadow: "2px 2px #C9FE71",
                                    color: "#000000",
                                    fontSize: "50px",
                                    fontFamily: "Arial",
                                    fontWeight: "bold"
                                }}>🗇 {name} ➪ </h1>
                            </div>
                        </Grid>

                        <div id="ImageContainer">
                            <div className="MenuShowcaseImage">
                                <img className="RecipeImage" src={Ramen} alt="Gute_Rahmenbedingungen" />
                            </div>
                        </div>


                        <Grid item xs={6}>
                            <div id="InfoTableContainer">
                                <div className="InfoTable">
                                    <InfoTable />
                                </div>
                            </div>
                        </Grid>
                    </Stack>
                </Grid>
            </Box>


            <Box className="RightBox" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Stack spacing={2}>
                        <Grid item xs={6}>
                            <div className="PaperStack">
                                <DemoPaper className="InfoCardPaper" square={false}>
                                    <Stack>
                                        <div id="HeaderContainerR">
                                            <div className="rating">
                                                <Rating />
                                            </div>
                                        </div>
                                        <br/><br/>
                                        <h1>Info Card</h1>
                                        <p>Preparation Time: 30min</p>
                                        <p>Cooking Time: 15min</p>
                                        <p>Difficulty: Easy</p>
                                        <p>Rating: 4.5</p>
                                        <br/>
                                        <h2>Zutaten:</h2>
                                        <ul>
                                            <li>120 g Pilze</li>
                                            <li>2,0 cm Ingwer</li>
                                            <li>2 Knoblauchzehen</li>
                                            <li>2 Pak Choi</li>
                                            <li>1 Frühlingszwiebel</li>
                                            <li>4 Eier</li>
                                            <li>2 EL Sesamöl</li>
                                            <li>50 g Misopaste</li>
                                            <li>2 EL Sojasauce</li>
                                            <li>1 EL Apfelessig</li>
                                            <li>1,5 l Gemüsebrühe</li>
                                            <li>250 g Ramen-Nudeln</li>
                                            <li>1 EL Sesamsamen</li>
                                        </ul>
                                        <h2>Anleitung:</h2>
                                        <ol>
                                            <li><strong>Gemüse vorbereiten:</strong> Pilze vierteln; Ingwer und Knoblauch fein hacken. Pak Choi in Streifen und Frühlingszwiebel in Ringe schneiden.</li>
                                            <li><strong>Eier kochen:</strong> Eier 6 Minuten kochen, dann pellen und halbieren.</li>
                                            <li><strong>Anbraten:</strong> Sesamöl in einem Topf erhitzen. Ingwer und Knoblauch anbraten.</li>
                                            <li><strong>Brühe zubereiten:</strong> Pilze, Misopaste, Sojasauce, Apfelessig und Gemüsebrühe in den Topf geben. Zum Kochen bringen und 5 Minuten köcheln lassen.</li>
                                            <li><strong>Nudeln hinzufügen:</strong> Ramen-Nudeln und Pak Choi hinzufügen, 2 Minuten kochen.</li>
                                            <li><strong>Servieren:</strong> Suppe in Schüsseln verteilen. Je eine halbe Ei hinzufügen, mit Frühlingszwiebelringen und Sesamsamen garnieren.</li>
                                        </ol>
                                        <div>
                                            <Button className="MakeShoppingList" variant="contained" color="success">
                                                Download <br/>
                                                Shopping List
                                            </Button>
                                        </div>

                                        <div id="StickyCards_Container">
                                            <div className="StickyNoteCont">
                                                <img className="StickyNote" src={StickyNote} alt="feltDown" />
                                            </div>
                                        </div>

                                        <div className="FAB">
                                            <a className="AdvBtn" href={'/adventure'}>
                                                <img src={BtnAdvntrz} className="AdvBtn_self" alt="AdventurizeIt" />
                                            </a>


                                        </div>
                                    </Stack>
                                </DemoPaper>
                            </div>
                        </Grid>
                    </Stack>
                </Grid>
            </Box>

        </div>
    );
}






