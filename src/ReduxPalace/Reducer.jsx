import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: null
}

export const LibraryData = createSlice({
    name: 'libs',
    initialState,
    reducers: {
        libData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { libData } = LibraryData.actions;

export default LibraryData.reducer;