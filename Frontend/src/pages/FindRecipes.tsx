import React, {useEffect, useState} from "react";
import Placeholder from "../assets/fillElements/placeholder.png";
import "../style/FindRecipes.css";
import {RecipeClient} from "../clients/RecipeClient";
import Card from "@mui/material/Card";
import {Badge, CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SpeedIcon from '@mui/icons-material/Speed';
import Box from "@mui/material/Box";


export default function FindRecipes() {

    const [data, setData] = useState<any[]>([]);
    const [topRecipe, setTopRecipe] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");

    async function findBtn(searchTerm: string) {
        const client = new RecipeClient();
        setData(await client.getRecipesBySearchTerm(searchTerm));
    }

    useEffect(() => {
        async function getTopRecipes() {
            let client: RecipeClient = new RecipeClient();
            setTopRecipe(await client.getRecipeByLikes(5));
        }

        getTopRecipes();
    }, []);


    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(inputValue);
    }

    function createRecipeCard(recipe: any) {
        return (

            <Card id="cards" sx={{
                width: "20rem",
                height: "15rem",
                backgroundColor: '#C9FE71',
                boxShadow: '#2b2f32 12px 12px 12px',
                marginBottom: "2rem",

            }}>

                <CardActionArea>

                    <CardMedia
                        component="img"
                        height="140"
                        image={recipe.pictureUrl ? `https://localhost:44328/images/recipes/${recipe.pictureUrl}`: Placeholder}
                        alt="recipe"
                    />

                    <CardContent>
                        <Typography className="recipeName" id={`recipe${recipe.id}`} gutterBottom
                                    variant="h5" component="div">
                            {recipe.name}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: "space-around",
                            alignItems: 'center',
                            pl: 0,
                            pb: 0
                        }}>
                            <AccessTimeIcon></AccessTimeIcon>
                            {recipe.cookingTime}
                            <AppRegistrationIcon></AppRegistrationIcon>
                            {recipe.prepTime}
                            <SpeedIcon></SpeedIcon>
                            {recipe.difficulty}
                        </Box>
                    </CardContent>

                </CardActionArea>

            </Card>
        )
    }

    function createSearchRecipeCard(recipe: any) {
        return (
            <Card id="cards" sx={{
                width: "20rem",
                height: "15rem",
                backgroundColor: '#C9FE71',
                boxShadow: '#2b2f32 12px 12px 12px',
                marginBottom: "2rem",
            }}>

                <CardActionArea>

                    <CardMedia
                        component="img"
                        height="140"
                        image={recipe.pictureUrl ? `https://localhost:44328/images/recipes/${recipe.pictureUrl}`: Placeholder}
                        alt="recipe"
                    />
                    <CardContent>
                        <Typography className="recipeName" id={`recipe${recipe.id}`}
                                    gutterBottom variant="h5" component="div"
                                    sx={{textAlign: 'center'}}>
                            {recipe.name}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: "space-around",
                            alignItems: 'center',
                            pl: 0,
                            pb: 0
                        }}>
                            <AccessTimeIcon></AccessTimeIcon>
                            {recipe.cookingTime}
                            <AppRegistrationIcon></AppRegistrationIcon>
                            {recipe.prepTime}
                            <SpeedIcon></SpeedIcon>
                            {recipe.difficulty}
                        </Box>
                    </CardContent>
                </CardActionArea>

            </Card>
        )
    }


    return (
        <div className="RecipeBrowser">

            <div className={"searchForm"}>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search__field"
                        value={inputValue}
                        placeholder="Search for recipes, categories or ingredients"
                        onChange={e => {
                            setInputValue(e.target.value);
                            findBtn(e.target.value);
                        }}
                    />

                </form>
            </div>


            {data ? data.map((recipe) => {
                    return (
                        <div className="recipeContainer">
                            <a href={`/myrecipes/${recipe.id}`}>
                                {recipe.adventureTexts.length !== 0 ?
                                    <Badge badgeContent={"ADVENTURIZED"} color="warning" sx={{color: "white"}}>
                                        {createSearchRecipeCard(recipe)}
                                    </Badge> :
                                    createSearchRecipeCard(recipe)
                                }
                            </a>
                        </div>
                    )
                })
                :

                ""
            }

            <div className={"topRecipes"}>
                {!inputValue ?
                    topRecipe.map((recipe) => {
                        return (
                            <a href={`/myrecipes/${recipe.id}`}>
                                {recipe.adventureTexts.length !== 0 ?
                                    <Badge badgeContent={"ADVENTURIZED"} color="warning" sx={{color: "white"}}>
                                        {createRecipeCard(recipe)}
                                    </Badge>
                                    :
                                    createRecipeCard(recipe)
                                }

                            </a>
                        );
                    }) :
                    ""
                }
            </div>

        </div>
    );
}