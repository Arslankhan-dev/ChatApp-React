import { createContext, useReducer} from 'react'
// import {INCREASE , DESCREASE} from '../ActionTypes'
import {SET_AUTH,CLEAR_AUTH,START_AUTH_LOADING,STOP_AUTH_LOADING} from '../ActionTypes'
import { AuthReducer} from '../reducers/AuthReducer'
import {async} from '@firebase/util'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../config/firebase'

const auth = getAuth()

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
    const [state,dispatch] = useReducer(AuthReducer ,{
             email: null,
             token: null,
             loading: false
            });

    const setAuth = async (email,password) => {
        dispatch({ type: START_AUTH_LOADING })
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in

          const user = userCredential.user;
          dispatch({
            type: SET_AUTH,
            payload:{
            email,
            token: user.stsTokenManager.accessToken,
            loading: false
            }
        })
          alert("User Logined Success");
          // props.navigation.navigate("Users");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("User don't login because" + errorMessage);
          dispatch({
            type: STOP_AUTH_LOADING,
        })
        });
    }
    const clearAuth = (value) => {
        dispatch({ type: CLEAR_AUTH , payload: value})
    }
    return (
        <AuthContext.Provider
          value = {{state, setAuth, clearAuth}}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider