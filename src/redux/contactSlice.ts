import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export interface IContact {
    id: number,
    firstName: string
    lastName: string,
    active: boolean
}

let counter = 0;

const contactSlice = createSlice({
    name: 'contact',
    initialState: [] as IContact[],
    reducers: {
        add: (state, action: PayloadAction<Omit<IContact, 'id'>>) => {
            counter++;
            state.push({ id: counter, ...action.payload })
            return state
        },
        edit: (state, action: PayloadAction<IContact>) => {
            state = state.filter(s => s.id !== action.payload.id)
            state.push(action.payload)
            return state
        },
        remove: (state, action: PayloadAction<number>) => {
            state = state.filter(s => s.id !== action.payload)
            return state
        }
    }
})

export const { add, edit, remove } = contactSlice.actions;
export default contactSlice.reducer

export const selectContact = (state: RootState) => state.contact
