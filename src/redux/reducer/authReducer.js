import { LOGIN, LOGOUT } from "../type/types";

const INITIAL_STATE = {
  name: "",
  email: "",
  img: "",
  role: -1,
  accessToken: "",
  refreshToken: "",
  isAuthenticated: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        name: action?.payload?.name,
        email: action?.payload?.email,
        img: action?.payload?.img,
        role: action?.payload?.role,
        accessToken: action?.payload?.accessToken,
        refreshToken: action?.payload?.refreshToken,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        name: "",
        email: "",
        img: "",
        role: -1,
        accessToken: "",
        refreshToken: "",
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default authReducer;
