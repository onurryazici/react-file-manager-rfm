import React, { Component, useState } from 'react'
const RfmContext = React.createContext();

const actions = {
    SET_DATA:"SET_DATA",
    DELETE_USER:"DELETE_USER",
    SELECT_ITEM:"SELECT_ITEM",
    LEAVE_ITEM:"LEAVE_ITEM"
}
const reducer = (state,action)=>{
    switch(action.type){
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
    }
}

export class RfmProvider extends Component {
    state={
        rfmItems:[],
        selectedItemCount:0,
        fileCount:0,
        tag:"",
        dispatch:action=>{
            this.setState(state=> reducer(state,action))
        }
    }
    render() { 
        return (
            <RfmContext.Provider value={this.state}>
                {this.props.children}
            </RfmContext.Provider>
        )
    }
}

const RfmConsumer = RfmContext.Consumer;

export default RfmConsumer;