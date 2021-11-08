import { any } from "prop-types";
import { ADD_TO_INVENTORY,REMOVE_FROM_INVENTORY, LOADING_STATUS,UPDATE_INVENTORY } from "./action";
import { appState, inventoryData } from "../utils/interface";

const initialState: appState = {
    inventory: [],
    loading: true,
    name: "Blue Moon"
}

const Reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case ADD_TO_INVENTORY:
        return {
            ...state,
            inventory: [...state.inventory, ...action.payload]
        };
    case UPDATE_INVENTORY:
        return {
            ...state,
            inventory: action.payload
        };
    case REMOVE_FROM_INVENTORY:
        return {
            ...state,
            inventory: state.inventory.filter((Item:inventoryData) => Item._id !== action.payload)
        };
    case LOADING_STATUS:
        return {
            ...state,
            loading: action.payload
        };
  }
  return state
}

export default Reducer