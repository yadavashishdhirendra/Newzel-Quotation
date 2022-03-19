import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createInvoiceReducer, getAllInvoiceReducer, getLoggedInUser, invoiceDeleteReducer, invoiceDetailsReducer } from './reducers/InvoiceReducers';
import { authReducer, forgotPasswordReducer, getAllUserReducers, getSingleUserReducer, passwordUpdateReducer } from './reducers/UserReducers';

const reducer = combineReducers({
    Invoice: createInvoiceReducer,
    getInvoice: getAllInvoiceReducer,
    InvoiceDetails: invoiceDetailsReducer,
    deleteInvoice: invoiceDeleteReducer,
    auth: authReducer,
    passUpdate: passwordUpdateReducer,
    forgotPass: forgotPasswordReducer,
    loggedInvoice: getLoggedInUser,
    getAllUsers: getAllUserReducers,
    singleUserDetails: getSingleUserReducer
})

let initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
)

export default store;