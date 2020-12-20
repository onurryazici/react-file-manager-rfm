import { stat } from 'fs';
import { Actions } from './actions';
export function reducer (state,action){
   switch(action.type){
        case Actions.SET_LOCATION:
            state.location = action.payload;
            return {...state}
        case Actions.SET_LOADING:
            state.loading = action.payload;
            return {...state}
        case Actions.CLEAR_SELECTED_ITEMS:
            return{
                ...state,
                selectedItems:[],
                selectedItemCount:0
            }
        case Actions.ADD_SELECTED_ITEM:
            //state.selectedItems.concat(action.payload);
            return {
                ...state,
                selectedItems:[...state.selectedItems,action.payload],
                selectedItemCount: state.selectedItemCount + 1
            }
        case Actions.REMOVE_SELECTED_ITEM:
            return {
                ...state,
                selectedItems:[
                    ...state.selectedItems.slice(0,action.payload),
                    ...state.selectedItems.slice(action.payload + 1)
                ],
                selectedItemCount:state.selectedItemCount -  1
            }
        case Actions.SET_DIRECTORY_ITEMS:
            return {
                ...state,
                directoryItems:action.payload
            }
        case Actions.SET_SHOW_HIDDEN_FILES:
            return {
                ...state,
                showHiddenFiles:action.payload
            }
        default:
            return state
   }
}