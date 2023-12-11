const redux = require('redux');
const immer = require('immer')
const produce = immer.produce
const createStore = redux.createStore
const DISPLAY_INFO = "DISPLAY_INFO";

const initialState = {
    name: "Daisy Dawn",
    personalInfo: {
        street: "4 Washington Street, MaryLand",
        telephone: "+23456-789-097",
        dateOfBirth: "19th April 2001"
    }
}

function displayMyInformation(street) {
    return {
        type: DISPLAY_INFO,
        payload: street,
    }
}

const InfoReducer = (state = initialState, action) => {
    switch(action.type){
        case DISPLAY_INFO:
            return produce(state, (draft) => {
                draft.personalInfo.street = action.payload
            })   
        default:
            return state
    }
}

const store = createStore(InfoReducer)
console.log("Initial State: ", store.getState())
const unsubscribe = store.subscribe(() => console.log("Updated State: ", store.getState()))
store.dispatch(displayMyInformation("8 Main Street, Kansas State"))
unsubscribe()