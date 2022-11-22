import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changename } from '../store/slices/name.slice';

const InputData = () => {


    const [userName, setUsername] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const entername = () => {
        if (userName) {
            navigate("/pokedex")
            dispatch(changename(userName))
        }
        else { alert('I need to know your name to start') }

    }
    return (
        <div className='input-container'>
        <div className='input'>

            {/* <img className='input-background' src="/src/assets/pokedex.jpg" alt="" /> */}


            <div className='input-data'>
                <h1>Welcome Trainer </h1>

            </div>
            {/* <img className='img-input' src="https://www.seekpng.com/png/full/201-2011786_red-by-xous-54-red-pokemon-trainer-png.png" alt="" /> */}

            <div className='input-name'>
                <h2>What's your name:</h2>

                <input placeholder='Name' type="text" onChange={e => setUsername(e.target.value)} value={userName} />
                <button className='button-send' onClick={entername}><i className='bx bxs-send'></i></button>
            </div>
        </div>
        </div>
    );
};

export default InputData;