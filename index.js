const redux = require('redux');
const reduxLogger = require('redux-logger')
const applyMiddleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICE_CREAM_ORDERED = "ICE_CREAM_ORDERED";
const ICE_CREAM_RESTOCKED = "ICE_CREAM_RESTOCKED";

function OrderCake() {
   return {
        type: CAKE_ORDERED,
        quantity: 1,
    }
}

function restockCake(qty = 1) {
    return { 
        type: CAKE_RESTOCKED, 
        payload: qty,
    }
}
function orderIceCream(qty = 1) {
    return {
        type: ICE_CREAM_ORDERED,
        payload: qty,
    }
}

function restockIceCream(qty = 1) {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty,
    }
}

const initialCakeState = {
    numberOfCakes: 10,
    numberOfRibbons: 20,
}

const initialIceCreamState = {
    numberOfIceCreams: 30,
}

const cakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1,
                numberOfRibbons: state.numberOfRibbons - 2,
            }
            case CAKE_RESTOCKED: 
            return {
                ...state,
                numberOfCakes: state.numberOfCakes + action.payload,
                numberOfRibbons: state.numberOfRibbons + action.payload * 2
            }
        default:
        return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
            case ICE_CREAM_ORDERED:
                return{
                    ...state,
                    numberOfIceCreams: state.numberOfIceCreams - 1,
                }
            case ICE_CREAM_RESTOCKED:
                return {
                    ...state,
                    numberOfIceCreams: state.numberOfIceCreams + action.payload,
                }
        default:
        return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

const store = createStore(rootReducer, applyMiddleWare(logger))

console.log('Initial State: ', store.getState())
const unsubscribe = store.subscribe(() => {})
store.dispatch(OrderCake())
store.dispatch(OrderCake())
store.dispatch(OrderCake())
store.dispatch(OrderCake())
store.dispatch(restockCake(4))
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(restockIceCream(3))

unsubscribe();
