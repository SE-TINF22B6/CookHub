import '../style/AboutUs.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Team_listed from "../assets/AboutUs/Team_listed.png";
import CookHub_Team_H1 from "../assets/AboutUs/CookHub_Team_H1.png";
import Carlos from "../assets/AboutUs/Chef_Carlo_with_background.png";

export default function AboutUs() {
    return (
        <div className="AboutUsPage">
            <div className="bodyAboutUs">
                <Grid container spacing={2}>
                    <Grid item xl={6} className="leftSideUs">
                        <img src={CookHub_Team_H1} className="Team_Roles" alt="team"/>
                        <img src={Team_listed} className="Team_Roles" alt="team"/>
                    </Grid>
                    <Grid item xl={6} className="rightSideUs">
                        <img src={Carlos} className="CarlosTeamMember" alt="team"/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
