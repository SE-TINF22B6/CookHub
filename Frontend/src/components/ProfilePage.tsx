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

export default function ProfilePage() {
    return (
        <div className="ProfilePage">

                <Container fluid="md" className="ContainerTop" style={{backgroundColor:"transparent"}}>
                    <Row>
                        <Col>
                            <Stack className="Stack1" direction="horizontal" gap={4}>
                                <div className="p-1">
                                    <a href="/"><img src={logo} className="App-logo" alt="logo"/></a>
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

                <Container fluid="md" className="ContainerMid">
                    <Row>
                        <Col>
                            <img src={frameCards} alt="frameCards"/>
                        </Col>
                    </Row>
                </Container>






        </div>
    );
}