import "bootstrap/dist/css/bootstrap.min.css";
import "../style/FoodForge.css";
import SubBtn from "../assets/fillElements/BTN_ SAVE REZIPE.png";
import CookPot from "../assets/newRecipe/Cook_Pot.png";
import CookPotCover from "../assets/newRecipe/Cook_Pot_Cover.png";
import AddIngredientApp from "../components/AddIngredientApp";
import FormPropsTextFields from "../components/FormPropsTextFields";
import DifficultyRadioGroup from "../components/DifficultyRadioGroup";
import Button from "@mui/material/Button";
import React, {useRef} from "react";
import {styled} from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FoodForge() {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const fileUploadRef : any = useRef();

    function uploadImageDisplay() {
        getBase64(fileUploadRef.current.files[0]);
    }

    function getBase64(file: File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (

        <div id={"Main-Container"}>

            <div id={"Left-Container"}>
                <div id={"Left-Inner-Container"}>
                    <img src={CookPotCover} alt="potTop" style={{position: 'relative', width: '80%'}}/>
                    {/*TODO: Split Amount and Ingredient*/}
                    <AddIngredientApp/>
                    <img src={CookPot} alt="potBottom" style={{position: 'relative', width: '80%'}}/>
                </div>
            </div>

            <div id={"Right-Container"}>
                <div id={"Top-Right-Container"}>
                    <h1>FOOD FORGE</h1>
                    <FormPropsTextFields/>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<FavoriteIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" ref={fileUploadRef} onChange={uploadImageDisplay} />
                    </Button>
                    <br/>
                    <DifficultyRadioGroup/>
                </div>
                <div id={"Bottom-Right-Container"}>
                    Please enter the instructions for your recipe here:
                    <textarea className="textArea"></textarea>
                    <a className="Save-Recipe-Button" href='/myRecipes'>
                        <img src={SubBtn} alt="SubmitButton"/>
                    </a>
                </div>
            </div>

        </div>
    );
}

