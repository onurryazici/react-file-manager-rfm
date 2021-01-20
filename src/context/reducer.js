import { Actions } from './actions';
export function reducer (state,action){
   switch(action.type){
        case Actions.SET_LOCATION:
            state.location = action.payload;
            return {...state}
        case Actions.SET_START_LOCATION:
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
        case Actions.ADD_SHARED_WITH:
            const index = state.directoryItems.findIndex(element=>element.name === action.payload.itemName);
            const newArray = [...state.directoryItems];

            const shareObject = {
                username:action.payload.username,
                read:action.payload.read,
                write:action.payload.write,
                execute:action.payload.execute
            }
            newArray[index].sharedWith.push(shareObject)
            return {
                ...state,
                directoryItems:newArray,
                selectedItems:[state.selectedItems[0],shareObject]
            }
        
        case Actions.UPDATE_SHARED_WITH:
            const d_index = state.directoryItems.findIndex(element=>element.name === action.payload.itemName);
            const s_index = state.selectedItems[0].sharedWith.findIndex(element=>element.username === action.payload.username);
            const newDirectoryItems = [...state.directoryItems];
            const newSelectedItems  = [...state.selectedItems];

            newDirectoryItems[d_index].sharedWith.map((element,i)=>{
                if(element.username === action.payload.username){
                    element.read    = action.payload.read;
                    element.write   = action.payload.write;
                    element.execute = action.payload.execute;
                }  
            })
            newSelectedItems[0].sharedWith[s_index].read    = action.payload.read;
            newSelectedItems[0].sharedWith[s_index].write   = action.payload.write;
            newSelectedItems[0].sharedWith[s_index].execute = action.payload.execute;
            return {
                ...state,
                directoryItems:newDirectoryItems,
                selectedItems:newSelectedItems
            }
        default:
            return state
   }
}