import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {



    const [pokemon, setPokemon]=useState({})
    const {id}=useParams()

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res=> setPokemon(res.data))
    },[id])
    console.log(pokemon);
    return (
        <div>
            <h1>Pokemon Detail</h1>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />
        </div>
    );
};

export default PokemonDetail;