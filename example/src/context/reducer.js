import {Actions} from './actions';

export function reducer (state,action){
   switch(action.type){
        case Actions.INCREASE_COUNTER:
           state.counter = state.counter + 1;
           return {...state}
        case Actions.DECREASE_COUNTER:
            state.counter = state.counter - 1
            return {...state}
        case Actions.SET_DATA:
            state.counter = 100;
            return {...state}
        default:
            return state
   }
}

/* switch(action.type){
        case actions.SET_DATA:
            return{
                ...state,
                tag:"setdata",
                rfmItems:action.payload,
            };
        case actions.DELETE_USER:
            return {
                ...state,
                tag:"deleteıser",
                rfmItems:state.rfmItems.filter(item => action.payload !== item.id)
            };
        case actions.SELECT_ITEM:
            return {
                ...state, 
                tag:"select item",
                selectedItemCount:state.selectedItemCount + 1
            };
        case actions.LEAVE_ITEM:
            return {
                ...state,
                tag:"leaveitem", 
                selectedItemCount:state.selectedItemCount - 1,
            };
        default:
            return state;
    }*/