import { NavLink, Link } from "react-router-dom";
import './css/NavigationBar.css'
import { Stack, Button, TextField, ButtonGroup, Box, AppBar, Container, Toolbar, styled, alpha, InputBase } from "@mui/material";
import App from "../App";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.black,
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.95),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: 'auto',
    },
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const NavigationBar = () => {
    return (
        <AppBar position='static'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                {/* Pre-MUI we used NavLink to navigate, e.g <NavLink to='/'> link </NavLink>
                    Now we have to import Link from react-router-dom and
                    MUI Button uses the Link component
                */}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
                        <Button component={Link} to='' color='secondary' >
                            bok
                        </Button> 
                    </Box>

                    <Box sx={{ flexGrow: 5, display: { xs: "none", md: "flex" } }}>
                <Button component={Link} to="/article"
                color='secondary' variant='contained' size='large'>
                    Köp
                </Button>
                <Button component={Link} to="/article"
                color='secondary' variant='contained' size='large'>
                    Sälj
                </Button>

                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                    <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
                        {/*<TextField id="search" label="Sök" variant="outlined" />*/}
                    </Box>

                </Toolbar>

            </Container>

        </AppBar>
    );
}
export default NavigationBar;
/*
        <nav className="nav">
                           <NavLink className='title'
                to="/article">bok</NavLink>
            <div className="links">
                <NavLink className='link'
                to="/article">Köp</NavLink>
                <NavLink className='link'
                to="/article">Sälj</NavLink>
                <NavLink className='link'
                to="/article">Om oss</NavLink>
            </div>
            <div className='rightNav'>
            <form>
                <input
                className="searchBar"
                type="search"/>
            </form>
            <NavLink className='login'
                to="/article">LOGIN</NavLink>
            </div>
            
        </nav>*/

