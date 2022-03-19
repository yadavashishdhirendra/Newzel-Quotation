import React, { Fragment, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getSingleInvoice } from '../../actions/Invoiceaction';
import Loader from '../Loader/Loader';
import MetaData from '../MetaData';
import RightIcon from '@material-ui/icons/ChevronRight'
import { Link } from 'react-router-dom';
import '../InvoiceDetails.css'
import ReactToPrint from 'react-to-print';
import { Button } from '@material-ui/core';
import NewzelHeader from '../Logo/Newzel-Header.jpg'
var converter = require('number-to-words');

const QuotationDetails = ({ match }) => {
    const dispatch = useDispatch();
    const { error, loading, getInvoice } = useSelector((state) => state.InvoiceDetails);
    const { user } = useSelector((state) => state.singleUserDetails)

    const componentRef = useRef();

    let grandTotal = 0;
    getInvoice.products && getInvoice.products.forEach((items) => {
        return (
            grandTotal += items.itemqty * items.itemprice
        )
    })

    let sign;
    getInvoice.products && getInvoice.products.map((items) => {
        return (
            sign = items.pricesign
        )
    })

    const userId = user._id

    const dateFormat = getInvoice.createdAt;

    const result = converter.toWords(grandTotal)

    console.log(grandTotal);
    useEffect(() => {
        if (error) {
            dispatch(clearErrors())
        }
        dispatch(getSingleInvoice(match.params.id))
    }, [dispatch, match.params.id, error])

    return (
        <div className="container invoice-detailer">
            <Fragment>
                <div className='breadcrumb'>
                    <p><Link to={`/admin/getsingleuser/${userId}`}>User Details</Link> <span><RightIcon /></span> <span>Quotation Details</span></p>
                </div>
                {
                    loading ? <Loader /> :
                        <Fragment>
                            <MetaData title={`${getInvoice.companyname}'s Quotation Details`} />
                            <ReactToPrint trigger={() => <Button className='mt-5 print-button'>Print</Button>} content={() => componentRef.current} />
                            <div className='invoice-products' ref={componentRef}>
                                <img src={NewzelHeader} className="Newzel-Header" alt="" />
                                <div className='scroll-mob'>
                                    <table width='100%'>
                                        <tbody>
                                            <tr className='equal-width'>
                                                <td valign='top'>
                                                    <div>
                                                        <p className='mb-0'><b>To,</b></p>
                                                        <p>{getInvoice.companyname}<br />{getInvoice.to}</p>
                                                    </div>
                                                    <div>
                                                        <p><span><b>Kind Att:</b></span> <span>{getInvoice.kindatt}</span></p>
                                                    </div>
                                                    <div>
                                                        <p className='mb-0'> <span><b>Contact:</b></span> <span>{getInvoice.contact}</span></p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        <p><span><b>OFFER NO:</b></span> <span>{getInvoice.offerno}</span></p>
                                                    </div>
                                                    <div>
                                                        <p><span><b>OFFER DT:</b></span> <span>'TODO'</span></p>
                                                    </div>
                                                    <div>
                                                        <p><span><b>CUSTOMER REF NO:</b></span> <span>{getInvoice.customerrefno}</span></p>
                                                    </div>
                                                    <div>
                                                        <p><span><b>DATE:</b></span> <span>{String(getInvoice.createdAt).substr(0, 10)}</span></p>
                                                    </div>
                                                    <div>
                                                        <p><span><b>VALIDITY:</b></span> <span>{String(getInvoice.validity).substr(0, 10)}</span></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width='100%'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className='mb-0'>We Acknowledge with thanks the receipt of your inquiry by mail Dtd. {String(getInvoice.createdAt).substr(0, 10)}. We are submitting here with our Techno-Commercial offer as below:</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="100%">
                                        <thead>
                                            <tr>
                                                <th><span>Item</span></th>
                                                <th><span>Description</span></th>
                                                <th><span>Size</span></th>
                                                <th><span>UOM</span></th>
                                                <th><span>Qty</span></th>
                                                <th><span>Price</span></th>
                                                <th><span>Total</span></th>
                                            </tr>
                                        </thead>
                                        {getInvoice.products && getInvoice.products.map((items) => {
                                            return (
                                                <tbody key={items._id}>
                                                    <tr>
                                                        <td>{items.itemname}</td>
                                                        <td>{items.itemdesc}</td>
                                                        <td>{items.itemsize}</td>
                                                        <td>{items.itemuom}</td>
                                                        <td>{items.itemqty}</td>
                                                        <td>{items.pricesign === '₹' ? '₹' : '＄'}{items.itemprice}</td>
                                                        <td>{items.pricesign === '₹' ? '₹' : '＄'}{items.itemqty * items.itemprice}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                                <table width='100%' className='table-words'>
                                    <tbody>
                                        <tr>
                                            <td><span className='word-head'>AMOUNT IN WORDS :</span> &nbsp;<span className='text-uppercase'>{result} {sign === '₹' ? 'Rupees' : 'Dollar'} only</span></td>
                                            <td><span><span className='grand-words'>SubTotal =</span>{sign === '₹' ? '₹' : '＄'} {grandTotal}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width='100%'>
                                    <tbody>
                                        <tr className='terms-conditions'>
                                            <td>
                                                <div className='head-inner-text'>
                                                    <p><span><b>Terms & Conditions</b></span></p>
                                                </div>
                                                <div>
                                                    <p><b>Price Basis</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Delivery Period</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Inspection & Testing</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Payment Terms</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Currency</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Make</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Freight</b></p>
                                                </div>
                                                <div>
                                                    <p><b>MTC</b></p>
                                                </div>
                                                <div>
                                                    <p><b>P & F </b></p>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p></p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;Ex Works</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;25-27 Working Days</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;In your Scope</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;30% Advance and Balance against PI</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;USD</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;Indian</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;NA</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;We will provide with our material as per EN 10204 3.1</p>
                                                </div>
                                                <div>
                                                    <p>:&nbsp;1.5% extra for seaworthy packing</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table width='100%' className='bottom-part'>
                                    <tbody>
                                        <tr className='bottom-struct'>
                                            <td>
                                                <div>
                                                    <p><b>We hope that above offer fall in the line of you consideration. If you require any further Clarification Please write to us.</b></p>
                                                </div>
                                                <div>
                                                    <p><b>Regards,</b></p>
                                                    <p><b>Newzel Industries</b></p>
                                                    <p><b>India</b></p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Fragment>
                }
            </Fragment>
        </div>
    )
}

export default QuotationDetails