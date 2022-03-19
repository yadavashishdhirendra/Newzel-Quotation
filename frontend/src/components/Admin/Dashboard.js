import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import MetaData from '../MetaData';
import './dashboard.css';
import SideBar from './SideBar';
import { Line } from 'react-chartjs-2'
import { useAlert } from 'react-alert';
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
import { clearErrors, getInvoice } from '../../actions/Invoiceaction';
import { getAllUsers } from '../../actions/Useraction';

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


const Dashboard = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, user } = useSelector((state) => state.auth)
    const { error: InvoiceError, Invoices } = useSelector((state) => state.getInvoice)
    const { users, loading } = useSelector((state) => state.getAllUsers)


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
            dispatch(clearErrors())
            alert.error(error)
        }
        if (InvoiceError) {
            dispatch(clearErrors())
            alert.error(InvoiceError)
        }
        dispatch(getAllUsers())
        dispatch(getInvoice())
    }, [dispatch, error, InvoiceError, alert])


    return (
        <Fragment>
            <MetaData title='Admin - Dashboard' />
            {
                loading ? <Loader /> :
                    <div className='dashboard-row'>
                        <div className='dashboard-col'>
                            <SideBar />
                        </div>
                        <div className='dashboard-aside-col'>
                            <div className='dashboard-algn-col'>
                                <div className="container">
                                    <p>Hey, 😊 Admin {user && user.name}!</p>
                                    <div className='circle-grid'>
                                        <div>
                                            <p><b>Total Quotation</b></p>
                                            <p>{Invoices && Invoices.length}</p>
                                        </div>
                                        <div>
                                            <p><b>Total Rupees</b></p>
                                            <p>₹{totalAmount}</p>
                                        </div>
                                        <div>
                                            <p><b>Total Dollar</b></p>
                                            <p>${dollartotalAmt}</p>
                                        </div>
                                        <div>
                                            <p><b>Total Users</b></p>
                                            <p>{users && users.length}</p>
                                        </div>
                                    </div>
                                    <div className='line-chart'>
                                        <div><Line data={lineState} /></div>
                                        <div><Line data={lineStates} /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default Dashboard