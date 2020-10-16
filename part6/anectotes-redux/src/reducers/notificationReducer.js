const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.notification
        default:
            return state
    }
}

export const setNotification = (message) => {
    return {
        type: "SET_NOTIFICATION",
        notification: message
    }
}

export default notificationReducer