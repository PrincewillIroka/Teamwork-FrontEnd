import * as Actions from '../actions'

const initialState = {
    userData: JSON.parse(localStorage.getItem('userData')) || {},
    isLoggedIn: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.POPULATE_USER_DATA: {
            return {
                ...state,
                userData: action.payload,
                isLoggedIn: !state.isLoggedIn
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer