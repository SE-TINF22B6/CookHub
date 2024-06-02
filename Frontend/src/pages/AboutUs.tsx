import '../style/AboutUs.css';
import * as React from 'react';
import Carlos from "../assets/AboutUs/Chef_Carlo_with_background.png";
import CookHub_Team_H1 from "../assets/AboutUs/CookHub_Team_H1.png";
import Carlos_PopUp from "../helpers/Carlos_PopUp";

export default function AboutUs() {
    return (
        <div className="AboutUsPage">
            <div className="headerAboutUs">
                <img id={"headline"} src={CookHub_Team_H1} className="Team_Roles" alt="headline"/>
            </div>

            <div className="bodyAboutUs">
                <p>
                    <strong style={{color:"#C9FE71"}}>Marc Siegfarth</strong> - Product Owner, Lead Developer <br/>
                    <strong style={{color:"#C9FE71"}}>Nick Hörner</strong> - Creative Director, Senior Developer <br/>
                    <strong style={{color:"#C9FE71"}}>Stefan Mergl</strong> - Scrum Master, Developer <br/>
                    <strong style={{color:"#C9FE71"}}>Len Vesjada</strong> - Time-Tracker Manager, Developer <br/>
                    <strong style={{color:"#C9FE71"}}>Carlos</strong> - Chef, God Imperator
                </p>
            </div>

            <div className="carlos">
                <img src={Carlos} className="CarlosTeamMember" alt="team"/>
                <br/>
                <br/>
                <Carlos_PopUp
                    buttonTitle="Info"
                    text="Len, you are the best Time-Tracker Manager
                    we could ever ask for. You are always on time and you always
                    keep us on track. You are the best! - auto generated by Carlos-AI"
                    buttonTextColor="#000000"
                    buttonBorderColor="#000000"
                    backgroundColor="#c7fc71"
                />

            </div>

        </div>
    )
}