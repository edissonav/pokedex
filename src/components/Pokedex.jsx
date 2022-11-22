import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changename } from '../store/slices/name.slice';
import Pokemoncard from './Pokemoncard';

const Pokedex = () => {

    const dipatch = useDispatch()

    const userName = useSelector(state => state.name)

    const [pokemons, setPokemons] = useState([])

    const [pokemontype, setPokemontype] = useState([])

    const [page, setPage]=useState(1)
    const pokemonsperpage=20
    const lastindex=page*pokemonsperpage
    const firstindex=lastindex-pokemonsperpage

    const pokemonpaginated= pokemons?.slice(firstindex, lastindex)

    const totalpages= Math.ceil(pokemons?.length /pokemonsperpage) 

    const numbers=[]
    for(let i=1; i<= totalpages; i++){
        numbers.push(i)
    } 

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154') 
            .then(res => setPokemons(res.data.results));

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setPokemontype(res.data.results))

    }, [])
    // console.log(pokemontype);

    const navigate = useNavigate();

    const [pokemonName, setPokemonName] = useState("")

    const searchpokemon = () => {
        navigate(`/pokedex/${pokemonName.toLowerCase()}`)
    }
    const filterType = (e) => {
        axios.get(e.target.value)
        .then(res=> setPokemons(res.data.pokemon))
    }

    const [suggestions, setSuggestions]=useState([])

    useEffect(()=>{

        const filteredpokemons= pokemons.filter((pokemon)=> (pokemon.name === pokemonName))
        setSuggestions(filteredpokemons)
        // axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
        // .then(res=>setSuggestions(res.data))
    },[pokemonName])

    // console.log(suggestions);
    return (
        <div>
            <h1>Welcome {userName}</h1>

            <div>
                <input type="text" placeholder='serch pokemon' value={pokemonName} onChange={e => setPokemonName(e.target.value)} />
                <button onClick={searchpokemon}>Search pokemon</button>
                <select onChange={filterType} name="" id="">
                    {pokemontype.map(type => (
                        <option key={type.url} value={type.url}>{type.name}</option>
                    ))

                    }
                </select>
                {
                    suggestions.map(suggestion=>(
                        <li key={suggestion.url} onClick={searchpokemon}>{suggestion.name}</li>
                    ))
                }
            </div>

            <h2>Pokemons</h2>
            <div>
                    <button disabled={page===1} onClick={()=> setPage(page-1)}>prev page</button>

                    {numbers.map(number=>(
                        <button onClick={()=>setPage(number) }>{number}</button>
                    ))}
                    <button disabled={page=== totalpages} onClick={()=>setPage(page+1)}>next page</button>
                </div>
            <div className='pokemons'>
                
                {
                    pokemonpaginated.map(pokemon => (
                        <Pokemoncard url={pokemon.url ? pokemon.url : pokemon.pokemon.url} key={pokemon.url? pokemon.url : pokemon.pokemon.url} />
                    ))
                }

            </div>
        </div>
    );
};

export default Pokedex;