import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import video from '../assets/sun-moon-team-up.mp4'
import logo from '../assets/Pokemon-Logo.png'

const PokemonDetail = () => {



    const [pokemon, setPokemon] = useState({})
    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => setPokemon(res.data))
    }, [id])
    console.log(pokemon);
    return (

        <div className="principal-container-details">
            {/* <video className='video' src={video} autoPlay loop ></video> */}
            <div className='detail-container'>
                <div className='logo-container'>
                    <img src={logo} alt="" />
                </div>
                <div className='principal-info-container'>
                    <img src={pokemon.sprites?.other.dream_world.front_default} alt="" />

                    <div className='info-detail'>
                        <h2><b>Weight: {pokemon.weight}</b></h2>
                        <h2><b>Height:{pokemon.height}</b></h2>
                    </div>

                    <div className='name-id'>
                        <h1>{pokemon.name}</h1>
                        <p>#{pokemon.id}</p>
                    </div>

                </div>
                <div className='tyab-container'>
                    <div className='type-container'>
                        <h2>Types</h2>
                        <div>
                            <h3>{pokemon.types?.[0].type.name}</h3>
                        </div>
                        <div>
                            <h3>{pokemon.types?.[1]?.type.name}</h3>
                        </div>

                    </div>
                    <div className="abilities-container">
                        <h2>Habilities</h2>
                        <div>
                            <h3>{pokemon.abilities?.[0].ability.name}</h3>
                            <h3>{pokemon.abilities?.[1].ability.name}</h3>
                        </div>

                    </div>
                </div>
                <div className="stats-container">
                    <h2>stats</h2>
                    {
                        pokemon.stats?.map(stat => (
                            <div className='stat-info'>
                                <label htmlFor="">{stat.stat.name}</label>
                                <div>
                                    {stat.base_stat}
                                </div>
                            </div>

                        ))
                    }

                </div>
            </div>
            <div className="movements-container">
                <h2>Movements</h2>
                <div className='movements-detail'>
                {
                    pokemon.moves?.map(move => (
                        <li >{move.move.name}</li>
                    ))
                }
                </div>
            </div>

        </div>

    );
};

export default PokemonDetail;