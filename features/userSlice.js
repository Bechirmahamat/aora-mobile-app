// import { createSlice } from '@reduxjs/toolkit'
// import { getCurrentUser } from '../lib/appwrite'

// const initialState = {
//     isLoggedIn: false,
//     user: null,
//     isLoading: true,
// }
// export const getUserInformation = createAsyncThunk(
//   'user/info',
//   async (name, { rejectWithValue }) => {
//     try {
//         const user = await getCurrentUser()
//         return user
//     } catch (error) {
//         // Handle errors here and provide specific rejection values
//         if (error.message === 'No current account found') {
//             return rejectWithValue({ message: 'You are not logged in' })
//         } else if (error.message === 'User not found in database') {
//             return rejectWithValue({ message: 'User information not found' })
//         } else {
//             // Handle other unexpected errors
//             return rejectWithValue({ message: 'An unexpected error occurred' })
//         }
//     }
//   },
// )

// export const userSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         saveUserSession: (state, action) => {
//             state.user = action.payload.user
//         },
//         isAuthenticated: (state, action) => {
//             state.isLoggedIn = action.payload.isAuthenticated
//             state.isLoading = false
//         },
//     },
//     extraReducers:(builders)=>{
//      builders.addCase(getUserInformation.)
//     }
// })

// export const { saveUserSession, isAuthenticated } = userSlice.actions

// export default userSlice.reducer
