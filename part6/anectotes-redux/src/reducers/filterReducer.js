const filterReducer = (state = "", action) => {
    switch (action.type){
        case "SET_FILTER":
            return action.payload
        default:
            return state
    }
}

export default filterReducer

export const setFilter = (string) => {
    return {
        type: "SET_FILTER",
        payload: string
    }
}