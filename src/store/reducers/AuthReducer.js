
import { State } from "react-native-gesture-handler";
import { SET_AUTH, CLEAR_AUTH, START_AUTH_LOADING , STOP_AUTH_LOADING} from "../ActionTypes";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      let newState = { ...state };
      newState = action.payload; //{email,token}
      return newState;
      break;
    case CLEAR_AUTH:
      return { email: null, token: null , loading: false};
      break;
    case START_AUTH_LOADING:
      return { ...State, loading: true };
      break;
    case STOP_AUTH_LOADING:
      return { ...State, loading: false };
      break;

    default:
      return state;
  }
};
