import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip as ReactTooltip } from 'react-hover-tooltip'
import MetaData from './MetaData'
import './profile.css'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import { clearErrors, getLoggedInvoice } from '../actions/Invoiceaction';
import EditIcon from '@material-ui/icons/Edit';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Profile = () => {
    const dispatch = useDispatch();
    const { error, loading, user } = useSelector((state) => state.auth)
    const { error: invoiceError, Invoices } = useSelector((state) => state.loggedInvoice);


    // Invoices.forEach(invoice => {
    //     var totalAmount = 0;
    //     invoice.products.forEach(prod => {
    //         totalAmount += prod.itemqty * prod.itemprice;
    //     });
    //     invoice['totalAmount'] = totalAmount;
    // });
    // console.log(Invoices);


    var totalAmount = 0;
    var dollartotalAmt = 0;
    Invoices.forEach(invoice => {
        invoice.products.forEach(prod => {
            if (prod.pricesign === '₹') {
                totalAmount += prod.itemqty * prod.itemprice;
            }
            else if (prod.pricesign === '＄') {
                dollartotalAmt += prod.itemqty * prod.itemprice;
            }
        });

    });

    const lineState = {
        labels: ["Initial Amount", "Total Amount of Quotation Created In Rupees"],
        datasets: [
            {
                label: "TOTAL AMOUNT OF Quotation CREATED IN RUPEES",
                backgroundColor: ["#423F8D"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalAmount],
            },
        ],
    };

    const lineStates = {
        labels: ["Initial Amount", "Total Amount of Quotation Created In Dollar"],
        datasets: [
            {
                label: "TOTAL AMOUNT OF Quotation CREATED IN DOLLAR",
                backgroundColor: ["#D7D7D7"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, dollartotalAmt],
            },
        ],
    };



    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (invoiceError) {
            alert.error(invoiceError)
            dispatch(clearErrors())
        }
        dispatch(getLoggedInvoice())
    }, [dispatch, error, invoiceError])

    return (
        <Fragment>
            <div className="container profile-wrapper">
                {
                    loading ? <Loader /> :
                        <Fragment>
                            <MetaData title={`${user.name}'s - Profile `} />
                            <div className='grid-sm-profile'>
                                <div>
                                    <div>
                                        <img src={user.avatar && user.avatar.url} alt="" />
                                    </div>
                                    <ReactTooltip content="Update Avatar"><Link to='/updateavatar'><Button className='edit-profile'><EditIcon /></Button></Link> <br /></ReactTooltip>
                                    <Link className='link' to='/password-update'><Button className='change-password'>Change Password</Button></Link>
                                </div>
                                <div>
                                    <div>
                                        <p className='label'>Name :</p>
                                        <p className='label-data'>{user.name}</p>
                                    </div>
                                    <div>
                                        <p className='label'>Email :</p>
                                        <p className='label-data'>{user.email}</p>
                                    </div>
                                    <div>
                                        <p className='label'>Joined On :</p>
                                        <p className='label-data'>{String(user.created_At).substr(0, 10)}</p>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                }
            </div>
            <div className='amount-panel-bg'>
                <div className='amount-panel'>
                    <div>
                        <p>Total Quotation Created</p>
                        <p className='relative-live'><span className='ripples'></span><span> ₹{Invoices.length && Invoices.length}</span></p>
                    </div>
                    <div>
                        <p>Rupees Earned</p>
                        <p className='relative-live'><span className='ripples'></span><span> ₹{totalAmount}</span></p>
                    </div>
                    <div>
                        <p>Dollar Earned</p>
                        <p className='relative-live'><span className='ripples'></span><span> ${dollartotalAmt}</span></p>
                    </div>
                </div>
            </div>
            <div className='line-chart'>
                <div><Line data={lineState} /></div>
                <div><Line data={lineStates} /></div>
            </div>
        </Fragment>
    )
}

export default Profile