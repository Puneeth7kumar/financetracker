import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootreducer = combineReducers({
    auth: authReducer,

});
export default rootreducer