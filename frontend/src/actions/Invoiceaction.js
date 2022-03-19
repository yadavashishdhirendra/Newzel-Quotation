import {
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAIL,
    CLEAR_ERRORS,
    GET_ALLINVOICE_REQUEST,
    GET_ALLINVOICE_SUCCESS,
    GET_ALLINVOICE_FAIL,
    GET_SINGLE_INVOICE_REQUEST,
    GET_SINGLE_INVOICE_SUCCESS,
    GET_SINGLE_INVOICE_FAIL,
    INVOICE_DELETE_REQUEST,
    INVOICE_DELETE_SUCCESS,
    INVOICE_DELETE_FAIL,
    INVOICE_UPDATE_REQUEST,
    INVOICE_UPDATE_SUCCESS,
    INVOICE_UPDATE_FAIL,
    GET_LOGGED_IN_INVOICE_REQUEST,
    GET_LOGGED_IN_INVOICE_SUCCESS,
    GET_LOGGED_IN_INVOICE_FAIL
} from "../constants/InvoiceConstants";
import axios from 'axios';

// CREATE NEW INVOICE
export const newInvoice = (companyname, revisionnumber, customerrefno, projectname, kindatt, to, contact, validity, itemname, products, items) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_INVOICE_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`/api/v1/createinvoice`, { companyname, revisionnumber, customerrefno, projectname, kindatt, to, contact, validity, itemname, products, items }, config)
        dispatch({
            type: CREATE_INVOICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_INVOICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET ALL INVOICE
export const getInvoice = (month, value) => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALLINVOICE_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`/api/v1/getinvoice`, { month, value }, config);
        dispatch({
            type: GET_ALLINVOICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALLINVOICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET SINGLE INVOICE
export const getSingleInvoice = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_SINGLE_INVOICE_REQUEST
        })

        const { data } = await axios.get(`/api/v1/getsingleinvoice/${id}`);
        dispatch({
            type: GET_SINGLE_INVOICE_SUCCESS,
            payload: data.getInvoice
        })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_INVOICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// DELETE INVOICE
export const deleteInvoice = (id) => async (dispatch) => {
    try {
        dispatch({
            type: INVOICE_DELETE_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/deleteinvoice/${id}`);
        dispatch({
            type: INVOICE_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: INVOICE_DELETE_FAIL,
            payload: error.response.data.message
        })
    }
}

// UPDATE INVOICE
export const updateInvoice = (id, companyname, revisionnumber, customerrefno, projectname, kindatt, to, contact, validity, products, items) => async (dispatch) => {
    try {
        dispatch({
            type: INVOICE_UPDATE_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.put(`/api/v1/updateinvoice/${id}`, { companyname, revisionnumber, customerrefno, projectname, kindatt, to, contact, validity, products, items }, config);
        dispatch({
            type: INVOICE_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: INVOICE_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// GET LOGGED IN USER PRODUCTS
export const getLoggedInvoice = (month, value) => async (dispatch) => {
    try {
        dispatch({
            type: GET_LOGGED_IN_INVOICE_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post(`/api/v1/logged/invoice`, { month, value }, config);
        dispatch({
            type: GET_LOGGED_IN_INVOICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_LOGGED_IN_INVOICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}