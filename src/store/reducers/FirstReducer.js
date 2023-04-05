import { INCREASE , DESCREASE} from '../ActionTypes'

export const FirstReducer = (state, action) => {
    switch (action.type) {
        case INCREASE:
            let newState = { ...state }
            newState.value = newState.value + action.payload
            return newState
            break
        case DESCREASE:
            let subState = { ...state }
            subState.value = subState.value - action.payload 
            return subState
            break
        default:
            return state

    }
}