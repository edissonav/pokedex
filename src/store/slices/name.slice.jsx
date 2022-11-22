import { createSlice } from '@reduxjs/toolkit';

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const nameSlice = createSlice({
		name: 'name',
    initialState: "",
    reducers: {
        changename:(state, action)=>{

            const username= action.payload
            return username
        }
    }
})

export const { changename } = nameSlice.actions;

export default nameSlice.reducer;