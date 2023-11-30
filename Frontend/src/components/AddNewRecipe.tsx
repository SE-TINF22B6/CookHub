import { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from "react-bootstrap";
import ButtonPrimaryWithIcon from "../components/ButtonPrimaryWithIcon";
import InputImageIcon from "./InputImageIcon";
import "../design/AddNewRecipe.css";

const AddNewRecipe: FunctionComponent = () => {
    return (
        <div className="addnewrecipe">
            <div className="bodyframe">
                <div className="bodyframe-child" />
                <div className="favorite" />
                <div className="bodyframe-item" />
            </div>
            <div className="btn-red-green">
                <button className="btn-delete-all">
                    <div className="deleteinput-wrapper">
                        <div className="deleteinput-wrapper">
                            <ButtonPrimaryWithIcon
                                buttonText="Delete all"
                                showIcon={false}
                                buttonPrimaryWithIconBackgroundColor="#fe7171"
                                buttonPrimaryWithIconWidth="186px"
                                buttonPrimaryWithIconPosition="absolute"
                                buttonPrimaryWithIconTop="0px"
                                buttonPrimaryWithIconLeft="0px"
                                buttonPrimaryWithIconBorderRadius="60px"
                                buttonPrimaryWithIconHeight="62px"
                                frameDivWidth="125px"
                                buttonNameFontWeight="600"
                                buttonNameFontFamily="'IBM Plex Sans'"
                                buttonNameColor="#18181b"
                                buttonNameTextAlign="left"
                                buttonNameDisplay="flex"
                                buttonNameTextTransform="uppercase"
                                buttonNameAlignItems="center"
                                buttonNameWidth="98px"
                                buttonNameFlexShrink="0"
                                buttonNameJustifyContent="unset"
                            />
                        </div>
                    </div>
                </button>
                <button className="btn-save-rezipe">
                    <div className="txt-back-to-profile-wrapper">
                        <div className="txt-back-to-profile-wrapper">
                            <ButtonPrimaryWithIcon
                                buttonText="Save recipe "
                                showIcon={false}
                                buttonPrimaryWithIconBackgroundColor="#c9fe71"
                                buttonPrimaryWithIconWidth="193px"
                                buttonPrimaryWithIconPosition="absolute"
                                buttonPrimaryWithIconTop="0px"
                                buttonPrimaryWithIconLeft="0px"
                                buttonPrimaryWithIconBorderRadius="60px"
                                buttonPrimaryWithIconHeight="59.4px"
                                frameDivWidth="125px"
                                buttonNameFontWeight="600"
                                buttonNameFontFamily="'IBM Plex Sans'"
                                buttonNameColor="#18181b"
                                buttonNameTextAlign="center"
                                buttonNameDisplay="flex"
                                buttonNameTextTransform="uppercase"
                                buttonNameAlignItems="center"
                                buttonNameWidth="98px"
                                buttonNameFlexShrink="0"
                                buttonNameJustifyContent="center"
                            />
                        </div>
                    </div>
                </button>
            </div>
            <div className="bodyinputs">
                <ul className="inputingredients">
                    <div className="inputingredients-child" />
                </ul>
                <Form.Group className="inputinstruction-formgroup">
                    <Form.Control as="textarea" defaultValue="" />
                </Form.Group>
                <InputImageIcon />
            </div>
            <div className="header">
                <div className="header-child" />
                <div className="my-recipe">My recipe</div>
                <div className="header-item" />
                <img className="hamburgy-1-icon" alt="" src="../assets/hamburgy-1@2x.png" />
            </div>
            <div className="sushirolls">
                <img className="sushiface2-icon" alt="" src="../assets/sushiface2@2x.png" />
                <img className="sushiface3-icon" alt="" src="../assets/sushiface3@2x.png" />
                <img className="shushiface1-icon" alt="" src="../assets/shushiface1@2x.png" />
            </div>
            <button className="btn-back-to-profile">
                <div className="txt-back-to-profile-wrapper">
                    <div className="txt-back-to-profile-wrapper">
                        <ButtonPrimaryWithIcon
                            buttonText="Back to profile"
                            showIcon={false}
                            buttonPrimaryWithIconBackgroundColor="#c9fe71"
                            buttonPrimaryWithIconWidth="193px"
                            buttonPrimaryWithIconPosition="absolute"
                            buttonPrimaryWithIconTop="0px"
                            buttonPrimaryWithIconLeft="0px"
                            buttonPrimaryWithIconBorderRadius="60px"
                            buttonPrimaryWithIconHeight="59.4px"
                            frameDivWidth="125px"
                            buttonNameFontWeight="600"
                            buttonNameFontFamily="'IBM Plex Sans'"
                            buttonNameColor="#18181b"
                            buttonNameTextAlign="right"
                            buttonNameDisplay="flex"
                            buttonNameTextTransform="uppercase"
                            buttonNameAlignItems="center"
                            buttonNameWidth="98px"
                            buttonNameFlexShrink="0"
                            buttonNameJustifyContent="unset"
                        />
                    </div>
                    <img
                        className="font-awesome-removebg-preview-icon"
                        alt=""
                        src="../assets/20231020-10-46-56font-awesomeremovebgpreview-1@2x.png"
                    />
                </div>
            </button>
        </div>
    );
};

export default AddNewRecipe;
