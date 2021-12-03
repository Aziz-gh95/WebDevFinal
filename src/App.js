import React, {useState, useEffect} from "react";
import './App.css';
import axios from 'axios'
import Recipe from './Recipe'
import { makeStyles } from "@material-ui/core/styles"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 4px',
    display: 'flex',
    margin: '10px auto',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  
  
}));

function App() {
  const classes = useStyles();
 const APP_ID = "200bd75e";
 const APP_KEY = "425039d6441bf6ebfb754acb8cf8c5f0";
 const [recipes, setRecipes] = useState([])
 const[search, setSearch] = useState('')
 const [query, setQuery] = useState('panipuri')
  useEffect(() => {
    getRecipe();
  }, [query])
  const getRecipe = async () => {
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipes(response.data.hits);
    console.log(response.data.hits)
  };
  const updateSearch = (e) =>{
    setSearch(e.target.value);
    
  }
  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  }
  return ( 
  <div> 
      <Paper onSubmit={updateQuery} component="form" className={classes.root}>
       
        <InputBase
        type ='text'
        value={search}
        onChange={updateSearch}
        className={classes.input}
        placeholder="Hungry For What?"
        inputProps={{'aria-lable': 'Hungry For What?'}}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>
        
        
        </Paper>
      {/*<form onSubmit={updateQuery}>
        <input type='text' value={search} onChange={updateSearch} />
        <button type='submit'>Search</button>
  </form>*/}
  <div style={{margin:'10px'}}> 
  <Grid container>
      {recipes.map((recipe) => (
        <Grid item xs={3}>
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients} />
        </Grid>
      ))}
      </Grid>
      </div>
    </div>
  );
}

export default App;
