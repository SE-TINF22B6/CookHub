import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    List,
    ListItemButton,
    ListItemText,
    NativeSelect,
    Slide, TextareaAutosize,
    ToggleButton
} from "@mui/material";
import React, {useEffect, useState} from "react";
import "../style/MyRecipes.css";
import Placeholder from "../assets/fillElements/placeholder.png";
import InfoTable from "../components/InfoTable";
import AdventurizeIt from "../assets/fillElements/Adventurizeit_btn.png"
import {useParams} from "react-router-dom";
import {RecipeClient} from "../clients/RecipeClient";
import FavoriteIcon from "@mui/icons-material/Favorite";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";





export default function MyRecipes() {
    let {slug} = useParams();
    const [data, setData] = useState<any>(null);
    const [selected, setSelected] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [adventureText, setAdventureText] = React.useState<any>("");



    async function handleClickAdventurize(id:number){
        let client = new RecipeClient();
        setAdventureText(null);
        const data:string | undefined = await client.adventurizeRecipe(id);
        setAdventureText(data);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        async function findRecipe(slug: string | undefined) {
            try {
                let client: RecipeClient = new RecipeClient();
                setData(await client.getRecipeById(Number(slug)));
            } catch (error) {
                console.log("Fehler beim Laden des Rezeptes: ", error);
            }
        }

        if (slug) {
            findRecipe(slug);
        }

    }, [slug]);

    useEffect(() => {
        if (data) {
            console.log(data);
        }

    }, [data]);

    if (!data) {
        return <div>Loading...</div>;
    }


    return (

        <div className="MainContainer">

            <div id={"Top-Container"}>

                <div id={"Top-Left-Container"}>
                    <img id="RecipeImage" src={data.pictureUrl ? data.pictureUrl : Placeholder}
                         alt="Gute_Rahmenbedingungen"/>
                </div>

                <div id={"Top-Right-Container"}>

                    <h1>🗇 {data.name} </h1>

                    <br/>
                    <span className={"infoText"}>
                            {/* TODO: implement logic to get data from db */}
                        <p>Preparation Time: {data.prepTime}</p>
                            <p>Cooking Time: {data.cookingTime}</p>
                            <p>Difficulty: {data.difficulty}</p>
                            <p>Rating: 4.5</p>
                        <p> Like:
                        <ToggleButton
                            value="check"
                            color="warning"
                            selected={selected}
                            onChange={() => {
                                setSelected(!selected);
                            }}
                        >
                        <FavoriteIcon/>
                    </ToggleButton></p>
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
                    {/* TODO: implement logic to get ingredients of recipe out of db */}
                    <ul>
                        {data.ingredients.length !== 0 ?
                            data.ingredients.map((item: any) => {
                                return <li>item</li>
                            }) : <li>No Ingredients available</li>
                        }

                    </ul>
                </div>

                <div id={"Middle-Right-Container"}>
                    <h2>Instruction:</h2>
                    <br/>
                    <span id="InstructionText" style={{color: "black"}}>
                            {data.instructionText ?
                                data.instructionText
                                : <p>No Instruction available</p>
                            }
                        </span>
                </div>

            </div>

            <div id={"Button-Container"}>
                <a href={"https://www.lieferando.de/"} target={"_blank"} rel={"noreferrer"}>
                    <button id={"rageQuitButton"}>
                        Rage Quit
                    </button>
                </a>
            <button className={"adventureButton"} onClick={()=>{
                handleClickOpen();
                handleClickAdventurize(data.id);
            }}>
                <img id="AdventurizeIt" src={AdventurizeIt} alt="AdventurizeIt" width={"200"}/>
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
                    <DialogContent>
                        <DialogContentText>
                           Your Recipe
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="recipeName"
                            label="Recipe Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                        />
                        <h3>Adventure Text</h3>
                        <div id={"atext"}>
                            {adventureText ?
                                <div dangerouslySetInnerHTML={{ __html: adventureText.replace(/\./g, '.<br>') }} />
                                : <span className="loader"></span>
                            }
                        </div>
                    </DialogContent>
                    <div style={{display: "flex", justifyContent: "center"}}>
                    <DialogActions>
                        <Button color="error" variant="contained" onClick={handleClose}>Cancel</Button>
                        <Button color="secondary" variant="contained" onClick={()=>{
                            handleClickAdventurize(data.id);
                        }}>Regenerate</Button>
                        <Button color="success" variant="contained" type="submit">Save</Button>
                    </DialogActions>
                    </div>
                </Dialog>


            </div>

            <div id={"Bottom-Container"}>

                <h2 style={{
                    textShadow: "2px 2px #C9FE71",
                    color: "#000000",
                    fontSize: "40px",
                    fontFamily: "Arial",
                    fontWeight: "bold"
                }}>Adventurized Versions:</h2>
                <InfoTable/>

            </div>

        </div>
    );
}
