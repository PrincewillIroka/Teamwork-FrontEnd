import { combineReducers } from 'redux'
import userReducer from './userReducer'

const appReducer = combineReducers({
    userReducer: userReducer
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer