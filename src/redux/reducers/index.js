import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from './userSlice';

const rootreducer = combineReducers({
    auth: authReducer,
    user: userReducer
});
export default rootreducer