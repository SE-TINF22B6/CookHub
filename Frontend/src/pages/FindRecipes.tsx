import React, {useEffect, useState} from "react";
import "../style/FindRecipes.css";
import {RecipeClient} from "../clients/RecipeClient";
import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SpeedIcon from '@mui/icons-material/Speed';
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";


export default function FindRecipes() {

    const [data, setData] = useState<any[]>([]);
    const [topRecipe, setTopRecipe] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState("");

    async function findBtn(name: string) {
        let client: RecipeClient = new RecipeClient();
        setData(await client.getRecipeByName(name));
    }

    useEffect(() => {
        async function getTopRecipes() {
            let client: RecipeClient = new RecipeClient();
            setTopRecipe(await client.getRecipeByLikes(3));
        }
        getTopRecipes();
    }, []);

    /*    async function findAll() {
            const client = new RecipeClient();
            setData(await client.getAllRecipes());
        }*/

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(inputValue);
    }


    return (
        <div className="RecipeBrowser">
            <div className={"searchForm"}>
                <form className="search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="search__field"
                        value={inputValue}
                        placeholder="Search Recipe..."
                        onChange={e => {
                            setInputValue(e.target.value);
                            findBtn(e.target.value);
                        }
                        }
                    />
                    <button className="btn__search">
                        Search
                    </button>
                </form>

            </div>

            {data ? data.map((recipe, index) => {
                    return (
                        <div className="recipeContainer">
                            <ul className="results">
                                <a href={`/myrecipes/${recipe.id}`}>
                                    <li className="preview" key={index}>
                                        <img src={`https://localhost:44328/images/recipes/${recipe.pictureUrl}`} alt="recipe" style={{width:'20%', borderRadius:'50%'}} />
                                        <div className="preview__data">
                                            <h4 className="preview__title">{recipe.name}</h4>
                                            <div className="preview__time">
                                                <p>Difficulty: {recipe.difficulty}</p>
                                                <p>Preparation Time: {recipe.prepTime}</p>
                                                <p>Cooking Time: {recipe.cookingTime}</p>
                                            </div>
                                            <p className="preview__publisher"><FavoriteIcon/>{recipe.likedUserIds}</p>
                                            <div className="preview__user-generated">
                                                {recipe.adventureTexts.length !== 0 ?
                                                    <div className="ribbon">Adventurized</div> :
                                                    <p>Not Adventurized</p>
                                                }
                                            </div>

                                        </div>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    )
                })
                :

               ""
            }

            <div className={"recipes"}>

            </div>
            <div className={"topRecipes"}>
                {!inputValue ?
                    topRecipe.map((recipe) => {
                        return (
                            <a href={`/myrecipes/${recipe.id}`}>
                            <Card sx={{width: "350px" ,height: "37vh",backgroundColor: '#C9FE71', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`https://localhost:44328/images/recipes/${recipe.pictureUrl}`}
                                        alt="recipe"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {recipe.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex',justifyContent: "space-evenly", alignItems: 'center', pl: 1, pb: 1 }}>
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
                            </a>
                        );
                    }) :

                    ""

                }
            </div>

        </div>

    );
}