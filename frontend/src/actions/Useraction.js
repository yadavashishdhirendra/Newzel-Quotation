import {
    CLEAR_ERRORS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    GETALL_USER_FAIL,
    GETALL_USER_REQUEST,
    GETALL_USER_SUCCESS,
    GET_SINGLE_USER_FAIL,
    GET_SINGLE_USER_REQUEST,
    GET_SINGLE_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    PASSWORD_UPDATE_FAIL,
    PASSWORD_UPDATE_REQUEST,
    PASSWORD_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../constants/UserConstants";
import axios from 'axios';

// REGISTER ACTION
export const RegisterUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`/api/v1/register`, { name, email, password }, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// LOGIN ACTION
export const LoginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_USER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`/api/v1/login`, { email, password }, config);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// LOAD USER ACTION
export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        })

        const { data } = await axios.get(`/api/v1/me`);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`);

        dispatch({
            type: LOGOUT_USER_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// PASSWORD UPDATE 
export const passwordUpdate = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: PASSWORD_UPDATE_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/password-update`, { oldPassword, newPassword }, config)
        dispatch({
            type: PASSWORD_UPDATE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`/api/v1/password/forgot`, { email }, config)
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// RESET PASSWORD OR CHANGE PASSWORD
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, { password, confirmPassword }, config)
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE USER PROFILE
export const updateProfile = (avatar) => async (dispatch) => {
    try {
        dispatch({
            type: PROFILE_UPDATE_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.put(`/api/v1/updateavatar`, {avatar}, config);

        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// LOAD USER ACTION
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: GETALL_USER_REQUEST
        })

        const { data } = await axios.get(`/api/v1/getallusers`);
        dispatch({
            type: GETALL_USER_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: GETALL_USER_FAIL,
            payload: error.response.data.message
        })
    }
}


// GET SINGLE USER DETAILS
export const getSingleUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_USER_REQUEST
        })

        const { data } = await axios.get(`/api/v1/getsingleuser/${id}`);
        dispatch({
            type: GET_SINGLE_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}