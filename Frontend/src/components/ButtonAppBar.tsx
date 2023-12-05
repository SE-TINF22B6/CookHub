import * as React from 'react';
import '../design/ButtonAppBar.css';
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
import menuList from "./MenuListComposition";
import MenuListComposition from "./MenuListComposition";


export default function ButtonAppBar() {

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
                style={{backgroundColor: '#052323'}}
            >
                <Toolbar className="ToolBar">


                    <img className="Logo" src={Logo} style={{width: '5%'}} />

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
                        >
                            <Button className='MyRecipes' target="_self" href='/myrecipes' sx={{ color: '#c7fc70' }}>My Recipes</Button>
                            <Button className='RecipesBrowser' target="_self" href='/recipesbrowser'sx={{ color: '#c7fc70' }}>Recipes Browser</Button>
                            <Button className='RecipeCreator' target="_self" href='/recipecreator'sx={{ color: '#c7fc70' }}>Recipe Creator</Button>
                            <Button className='AboutUs' target="_self" href='/aboutus'sx={{ color: '#c7fc70' }}>About Us</Button>
                            <Button className='FAQs' target="_self" href='/faqs'sx={{ color: '#c7fc70' }}>FAQs</Button>
                            <Button className='Impressum' target="_self" href='/impressum'sx={{ color: '#c7fc70' }}>Impressum</Button>
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

                    <Button className="LoginButton" color="inherit" sx={{  color: '#c7fc70', mr: 5 }}>Login</Button>

                    <img className="Avatar" src={Avatar} style={{width: '4%'}}/>


                </Toolbar>
            </AppBar>
        </Box>
    );
}