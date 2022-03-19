import { CREATE_INVOICE_REQUEST, CREATE_INVOICE_SUCCESS, CREATE_INVOICE_FAIL, CREATE_INVOICE_RESET, CLEAR_ERRORS, GET_ALLINVOICE_REQUEST, GET_ALLINVOICE_SUCCESS, GET_ALLINVOICE_FAIL, GET_SINGLE_INVOICE_REQUEST, GET_SINGLE_INVOICE_SUCCESS, GET_SINGLE_INVOICE_FAIL, INVOICE_DELETE_REQUEST, INVOICE_DELETE_SUCCESS, INVOICE_DELETE_FAIL, INVOICE_DELETE_RESET, INVOICE_UPDATE_SUCCESS, INVOICE_UPDATE_FAIL, INVOICE_UPDATE_RESET, INVOICE_UPDATE_REQUEST, GET_LOGGED_IN_INVOICE_REQUEST, GET_LOGGED_IN_INVOICE_SUCCESS, GET_LOGGED_IN_INVOICE_FAIL } from "../constants/InvoiceConstants";

// CREATE INVOICE REDUCERS
export const createInvoiceReducer = (state = { createInvoice: {} }, action) => {
    switch (action.type) {
        case CREATE_INVOICE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case CREATE_INVOICE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                createInvoice: action.payload.createInvoice
            };
        case CREATE_INVOICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_INVOICE_RESET:
            return {
                ...state,
                success: false
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

// GET ALL INVOICE REDUCERS
export const getAllInvoiceReducer = (state = { Invoices: [] }, action) => {
    switch (action.type) {
        case GET_ALLINVOICE_REQUEST:
            return {
                loading: true,
                Invoices: []
            };
        case GET_ALLINVOICE_SUCCESS:
            return {
                loading: false,
                Invoices: action.payload.Invoices,
                InvoiceCount: action.payload.InvoiceCount
            };
        case GET_ALLINVOICE_FAIL:
            return {
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

// GET SINGLE INVOICE DETAILS
export const invoiceDetailsReducer = (state = { getInvoice: {} }, action) => {
    switch (action.type) {
        case GET_SINGLE_INVOICE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_SINGLE_INVOICE_SUCCESS:
            return {
                loading: false,
                getInvoice: action.payload,
            };
        case GET_SINGLE_INVOICE_FAIL:
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

// DELETE INVOICE 
export const invoiceDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case INVOICE_DELETE_REQUEST:
        case INVOICE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case INVOICE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case INVOICE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case INVOICE_DELETE_FAIL:
        case INVOICE_UPDATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case INVOICE_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            };
        case INVOICE_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
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

// GET LOGGED IN USER PRODUCT REDUCER
export const getLoggedInUser = (state = { Invoices: [] }, action) => {
    switch (action.type) {
        case GET_LOGGED_IN_INVOICE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_LOGGED_IN_INVOICE_SUCCESS:
            return {
                loading: false,
                Invoices: action.payload.Invoices
            };
        case GET_LOGGED_IN_INVOICE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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