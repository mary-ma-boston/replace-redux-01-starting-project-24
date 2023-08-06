import {useState, useEffect} from 'react';

let golbalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
    const setState = useState(golbalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](golbalState, payload);
        golbalState = {...golbalState, ...newState};

        for(const listener of listeners) {
            listener(golbalState)
        }
    }

    useEffect(()=>{
        if(shouldListen) {
            listeners.push(setState);
        }
       

        return () => {
            if(shouldListen) {
                listeners = listeners.filter(li=> li !== setState);
            }   
        }
    },[setState, shouldListen]);

    return [golbalState, dispatch];
};

export const initStore = (userActions, intialState) => {
    if(intialState) {
        golbalState = {...golbalState, ...intialState};
    }
    actions = {...actions, ...userActions};
};