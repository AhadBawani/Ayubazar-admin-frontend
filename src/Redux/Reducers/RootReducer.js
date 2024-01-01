import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";

const RootReducer = combineReducers({
    Admin:AdminReducer
});

export default RootReducer;