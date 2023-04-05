import { createContext, useReducer} from 'react'
import {INCREASE , DESCREASE} from '../ActionTypes'
import { FirstReducer} from '../reducers/FirstReducer'

export const FirstContext = createContext()

const FirstContextProvider = (props) => {
    const [state,dispatch] = useReducer(FirstReducer , { value: 0 })

    const addValue = (value) => {
        dispatch({ type: INCREASE , payload: value})
    }
    const subValue = (value) => {
        dispatch({ type: DESCREASE , payload: value})
    }
    return (
        <FirstContext.Provider
          value = {{state, addValue, subValue}}
        >
            {props.children}
        </FirstContext.Provider>
    )
}

export default FirstContextProvider