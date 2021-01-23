import { Actions } from './actions';
export function reducer (state,action){
   switch(action.type){
        case Actions.SET_LOCATION:{
            state.location = action.payload;
            state.modalLocation = action.payload;
            state.modalLoading = true;
            return {...state}
        }
        case Actions.SET_MODAL_LOCATION:{
            state.modalLocation = action.payload;
            return {...state}
        }
        case Actions.SET_START_LOCATION:{
            state.startLocation = action.payload;
            return {...state}
        }
        case Actions.ADD_DIRECTORY_ITEM:{
            return{
                ...state,
                directoryItems:state.directoryItems.concat(action.payload)
            }
        }
        case Actions.SET_ERROR:{
            state.hasError = action.payload;
            return {...state}
        }
        case Actions.SET_LOADING:{
            state.loading = action.payload;
            return {...state}
        }
        case Actions.SET_MODAL_LOADING:{
            state.modalLoading = action.payload;
            return {...state}
        }
        case Actions.CLEAR_SELECTED_ITEMS:{
            return {
                ...state,
                selectedItems:[],
                selectedItemCount:0
            }
        }
        case Actions.ADD_SELECTED_ITEM:{
            return {
                ...state,
                selectedItems: state.selectedItems.concat(action.payload),
                selectedItemCount: state.selectedItemCount + 1
            }
        }
        case Actions.REMOVE_SELECTED_ITEM:{
            return {
                ...state,
                selectedItems:[
                    ...state.selectedItems.slice(0,action.payload),
                    ...state.selectedItems.slice(action.payload + 1)
                ],
                selectedItemCount:state.selectedItemCount -  1
            }
        }
        case Actions.SET_DIRECTORY_ITEMS:{
            return {
                ...state,
                directoryItems:action.payload
            }
        }
        case Actions.SET_MODAL_DIRECTORY_ITEMS:{
            return {
                ...state,
                modalDirectoryItems:action.payload
            }
        }
        case Actions.RENAME_ITEM:{
            return {
                ...state,
                directoryItems: state.directoryItems.map((item,i)=> 
                    item.name === action.payload.oldName 
                        ? {...item, name:action.payload.newName} 
                        : {...item})
            }
        }
        case Actions.ADD_SHARED_WITH:{
            const index = state.directoryItems.findIndex(element=>element.name === action.payload.itemName);
            const newDirectoryItems = [...state.directoryItems];
            const newSelectedItems  = [...state.selectedItems];

            const shareObject = {
                username:action.payload.username,
                read:action.payload.read,
                write:action.payload.write,
                execute:action.payload.execute
            }

            newDirectoryItems[index].sharedWith.push(shareObject)
            newSelectedItems[0].sharedWith.push(shareObject);
            return {
                ...state,
                directoryItems: newDirectoryItems,
                selectedItems : newSelectedItems
            }
        }
        case Actions.UPDATE_SHARED_WITH:{
            const d_index = state.directoryItems.findIndex(element=>element.name === action.payload.itemName); // directoryItems
            const s_index = state.selectedItems[0].sharedWith.findIndex(element=>element.username === action.payload.username); // selectedItems
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
                directoryItems: newDirectoryItems,
                selectedItems : newSelectedItems
            }
        }
        case Actions.DELETE_SHARED_WITH:{
            const dir_index = state.directoryItems.findIndex(element=>element.name === action.payload.itemName); // directoryItems
            const newDirectoryItems = [...state.directoryItems];
            const newSelectedItems  = [...state.selectedItems];
            
            newDirectoryItems[dir_index].sharedWith = newDirectoryItems[dir_index].sharedWith.filter((item)=> item.username !== action.payload.username);
            newSelectedItems[0].sharedWith          = newSelectedItems[0].sharedWith.filter((item)=>item.username !== action.payload.username);
            return {
                ...state,
                directoryItems: newDirectoryItems,
                selectedItems: newSelectedItems
            }
        }
        default:
            return state
   }
}