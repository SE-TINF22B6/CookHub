import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import "../design/ProfilePage.css";
import logo from "../assets/Logo_no_background.svg"
import avatarUsernameHolder from "../assets/ProfilePage/AvatarUsernameHolder.png"
import logoutBTN from "../assets/ProfilePage/Logout.png";
import settingsBTN from "../assets/ProfilePage/Settings.png";
import frameCards from "../assets/ProfilePage/FrameCardsCenter.png";
import historyCard from "../assets/ProfilePage/History.png";
import favoritesCard from "../assets/ProfilePage/Favorites.png";
import OwnRecipeCard from "../assets/ProfilePage/OwnRecipes.png";

export default function ProfilePage() {
    return (
        <div className="ProfilePage" style={{backgroundColor: "transparent"}} >

                <Container fluid="md" className="ContainerTop" >
                    <Row>
                        <Col>
                            <Stack className="Stack1" direction="horizontal" gap={4} >
                                <div className="p-1">
                                    <a href="/"><img src={logo} className="App-logo_ProfilePage" alt="logo" /></a>
                                </div>
                                <div className="p-2">
                                    <img src={avatarUsernameHolder} className="AvatarUsernameHolder" alt="Avatar&Username Background"/>
                                </div>
                                <div className="p-3">
                                    <Stack className="Stack2" gap={2}>
                                        <div className="p-2">
                                            <a href="/logout"><img src={logoutBTN} className="LogoutButton" alt="logout button"/></a>
                                        </div>
                                        <div className="p-2">
                                            <a href="/settings"><img src={settingsBTN} className="SettingsButton" alt="settings button"/></a>
                                        </div>
                                    </Stack>
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                </Container>

                <Container fluid="md" className="ContainerBottom" >
                    <Row>
                        <Col>
                            <div id="parent">
                                <div id="child">

                                <Stack className="Stack3" direction="horizontal" gap={4}>
                                    <div className="CardHolder-1">
                                        <img src={historyCard} className="HistoryCard" alt="History Card"/>
                                    </div>
                                    <div className="CardHolder-2">
                                        <img src={favoritesCard} className="FavoritesCard" alt="Favorites Card"/>
                                    </div>
                                    <div className="CardHolder-3">
                                        <img src={OwnRecipeCard} className="OwnRecipeCard" alt="Own Recipe Card"/>
                                    </div>
                                </Stack>
                                </div>

                                <img src={frameCards} alt="frameCards"/>
                            </div>
                        </Col>
                    </Row>
                </Container>



        </div>
    );
}