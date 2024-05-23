// @ts-ignore

import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import '../style/NavBar.css';
import {Link} from "react-router-dom";
import LogoAnimated from "../assets/gifs/logo_animated.gif";
import Avatar from "../assets/Hotdog.svg";
import MenuListComposition from "./MenuListComposition";



// @ts-ignore
export default function NavBar({user}) {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (

        <Box id="box" sx={{flexGrow: 1}}>
            <AppBar
                className="AppBar"
                position="static"
                elevation={1}
                style={{backgroundColor: '#242422', zIndex: 15}}
            >
                <Toolbar className="ToolBar">

                    <div id={"logoContainer"}>
                        <Link className="Back2LandingPage" to={'/'}>
                            <img className="Logo" src={LogoAnimated} alt='Logo'/>
                        </Link>
                    </div>


                    <div id={"linkContainer"}>
                        <Typography
                            className="LinksPages"
                            variant="button"
                            component="div"
                            sx={{flexGrow: 1}}
                        >
                            <ButtonGroup
                                className="ButtonGroup"
                                variant="outlined"
                                aria-label="outlined button group"
                                sx={{
                                    '& .MuiButton-outlined': {
                                        borderColor: '#c7fc70',
                                        color: '#c7fc70',
                                    },
                                }}
                            >
                                <Button className='MyRecipes' target="_self" href='/myrecipes'>My Recipes</Button>
                                <Button className='FindRecipes' target="_self" href='/findrecipes'>Find Recipes</Button>
                                <Button className='FoodForge' target="_self" href='/foodforge'>Food Forge</Button>
                                <Button className='AboutUs' target="_self" href='/about'>About Us</Button>
                                <Button className='FAQs' target="_self" href='/faqs'>FAQs</Button>
                                <Button className='Impressum' target="_self" href='/impressum'>Impressum</Button>
                            </ButtonGroup>
                        </Typography>
                    </div>


                    <div id={"menuButtonContainer"}>
                        <IconButton
                            className="MenuIcon"
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{color: '#c7fc70', mr: 5}}
                            onClick={toggleMenu}
                        >
                            <MenuIcon/>
                            {isMenuOpen && (
                                <div className="MenuPopover">
                                    <MenuListComposition/>
                                </div>
                            )}
                        </IconButton>
                    </div>


                    <div id={"loginContainer"}>
                        <Button
                            className="LoginButton"
                            color="inherit"
                            href='/login'
                            variant="outlined"
                            sx={{color: '#c7fc70', mr: 5}}
                        >
                            Login
                        </Button>
                    </div>


                    <div id={"avatarContainer"}>
                        <Link className='Avatar' to={'/profile'}>
                            {user ? <img className="AvatarImg" src={`https://localhost:44328/images/profile-pictures/${user.profilePicture}`}/> :
                                <img className="AvatarImg" src={Avatar} alt='UserAvatar'/>}
                        </Link>
                    </div>


                </Toolbar>
            </AppBar>
        </Box>
    )
        ;
}