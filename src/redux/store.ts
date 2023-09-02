import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './contactSlice';
import countriesReducer from './countriesSlice'

export const store = configureStore({
    reducer: {
        contact: contactReducer,
        countries: countriesReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch