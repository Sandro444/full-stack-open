const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.notification
        case "REMOVE_NOTIFICATION":
            return ""
        default:
            return state
    }
}

export const setNotification = (message, seconds) => {
    return dispatch => {
    setTimeout(()=>dispatch(removeNotification()), seconds*1000)
    dispatch({
        type: "SET_NOTIFICATION",
        notification: message
    })}
    
    
}

export const removeNotification = () => {
    return {
        type: "REMOVE_NOTIFICATION"
    }
}
export default notificationReducer