import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../actions/Invoiceaction';
import { getSingleUser } from '../../actions/Useraction';
import MetaData from '../MetaData';
import SideBar from './SideBar'
import './SingleUser.css'
import Loader from '../Loader/Loader';
import { Tooltip } from 'react-hover-tooltip';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import { DataGrid } from '@material-ui/data-grid';
import RightIcon from '@material-ui/icons/ChevronRight';

const SingleUser = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user, error, loading } = useSelector((state) => state.singleUserDetails)

    const columns = [
        { field: "id", headerName: "Quotation Id", minWidth: 200, flex: 0.5 },
        { field: "createdAt", headerName: "Issue Date", minWidth: 200, flex: 0.5 },
        { field: "companyname", headerName: "Company Name", minWidth: 150, flex: 0.5 },
        { field: "projectname", headerName: "Project Name", minWidth: 200, flex: 0.6 },
        {
            field: "actions", headerName: "Actions", type: 'number', minWidth: 200, flex: 0.5, sortable: false, renderCell: (params) => {
                return (
                    <Fragment>
                        <Tooltip bottom content="View">
                            <Link to={`/admin/invoice-details/${params.getValue(params.id, "id")}`}>
                                <Button className='btn-green'>
                                    <ViewIcon />
                                </Button>
                            </Link>
                        </Tooltip>
                        <Tooltip bottom content="Delete">
                            <Button className='btn-red'>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                    </Fragment>
                )
            }
        }
    ];

    var totalAmount = 0;
    var dollartotalAmt = 0;
    user.invoices && user.invoices.forEach(quot => {
        quot.products.forEach(items => {
            if (items.pricesign === '₹') {
                totalAmount += items.itemqty * items.itemprice;
            }
            else if (items.pricesign === '＄') {
                dollartotalAmt += items.itemqty * items.itemprice;
            }
        })
    })

    console.log(totalAmount);
    console.log(dollartotalAmt);

    const rows = [];

    user.invoices && user.invoices.forEach((item) => {
        return (
            rows.push({
                id: item._id,
                createdAt: String(item.createdAt).substr(0, 10),
                companyname: item.companyname,
                projectname: item.projectname
            })
        )
    })

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getSingleUser(match.params.id))
    }, [dispatch, match.params.id])

    return (
        <Fragment>
            <MetaData title={`${user.name}'s Details`} />
            {
                loading ? <Loader /> :
                    <div className='dashboard-row'>
                        <div className='dashboard-col'>
                            <SideBar />
                        </div>
                        <div className='dashboard-aside-col'>
                            <div className='dashboard-algn-col'>
                                <div className="container text-container-wrapper">
                                    <div className='breadcrumb'>
                                        <p className='breadcrumb-absolute'><Link to={`/admin/user-list`}>User List</Link> <span><RightIcon /></span> <span>User Details</span></p>
                                    </div>
                                    <h2>{user.name}'s Details 😊</h2>
                                    <div className="grid-user-data">
                                        <div className="grid-user-data-col">
                                            <div>
                                                <img className='avatar' src={user.avatar && user.avatar.url} alt="" />
                                            </div>
                                            <div className='circle-data-row'>
                                                <div className="circle-data-col">
                                                    <p>Quotation Rupee</p>
                                                    <p>₹{totalAmount}</p>
                                                </div>
                                                <div className="circle-data-col">
                                                    <p><b>Quotation Dollar</b></p>
                                                    <p>＄{dollartotalAmt}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-user-data-col">
                                            <div>
                                                <p><b>Name:</b></p>
                                                <p>{user.name}</p>
                                            </div>
                                            <div>
                                                <p><b>Email:</b></p>
                                                <p>{user.email}</p>
                                            </div>
                                            <div>
                                                <p><b>Joined On:</b></p>
                                                <p>{String(user.created_At).substr(0, 10)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className='text-center mt-4'>Quo<span>tat</span>ion</h3>
                                    <div>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            pageSize={10}
                                            className="mt-4"
                                            autoHeight
                                            sortingOrder='null'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default SingleUser