import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

const countriesSlice = createSlice({
    name: 'countries',
    initialState: [] as string[],
    reducers: {
        updateList: (state, action: PayloadAction<string[]>) => {
            state = action.payload;
            return state;
        }
    }
})

export const { updateList } = countriesSlice.actions
export default countriesSlice.reducer
export const selectCountries = (state: RootState) => state.countries