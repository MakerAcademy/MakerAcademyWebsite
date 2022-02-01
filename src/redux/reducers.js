import { combineReducers } from "redux";

import counter from "@redux/slices/counter";

const rootReducer = combineReducers({ counter });

export default rootReducer;
