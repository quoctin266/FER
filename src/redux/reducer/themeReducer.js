import { CHANGE_THEME_DARK, CHANGE_THEME_LIGHT } from "../type/types";

const INITIAL_STATE = {
  background: "dark",
  color: "light",
};

const themeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME_DARK:
      return {
        ...state,
        background: "dark",
        color: "light",
      };

    case CHANGE_THEME_LIGHT:
      return {
        ...state,
        background: "light",
        color: "dark",
      };

    default:
      return state;
  }
};

export default themeReducer;
