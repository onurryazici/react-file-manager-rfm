import { size } from 'lodash';
import { Actions } from './actions';
import styles from '../styles.module.css';

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
            const newDirectoryItems = [...state.directoryItems];
            newDirectoryItems.push(action.payload);
            return {
                ...state,
                directoryItems:newDirectoryItems
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
            const selectedItems = [...state.selectedItems];
            selectedItems.forEach((item)=>{
                const accessibleId = item.name + "-" + item.type
                const element = document.getElementById(accessibleId);
                if(typeof(element) != 'undefined' && element != null)
                    element.classList.remove(styles.itemBlockGridViewActive); 
            })
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
        case Actions.CLEAR_SELECTED_SHARED_WITH:{
            const newSelectedItems = [...state.selectedItems];
            newSelectedItems[0].sharedWith=[];
            return {
                ...state,
                selectedItems:newSelectedItems,
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
            const newSelectedItems           = [...state.selectedItems];
            newSelectedItems[0].name         = action.payload.newName;


            const temp                       = newSelectedItems[0].absolutePath;
            newSelectedItems[0].absolutePath = temp.substring(0,temp.lastIndexOf('/')) + '/' + action.payload.newName;

            const element = document.getElementById(action.payload.oldName + "-" + action.payload.itemType);
            element.id    = action.payload.newName + "-" + action.payload.itemType;
            return {
                ...state,
                directoryItems: state.directoryItems.map((item,i)=> 
                    item.name === action.payload.oldName 
                        ? {...item, name:action.payload.newName, absolutePath:temp.substring(0,temp.lastIndexOf('/')) + '/' + action.payload.newName} 
                        : {...item}),
                selectedItems:newSelectedItems
            }
        }
        case Actions.ADD_SHARED_WITH:{
            const index = state.directoryItems.findIndex(element => element.name === action.payload.itemName);
            var newDirectoryItems = [...state.directoryItems];
            var newSelectedItems  = [...state.selectedItems];

            const shareObject = {
                username:action.payload.username,
                read:action.payload.read,
                write:action.payload.write,
            }
            newDirectoryItems[index].sharedWith.push(shareObject);
            newSelectedItems[0] = newDirectoryItems[index];
            return {
                ...state,
                directoryItems:newDirectoryItems,
                selectedItems: newSelectedItems
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
        case Actions.SET_UPLOAD_FILE:{
            const files = action.payload;
            let fileToUpload = state.fileProgress;

            for (let i = 0; i < files.length; i++) {
                
                const id = size(state.fileProgress) + i +1;
                fileToUpload = {
                    ...fileToUpload,
                    [id]: {
                        id:id,
                        file: files[i],
                        progress: 0,
                        failure:false,
                        completed:false
                        },
                }
            }
            return {
                ...state,
                fileProgress:fileToUpload
            }
        }
        case Actions.SET_UPLOAD_PROGRESS:{
            return {
                ...state,
                fileProgress:{
                    ...state.fileProgress,
                    [action.payload.id]:{
                        ...state.fileProgress[action.payload.id],
                        progress:action.payload.progress
                    }
                }
            }
        }
        case Actions.SUCCESS_UPLOAD_FILE:{
            return {
                ...state,
                fileProgress:{
                    ...state.fileProgress,
                    [action.payload]:{
                        ...state.fileProgress[action.payload],
                        failure:false,
                        completed:true,
                    },
                },
            }
        }
        case Actions.FAILURE_UPLOAD_FILE:{
            return {
                ...state,
                fileProgress:{
                    ...state.fileProgress,
                    [action.payload]:{
                        ...state.fileProgress[action.payload],
                        failure:true,
                        completed:false,
                        progress:0,
                    },
                }
            }
        }
        case Actions.SET_RECYCLE_BIN:{
            return {
                ...state,
                isItRecycleBin:action.payload
            }
        }
        case Actions.SET_PREVIEW_ACTIVE:{
            return {
                ...state,
                isPreviewActive:action.payload
            }
        }
        case Actions.SET_PREVIEW_DATA:{
            return {
                ...state,
                previewData:action.payload
            }
        }
        case Actions.SET_RFM_CONFIG:{
            return {
                ...state,
                config:action.payload
            }
        }
        default:
            return state
   }
}

