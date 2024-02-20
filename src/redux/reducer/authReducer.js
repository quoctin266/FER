import { LOGIN, LOGOUT, UPDATE } from "../type/types";

const INITIAL_STATE = {
  id: "",
  firstName: "",
  lastName: "",
  dob: "",
  address: "",
  phone: "",
  name: "",
  email: "",
  img: "",
  role: -1,
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
  googleAuth: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        ...INITIAL_STATE,
      };

    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
