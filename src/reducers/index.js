import {combineReducers} from 'redux'

const init ={
    id:'',
    username:'',
    firstname:'',
    error:'',
    success:'',
    countCart:'',
    userStat:''
}

const AuthReducer = (state= init, action)=>{
    
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          id: action.payload.id,
          username: action.payload.username,
          firstname: action.payload.first_name
        };
      case "LOGIN_ERROR":
        return {
          ...state,
          error: action.payload.data,
          success: ""
        };
      case "KEEP_LOGIN":
        return {
          ...state,
          username: action.payload.username
        };

      case "TIMEOUT":
        return { ...state, error: "", success: "" };

      case "LOGOUT":
        return { ...state, ...init };

      case "AUTH_ERROR":
        return { ...state, error: action.payload, success: "" };

      case "AUTH_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "ADD_PROD_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "ADD_PROD_ERROR":
        return { ...state, error: action.payload, success: "" };

      case "ADD_CART_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "ADD_CART_ERROR":
        return { ...state, error: action.payload, success: "" };
        
      case "EDIT_PROFILE_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "EDIT_PROFILE_ERROR":
        return { ...state, error: action.payload, success: "" };

      case "EDIT_CATG_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "EDIT_CATG_ERROR":
        return { ...state, error: action.payload, success: "" };

      case "EDIT_STOCK_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "EDIT_STOCK_ERROR":
        return { ...state, error: action.payload, success: "" };

      case "EDIT_SERVICE_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "EDIT_SERVICE_ERROR":
        return { ...state, error: action.payload, success: "" };

      case "EDIT_ORDER_SUCCESS":
        return { ...state, error: "", success: action.payload };

      case "EDIT_ORDER_ERROR":
        return { ...state, error: action.payload, success: "" };

      default:
        return state;
    }
}

export default combineReducers(
    {
        auth: AuthReducer
        
    }
)