import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Pokemoncard = ({ url }) => {

    const [pokemon, setPokemon] = useState({})

    useEffect(
        () => {
            axios.get(url).then(res => setPokemon(res.data))
        }, []
    )
    console.log(pokemon);
    return (
        <div className='pokemon-card'>
            <Link to={`/pokedex/${pokemon.id}`} className='card-container' >
                <div className='info-container'>
                    <div className='pokemon-name'>
                        <h1>{pokemon.name}</h1>
                    </div>
                    <div className='pokemon-stats'>
                        <p><b> type:</b>  {pokemon?.types?.[0].type.name}</p>
                        <p><b> hp: </b>{pokemon?.stats?.[0].base_stat}</p>
                        <p><b> Attack: </b>{pokemon?.stats?.[1].base_stat}</p>
                        <p><b> Defense: </b>{pokemon?.stats?.[2].base_stat}</p>
                        <p><b> Speed :</b>{pokemon?.stats?.[5].base_stat}</p>
                    </div>
                </div>
                <img className='pokemon-img-pokedex' src={pokemon.sprites?.other.home.front_default} alt="" />

            </Link>
        </div>
    );
};

export default Pokemoncard;