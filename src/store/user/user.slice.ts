import { createSlice } from '@reduxjs/toolkit'

const MOCK_USER_TOKEN = 'mock_demo_token'

interface IUser {
    isAuth: boolean
}

const initialState: IUser = {
    isAuth: localStorage.getItem(MOCK_USER_TOKEN) ? true : false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin(state) {
            state.isAuth = true
            localStorage.setItem(MOCK_USER_TOKEN, MOCK_USER_TOKEN)
        },

        userUnLogin(state) {
            state.isAuth = false
            localStorage.removeItem(MOCK_USER_TOKEN)
        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer
