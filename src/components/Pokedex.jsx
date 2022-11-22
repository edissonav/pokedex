import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changename } from '../store/slices/name.slice';
import Pokemoncard from './Pokemoncard';
import '../pokedex.css'

const Pokedex = () => {

    const dipatch = useDispatch()

    const userName = useSelector(state => state.name)

    const [pokemons, setPokemons] = useState([])

    const [pokemontype, setPokemontype] = useState([])

    const [page, setPage] = useState(1)
    const pokemonsperpage = 20
    const lastindex = page * pokemonsperpage
    const firstindex = lastindex - pokemonsperpage

    const pokemonpaginated = pokemons?.slice(firstindex, lastindex)

    const totalpages = Math.ceil(pokemons?.length / pokemonsperpage)

    const numbers = []
    for (let i = 1; i <= totalpages; i++) {
        numbers.push(i)
    }

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results));

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setPokemontype(res.data.results))

    }, [])
    // console.log(pokemontype);

    const allPokemons = () => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154')
            .then(res => setPokemons(res.data.results));
    }

    const navigate = useNavigate();

    const [pokemonName, setPokemonName] = useState("")

    const searchpokemon = () => {
        navigate(`/pokedex/${pokemonName.toLowerCase()}`)
    }
    const filterType = (e) => {
        if ((e.target.value) === "All Pokemons") { allPokemons() }
        else {
            axios.get(e.target.value)
                .then(res => setPokemons(res.data.pokemon))
        }
    }

    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {

        const filteredpokemons = pokemons.filter((pokemon) => (pokemon.name === pokemonName))
        setSuggestions(filteredpokemons)
        // axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        // .then(res=>setSuggestions(res.data))
    }, [pokemonName])

    // console.log(suggestions);
    return (
        <div className='pokedex-container'>
            <div className='search-container'>
                <h1 className='pokedex-tittle'>Welcome {userName}</h1>
                <select className='select-type' onChange={filterType} name="" id="">
                    <option value='All Pokemons'>All Pokemons</option>
                    {pokemontype.map(type => (
                        <option key={type.url} value={type.url}>{type.name}</option>
                    ))

                    }
                </select>
                <div className='search-name'>
                    <input className='search-input' type="text" placeholder='Search Pokemon' value={pokemonName} onChange={e => setPokemonName(e.target.value)} />
                    <button className='search-button' onClick={searchpokemon}>Search</button>
                </div>
                {/* {
                    suggestions.map(suggestion=>(
                        <li key={suggestion.url} onClick={searchpokemon}>{suggestion.name}</li>
                    ))
                } */}

                <h2 className='pokedex-tittle' >Pokemon List</h2>
            </div>



            <div className='pokemons'>

                {
                    pokemonpaginated.map(pokemon => (
                        <Pokemoncard url={pokemon.url ? pokemon.url : pokemon.pokemon.url} key={pokemon.url ? pokemon.url : pokemon.pokemon.url} />
                    ))
                }


            </div>
            <div className='page-container'>
                <div className='prev-button-container'>
                <button className='prev-button  next-prev' disabled={page === 1} onClick={() => setPage(page - 1)}>prev page</button>
                </div>
                <div className='page-button-container'>
                {numbers.map(number => (
                    <button className='page-button' key={number} onClick={() => setPage(number)}>{number} </button>
                ))}
                </div>
                <div className='next-button-container'>
                <button className='next-button next-prev ' disabled={page === totalpages} onClick={() => setPage(page + 1)}>next page</button>
                </div>
            </div>
        </div>
    );
};

export default Pokedex;