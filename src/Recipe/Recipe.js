import React, { useEffect, useState } from 'react';
import RecipeItems from "./RecipeItems"
import './items.css'

//id:068759b3
//key:28d61dbaa5f4459af3f4be0b70698fa7
//https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}
const Recipe = () => {

let ID="068759b3";
let KEY="28d61dbaa5f4459af3f4be0b70698fa7";

const [recipe, setRecipe]=useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState('banana')



const handleChange = (e)=>{
    setSearch(e.target.value);
};

const getSearch= (e)=>{
    e.preventDefault()
    setQuery(search)
    setSearch('')
}

const getRecipe = async ()=>{
    const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`
    );
    const data = await response.json();
    console.log(data);
    setRecipe(data.hits);
  };

  useEffect(()=>{
    getRecipe();
    // eslint-disable-next-line
},[query]);

  return (
    <div className='body'>
        <form onSubmit={getSearch} className='form'>
            <input placeholder='search' className='input-field' type='text' value={search} onChange={handleChange}/>
            <button className='search-button'> Search</button>
        </form>
    
    <div className='recipes'>
        {recipe.map((x)=>(
            <RecipeItems
                key={x.recipe.label}
                image={x.recipe.image}
                title={x.recipe.label}
                cal={x.recipe.calories}
                ingredients={x.recipe.ingredients}
            />
            ))}

    </div> <br/>  <br/>
    </div>
);
}
    


export default Recipe;