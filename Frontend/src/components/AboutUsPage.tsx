import '../design/AboutUsPage.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/Grid';
import logo from "../assets/Logo_no_background.svg";
import Team_listed from "../assets/AboutUs/Team_listed.png";
import CookHub_Team_H1 from "../assets/AboutUs/CookHub_Team_H1.png";
import team_gear from "../assets/AboutUs/team_gears.png";

export default function AboutUsPage(){
    return(
        <div className="AboutUsPage">

            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ul>
                    <a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a>
                    <a className='About-link' target="_self" href='/about'>About us</a>
                    <a className='Impressum-link' target="_self" href='/impressum'>Impressum</a>
                </ul>
            </header>

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