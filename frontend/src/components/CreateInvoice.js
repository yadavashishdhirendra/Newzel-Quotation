import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './MetaData';
import './CreateInvoice.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, newInvoice } from '../actions/Invoiceaction';
import { CREATE_INVOICE_RESET } from '../constants/InvoiceConstants';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from './Loader/Loader';
import { Button } from '@material-ui/core'
import PlusIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { useAlert } from 'react-alert';

const CreateInvoice = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state) => state.Invoice)
    const [items, setItems] = useState([])

    // const [itemname, itemdesc, itemsize, itemuom, itemqty, itemprice] = productss;
    const userTemplate = { itemname: "", itemdesc: "", itemsize: "", itemuom: "", itemqty: "", itemprice: "", pricesign: "" }
    const [contact, setContact] = useState("");
    const [to, setTo] = useState("");
    const [companyname, setCompanyName] = useState("");
    const [revisionnumber, setRevisionNumber] = useState("");
    const [customerrefno, setCustomerRefNo] = useState("");
    const [projectname, setProjectName] = useState("");
    const [kindatt, setKindAtt] = useState("");
    const [dates, setDates] = useState(null);
    const [validity, setValidity] = useState(null);
    const [products, setProducts] = useState([userTemplate]);
    const onchange = (e, index) => {
        const addproduct = products.map((product, i) => index == i ? Object.assign(product, { [e.target.name]: e.target.value }) : product)
        setProducts(addproduct)
        const addproducts = products.map((product, i) => index == i ? Object.assign(product, { [e.target.name]: e.target.value }) : product)
        setItems(addproducts)
    }

    const addField = (e) => {
        e.preventDefault();
        setProducts([...products, userTemplate])
    }

    const minusField = (index, e) => {
        const filterProducts = [...products];
        filterProducts.splice(index, 1);
        setProducts(filterProducts)
        e.preventDefault();
    }

    const handleInvoice = (e) => {
        e.preventDefault();
        dispatch(newInvoice(companyname, revisionnumber, customerrefno, projectname, kindatt, to, contact, validity, products, items))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (success) {
            alert.success('Invoice Created Successfully!');
            history.push('/invoice-list')
            dispatch({
                type: CREATE_INVOICE_RESET
            })
        }
    }, [dispatch, error, success, alert])

    return (
        <div className="container create-invoice-wrapper">
            {
                loading ? <Loader /> :
                    <Fragment>
                        <h1 className='text-center head-text'>Crea<span>te Quo</span>tation</h1>
                        <MetaData title='Newzel - Create Quotation' />
                        <form onSubmit={handleInvoice}>
                            <div className='Header-inputs'>
                                <div>
                                    <label htmlFor="">To -</label>
                                    <input className='mb-4' name='to' value={to} onChange={(e) => setTo(e.target.value)} type="text" placeholder='To *' /> <br />
                                    <label htmlFor="">Company Name -</label>
                                    <input className='mb-4' name='companyname' value={companyname} onChange={(e) => setCompanyName(e.target.value)} type="text" placeholder='Company Name *' /> <br />
                                    <label htmlFor="">Kind Att -</label>
                                    <input className='mb-4' name='kindatt' value={kindatt} onChange={(e) => setKindAtt(e.target.value)} type="text" placeholder='Kind Att' />
                                    <label htmlFor="">Contact No -</label>
                                    <input className='mb-4' name='contact' value={contact} onChange={(e) => setContact(e.target.value)} type="number" placeholder='Contact No *' /> <br />
                                </div>
                                <div>
                                    <label htmlFor="">Revision Number -</label>
                                    <input value={revisionnumber} name="revisionnumber" onChange={(e) => setRevisionNumber(e.target.value)} className='mb-4' type="number" placeholder='Revision Number' />
                                    <label htmlFor="">Customer Ref No -</label>
                                    <input value={customerrefno} name="customerrefno" onChange={(e) => setCustomerRefNo(e.target.value)} className='mb-4' type="number" placeholder='Customer Ref Number' />
                                    {/* <input type="date" name="dates" value={dates} onChange={(e) => setDates(e.target.value)} /> */}
                                    <label htmlFor="">Validity -</label>
                                    <input type="date" name="validity" placeholder='Validity' className='mb-4' value={validity} onChange={(e) => setValidity(e.target.value)} />
                                    <label htmlFor="">Project Name -</label>
                                    <input value={projectname} name="projectname" onChange={(e) => setProjectName(e.target.value)} className='mb-4' type="text" placeholder='Project Name' />
                                </div>
                            </div>
                            <div className="container products-container">
                                <label htmlFor="">Add Products -</label>
                            </div>
                            <div className='project-Input-Head'>
                                {
                                    products.map((product, index) => {
                                        return (
                                            <div className='project-Inputs' key={index}>
                                                <div>
                                                    <select className='mb-4' name='itemname' value={product.itemname} onChange={(e) => onchange(e, index)}>
                                                        <option value="">Choose Products</option>
                                                        <option value="Product 1">Product 1</option>
                                                        <option value="Product 2">Product 2</option>
                                                        <option value="Product 3">Product 3</option>
                                                        <option value="Product 4">Product 4</option>
                                                        <option value="Product 5">Product 5</option>
                                                        <option value="Product 6">Product 6</option>
                                                        <option value="Product 7">Product 7</option>
                                                        <option value="Product 8">Product 8</option>
                                                        <option value="Product 9">Product 9</option>
                                                        <option value="Product 10">Product 10</option>
                                                    </select>
                                                    {/* <input className='mb-3' value={product.itemname} name="itemname" onChange={(e) => onchange(e, index)} type="text" placeholder='Item Name' /> */}
                                                </div>
                                                <div>
                                                    <input className='mb-4' value={product.itemdesc} name="itemdesc" onChange={(e) => onchange(e, index)} type="text" placeholder='Item Description' />
                                                </div>
                                                <div>
                                                    <input className='mb-4' value={product.itemsize} name="itemsize" onChange={(e) => onchange(e, index)} type="text" placeholder='Size mm' />
                                                </div>
                                                <div>
                                                    <input className='mb-4' value={product.itemuom} name="itemuom" onChange={(e) => onchange(e, index)} type="text" placeholder='UOM' />
                                                </div>
                                                <div>
                                                    <input className='mb-4' value={product.itemqty} name="itemqty" onChange={(e) => onchange(e, index)} type="number" placeholder='Quantity' />
                                                </div>
                                                <div>
                                                    <input className='mb-4' value={product.itemprice} name="itemprice" onChange={(e) => onchange(e, index)} type="number" placeholder='Price' />
                                                </div>
                                                <div>
                                                    <select className='mb-4' name='pricesign' value={product.pricesign} onChange={(e) => onchange(e, index)}>
                                                        <option value="">Choose Currency</option>
                                                        <option value='₹'>₹</option>
                                                        <option value='＄'>＄</option>
                                                    </select>
                                                </div>
                                                <Button className='minus-field' variant="contained" onClick={() => minusField(index)}><DeleteIcon /></Button>
                                            </div>
                                        )
                                    })
                                }
                                <div className='text-center'>
                                    <Button className='add-more mt-3' variant="contained" onClick={addField}><PlusIcon /></Button>
                                </div>
                                <Button type='submit' variant="contained" className='submit-button mt-5'>Create Quotation &nbsp; <SendIcon /></Button>
                            </div>
                        </form>
                    </Fragment>
            }
        </div>
    )
}

export default CreateInvoice
