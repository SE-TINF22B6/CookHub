import * as React from 'react';
import '../style/NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ButtonGroup from '@mui/material/ButtonGroup';
import Logo from "../assets/Logo_no_background.svg";
import Avatar from "../assets/Hotdog.svg";
import MenuListComposition from "./MenuListComposition";
import {Link} from "react-router-dom";


export default function NavBar() {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                className="AppBar"
                position="static"
                elevation={1}
                style={{backgroundColor: '#052323', zIndex:15}}
            >
                <Toolbar className="ToolBar">

                    <Link className="Back2LandingPage" to={'/'}>
                        <img className="Logo" src={Logo} alt='Logo' style={{width: '80%'}} />
                    </Link>

                    <Typography
                        className="LinksPages"
                        variant="button"
                        component="div"
                        sx={{ flexGrow: 1 }}
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
                            <Button className='FindRecipes' target="_self" href='/findrecipes'>🔎 Find Recipes</Button>
                            <Button className='MyRecipes' target="_self" href='/myrecipes'>📓 My Recipes</Button>
                            <Button className='FoodForge' target="_self" href='/foodforge'>🧪 Food Forge</Button>
                            <Button className='AboutUs' target="_self" href='/about'>About Us</Button>
                            <Button className='FAQs' target="_self" href='/faqs'>FAQs</Button>
                            <Button className='Impressum' target="_self" href='/impressum'>Impressum</Button>
                        </ButtonGroup>
                    </Typography>

                    <IconButton
                        className="MenuIcon"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ color: '#c7fc70', mr: 5 }}
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                        {isMenuOpen && (
                            <div className="MenuPopover">
                                <MenuListComposition />
                            </div>
                        )}
                    </IconButton>

                    <Button className="LoginButton" color="inherit" href='/login' variant="outlined" sx={{  color: '#c7fc70', mr: 5 }}>
                        Login
                    </Button>

                    <Link className='Avatar' to={'/profile'}>
                        <img className="AvatarImg" src={Avatar} alt='UserAvatar' style={{width: '80%'}}/>
                    </Link>


                </Toolbar>
            </AppBar>
        </Box>
    );
}