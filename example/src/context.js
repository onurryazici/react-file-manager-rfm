import React, { Component, useState } from 'react'
const RfmContext = React.createContext();

const actions = {
    DELETE_USER:"DELETE_USER",
    SELECT_ITEM:"SELECT_ITEM",
    LEAVE_ITEM:"LEAVE_ITEM"
}
const reducer = (state,action)=>{
    switch(action.type){
        case actions.DELETE_USER:
            return {
                ...state,
                rfmItems:state.rfmItems.filter(item => action.payload !== item.id)
            };
        case actions.SELECT_ITEM:
            return {
                ...state, 
                selectedItemCount:state.selectedItemCount + 1
            };
        case actions.LEAVE_ITEM:
            return {
                ...state, 
                selectedItemCount:state.selectedItemCount - 1,
            };
        default:
            return state;
    }
}

export class RfmProvider extends Component {
    state={
        rfmItems:[
        {
            id:1,
            itemName:"onur",
            type:"folder"
        },
        {
            id:2,
            itemName:"onur.txt",
            type:"file"
        },],
        selectedItemCount:0,
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