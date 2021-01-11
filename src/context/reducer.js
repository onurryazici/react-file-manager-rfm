import { Actions } from './actions';
export function reducer (state,action){
   switch(action.type){
        case Actions.SET_LOCATION:
            state.location = action.payload;
            return {...state}
        case Actions.ADD_DIRECTORY_ITEM:
            return{
                ...state,
                directoryItems:state.directoryItems.concat(action.payload)
            }
        case Actions.SET_ERROR:
            state.hasError = action.payload;
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
            return {
                ...state,
                selectedItems:state.selectedItems.concat(action.payload),
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
        case Actions.RENAME_ITEM:
            return {
                ...state,
                directoryItems:state.directoryItems.map((item,i)=> 
                    item.name === action.payload.oldName 
                    ? {...item, name:action.payload.newName} 
                    : {...item} 
                    )
                }
            /*return state.directoryItems.map((item,index)=>{
                if(item.name===action.payload.oldName){
                    return {
                        ...item,
                        name:action.payload.newName
                    }
                }
            })*/
        default:
            return state
   }
}