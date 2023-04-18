import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    content: '',
}

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return {
                visible: true,
                content: action.payload,
            }
        },
        cancelNotification(state, action) {
            return initialState
        },
    }
})

export const { setNotification, cancelNotification } = notificationReducer.actions
export default notificationReducer.reducer
