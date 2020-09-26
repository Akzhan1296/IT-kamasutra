// import { authAPI } from "../api/api";
// import { stopSubmit } from "redux-form";

import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean,

}

let initialState: InitialStateType  = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  //каждому reducer приходит свой кусочек state
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS // typeof => 'INITIALIZED_SUCCESS'
}

const initializedSuccess = ():InitializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
