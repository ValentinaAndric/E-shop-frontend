import isEmpty from "../../../assets/common/is-empty";
import { SET_CURRENT_USER } from "../actions/Auth.actions";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload), //proverava da li je token null ili nije
        user: action.payload, //token
        userProfile: action.userProfile, //podaci o user-u
      };
    default:
      return state;
  }
}
