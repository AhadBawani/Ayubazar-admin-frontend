import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import ComponentsReducer from "./ComponentsReducer";
import AdminUserReducer from "./AdminUserReducer";

const RootReducer = combineReducers({
    User:AdminUserReducer,
    Admin:AdminReducer,
    Component:ComponentsReducer
});

export default RootReducer;