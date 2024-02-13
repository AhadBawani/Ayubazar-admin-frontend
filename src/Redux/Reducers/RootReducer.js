import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import ComponentsReducer from "./ComponentsReducer";

const RootReducer = combineReducers({
    Admin:AdminReducer,
    Component:ComponentsReducer
});

export default RootReducer;