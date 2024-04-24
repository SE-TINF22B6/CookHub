import '../style/AboutUs.css';
import * as React from 'react';
import Team_listed from "../assets/AboutUs/Team_listed.png";
import CookHub_Team_H1 from "../assets/AboutUs/CookHub_Team_H1.png";
import Carlos from "../assets/AboutUs/Chef_Carlo_with_background.png";

export default function AboutUs() {
    return (
        <div className="AboutUsPage">
            <div className="bodyAboutUs">
                <img src={CookHub_Team_H1} className="Team_Roles" alt="team"/>
                <img src={Team_listed} className="Team_Roles" alt="team"/>
            </div>
            <div className="carlos">
                <img src={Carlos} className="CarlosTeamMember" alt="team"/>
            </div>
        </div>
    );
}
