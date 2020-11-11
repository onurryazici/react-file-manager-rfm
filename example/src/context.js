import React, { Component } from 'react'
const RfmContext = React.createContext();

const reducer = (state,action)=>{
    switch(action.type){
        case "DELETE_USER":
            return {
                ...state,
                rfmItems:state.rfmItems.filter(item => action.payload !== item.id)
            }
        case "SELECT_ITEM":
            return alert("OKKK")
            
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
        },
        ],
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