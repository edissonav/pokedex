import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Pokemoncard = ({url}) => {

    const [pokemon, setPokemon]=useState({})

    useEffect(
        ()=>{
            axios.get(url).then(res=> setPokemon(res.data))
        },[]
    )
    // console.log(pokemon);
    return (
        <div className='pokemon-card'>
            <Link to={`/pokedex/${pokemon.id}`}>
            
            <h1>{pokemon.name}</h1>
            <img className='pokemon-img-pokedex' src={pokemon.sprites?.other.home.front_default} alt="" />
            <h2>type:{pokemon?.types?.[0].type.name}</h2>
            </Link>
        </div>
    );
};

export default Pokemoncard;