import { createContext } from "react";
import { useReducer } from "react";

export const Store= createContext();
const initialState={


    userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    
}


function reducer(state,action){

    switch(action.type){
    case 'USER_SIGNOUT':
        return{
            ...state,
            userInfo:null,
            cart:{
                cartItems:[],
                shippingAddress:{},
                paymentMethod:''
            }
           
        }
}
}

export function StoreProvider(props){

    const[state,dispatch]=useReducer(reducer,initialState);
    const value={state,dispatch};

    return <Store.Provider value={value}>{props.children}</Store.Provider>;

}