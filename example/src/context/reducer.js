import { stat } from 'fs';
import { Actions } from './actions';
export function reducer (state,action){
   switch(action.type){
        case Actions.SET_LOCATION:
           state.location = action.payload;
           return {...state}
        case Actions.DECREASE_COUNTER:
            state.counter = action.payload;
            return {...state}
        case Actions.CLEAR_SELECTED_ITEMS:
            
            return{
                ...state,
                selectedItems:[...state.selectedItems,"clear"]
            }
        case Actions.ADD_SELECTED_ITEMS:
            //state.selectedItems.concat(action.payload);
            return {
                ...state,
                selectedItems:[...state.selectedItems,"add"]
            }
        case Actions.SET_DATA:
            state.counter = 100;
            return {...state}
        default:
            return state
   }
}