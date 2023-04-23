import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    content: '',
}

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        notificationSet(state, action) {
            return {
                visible: true,
                content: action.payload,
            }
        },
        notificationCancel(state, action) {
            return initialState
        },
    }
})

export const { notificationSet, notificationCancel } = notificationReducer.actions

export const setNotification = (content, duration) => {
    return async (dispatch) => {
        dispatch(notificationSet(content))
        setTimeout(() => dispatch(notificationCancel()), duration * 1000);
    }
}

export default notificationReducer.reducer
