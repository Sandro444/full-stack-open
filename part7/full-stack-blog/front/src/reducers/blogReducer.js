const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "create":
            console.log("create")
            return {
                ...state,
                status: action.payload
            }
        case "set user": 
            console.log("setting user")
            return {
                ...state,
                user: action.payload
            }
        case "set token":
            console.log("settoken")
            return {
                ...state,
                token: action.payload
            }
        case "set all users":
            return{
                ...state,
                allUsers: action.payload
            }
        case "updated":
            return {
                ...state,
                status: action.payload
            }
        case "deleted":
            console.log("delete")
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}

const initialState = {
    status:"",
    token: "",
    user:"",
    allUsers:[]
}

export default blogReducer