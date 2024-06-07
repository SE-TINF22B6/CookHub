import FavoriteIcon from "@mui/icons-material/Favorite";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    NativeSelect,
    ToggleButton
} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import "../style/MyRecipes.css";
import {useNavigate, useParams} from "react-router-dom";
import AdventurizeIt from "../assets/fillElements/Adventurizeit_btn.png"
import Placeholder from "../assets/fillElements/placeholder.png";
import RageQuitButton from "../assets/fillElements/rageQuit-btn.png";
import {RecipeClient} from "../clients/RecipeClient";
import InfoTable from "../components/InfoTable";
import {UserDataParams} from "../models/UserDataParams";
import {UserClient} from "../clients/UserClient";
import DeleteIcon from "@mui/icons-material/Delete";


export default function MyRecipes(user : UserDataParams) {
    let {slug} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);
    const [selected, setSelected] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [adventureText, setAdventureText] = React.useState<any>("");
    const [title, setTitle] = React.useState("");
    const [instructionText, setInstructionText] = React.useState("");
    const [nrOfPortions, setNrOfPortions] = React.useState<number>(1);
    const [likeCount, setLikeCount] = React.useState(0);

    async function handleClickAdventurize(id: number) {
        let client = new RecipeClient();
        setAdventureText(null);
        const adData: string | undefined = await client.adventurizeRecipe(id);
        setAdventureText(adData);
    }

    async function handleClickLike() {
        const userClient = new UserClient();
        const userId = user.data?.id?? -1;
        const recipeId = Number(slug);
        let error = '';
        let newLikeCount = likeCount;

        if (userId < 1 || recipeId < 1) return;

        if (selected) {
            error = await userClient.unlikeRecipe(userId, recipeId);
            newLikeCount--;
        } else {
            error = await userClient.likeRecipe(userId, recipeId);
            newLikeCount++;
        }

        if (error !== '') {
            console.error(error);
            return;
        }

        setSelected(!selected);
        setLikeCount(newLikeCount);
    }

    async function saveAdventureText() {
        const recipeClient = new RecipeClient();
        const recipeId = Number(slug);
        const error = await recipeClient.saveAdventureText(recipeId, adventureText);

        if (error) {
            alert(error);
        } else {
            window.location.reload();
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const showAdventureText = (title: string, text: string) => {
        setTitle(title);
        setInstructionText(text);
        window.location.href = '#';
    }

    const onDeleteClick = async () => {
        const recipeClient = new RecipeClient();
        const recipeId = Number(slug);
        const error = await recipeClient.deleteRecipe(recipeId);

        if (error) {
            alert(error);
        } else {
            navigate('/myRecipes')
        }
    }

    useEffect(() => {
        async function findRecipe(slug: string | undefined) {
            try {
                let client: RecipeClient = new RecipeClient();
                const recipe = await client.getRecipeById(Number(slug));
                await new UserClient().viewRecipe(Number(slug));

                    setData(recipe);
                    setTitle(recipe?.name?? "");
                    setInstructionText(recipe?.instructionText?? "");
                    setSelected(recipe.likedByCurrentUser);
                    setLikeCount(recipe.likeCount);

            } catch (error) {
                console.log("Fehler beim Laden des Rezeptes: ", error);
            }
        }

        if (slug) {
            findRecipe(slug);
        }

    }, [slug]);
    

    if (!data) {
        return <div>Loading...</div>;
    }


    return (

        <div className="MainContainer">

            <div id={"Header"}>
                <h1 style={{color: '#C9FE71', textShadow: '2px 2px #000'}}>🗇 {title} </h1>
            </div>

            <div id={"Top-Container"}>

                <div id={"Top-Left-Container"}>
                    <img id="RecipeImage"
                         src={data.pictureUrl ? `https://localhost:44328/images/recipes/${data.pictureUrl}` : Placeholder}
                         alt="Gute_Rahmenbedingungen"/>
                </div>

                <div id={"Top-Right-Container"}>

                    <br/>
                    <span className={"infoText"}>
                            {/* TODO: implement logic to get data from db */}
                        <p><strong>Preparation Time:</strong> {data.prepTime} min</p>
                        <p><strong>Cooking Time:</strong> {data.cookingTime} min</p>
                        <p><strong>Difficulty:</strong> {data.difficulty}</p>
                        <p id="likeCount"><strong>Likes:</strong> {likeCount}</p>
                        <p hidden={user.data == null}>
                            <ToggleButton
                                id="likeButton"
                                value="check"
                                color="warning"
                                selected={selected}
                                onChange={handleClickLike}
                            >
                                <FavoriteIcon/>
                            </ToggleButton>
                        </p>
                        <p hidden={user.data?.id !== data.creatorId}>
                            <Button
                                variant="outlined"
                                startIcon={<DeleteIcon/>}
                                color="error"
                                onClick={() => onDeleteClick()}
                                sx={{height: '48px'}}>
                                Delete recipe
                            </Button>
                        </p>
                    </span>
                    <br/>
                </div>

            </div>


            <div id={"Middle-Container"}>

                <div id={"Middle-Left-Container"}>
                    <h2>Ingredients:</h2>
                    <br/>
                    <FormControl fullWidth style={{maxWidth: 150}}>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Select Number of Portions
                        </InputLabel>
                        <NativeSelect
                            defaultValue={1}
                            inputProps={{
                                name: 'number of portions',
                                id: 'uncontrolled-native',
                            }}
                            onChange={event => setNrOfPortions(+event.target.value)}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </NativeSelect>
                    </FormControl>
                    <br/>
                    <br/>
                    <ul id="ingredientsList">
                        {data.ingredients.length !== 0 ?
                            data.ingredients.map((item: any) => {
                                return <li>{`${item.quantity !== 0 ? item.quantity * nrOfPortions : ''} ${item.unitOfMeasure} ${item.ingredientName}`}</li>
                            }) : <li>No Ingredients available</li>
                        }

                    </ul>
                </div>

                <div id={"Middle-Right-Container"}>
                    <h2>Instruction:</h2>
                    <br/>
                    <span id="InstructionText" style={{color: "black"}}>
                            {data.instructionText ?
                                <span
                                    dangerouslySetInnerHTML={{__html: instructionText.replaceAll('\n', '<br>')}}></span> :
                                <p>No Instruction available</p>
                            }

                        </span>
                </div>

            </div>

            <div id={"Button-Container"}>
                <a className={"rageQuitButton"}
                   href={"https://www.lieferando.de/"}
                   target={"_blank"}
                   rel={"noreferrer"}>
                    <button className={"btn"}>
                        <img className="RageQuitButton" src={RageQuitButton} alt={"RageQuitButton"}/>
                    </button>
                </a>
                <button className={"adventureButton"} hidden={user.data == null} onClick={() => {
                    handleClickOpen();
                    handleClickAdventurize(data.id);
                }}>
                    <img id="AdventurizeIt" src={AdventurizeIt} alt="AdventurizeIt" />
                </button>
                <Dialog
                    open={open}
                    fullScreen={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const recipeName = formJson.recipeName;
                            console.log(recipeName);
                            console.log(adventureText);
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Adventurized Text</DialogTitle>
                    <DialogContent sx={{backgroundColor: 'white'}}>
                        <h3>Adventure Text</h3>
                        <div id={"atext"}>
                            {adventureText ?
                                <div dangerouslySetInnerHTML={{__html: adventureText.replaceAll('\n', '<br>')}}/>
                                : <span className="loader"></span>
                            }
                        </div>
                    </DialogContent>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <DialogActions>
                            <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
                            <Button color="secondary" variant="contained" onClick={() => {
                                handleClickAdventurize(data.id);
                            }}>Regenerate</Button>
                            <Button color="success" variant="contained" type="submit" onClick={() => saveAdventureText()}>Save</Button>
                        </DialogActions>
                    </div>
                </Dialog>


            </div>

            <div id={"Bottom-Container"}>

                <h2 style={{
                    textShadow: "2px 2px #000",
                    color: "#C9FE71",
                    fontSize: "40px",
                    fontFamily: "Arial",
                    fontWeight: "bold"
                }}>Adventurized Versions:</h2>
                <InfoTable data={data} showAdventureText={showAdventureText}/>

            </div>

        </div>
    );
}
