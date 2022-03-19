import { CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PASSWORD_UPDATE_FAIL, PASSWORD_UPDATE_RESET, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_RESET, GETALL_USER_REQUEST, GETALL_USER_FAIL, GETALL_USER_SUCCESS, GET_SINGLE_USER_REQUEST, GET_SINGLE_USER_SUCCESS, GET_SINGLE_USER_FAIL } from "../constants/UserConstants";


// LOGIN REGISTER REDUCER
export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case LOGIN_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGOUT_USER_SUCCESS:
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            };
        case REGISTER_USER_FAIL:
        case LOGIN_USER_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// PASSWORD UPDATE REDUCER
export const passwordUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_UPDATE_REQUEST:
        case PROFILE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case PASSWORD_UPDATE_SUCCESS:
        case PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case PASSWORD_UPDATE_FAIL:
        case PROFILE_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case PASSWORD_UPDATE_RESET:
        case PROFILE_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// FORGIT PASSWORD REDUCER
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            };
        case FORGOT_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// GET ALL USERS REDUCERS
export const getAllUserReducers = (state = { users: [] }, action) => {
    switch (action.type) {
        case GETALL_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GETALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            };
        case GETALL_USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// GET SINGLE USER DETAILS
export const getSingleUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case GET_SINGLE_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SINGLE_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };
        case GET_SINGLE_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}