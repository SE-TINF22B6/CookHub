import '../style/AboutUs.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import Team_listed from "../assets/AboutUs/Team_listed.png";
import CookHub_Team_H1 from "../assets/AboutUs/CookHub_Team_H1.png";
import team_gear from "../assets/AboutUs/team_gears.png";

export default function AboutUs(){
    return(
        <div className="AboutUsPage">

            <div className="body">

                <Grid container spacing = {0}>

                    <Item className="leftSide" item xl={6}>
                        <Grid className="Team_H1" item md={12}>
                            <img src={CookHub_Team_H1} className="H1" alt="team" width="700vw" height="200vw"/>
                        </Grid>
                        <Grid className="Team_listed" item md={12}>
                            <img src={Team_listed} className="Team_Roles" alt="team" width="700vw" height="200vw"/>
                        </Grid>
                    </Item>

                    <Item className="rightSide" item xl={6}>
                        <img src={team_gear} className={"team_gear"} alt="team" width="600vw" height="350vw"/>
                    </Item>

                </Grid>

            </div>


        </div>
    );
}