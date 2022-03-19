import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import SideBar from './SideBar';
import { Button } from '@material-ui/core';
import { Tooltip } from 'react-hover-tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataGrid } from '@material-ui/data-grid';
import MetaData from '../MetaData';
import Loader from '../Loader/Loader';
import { clearErrors, getInvoice } from '../../actions/Invoiceaction';
import './UserList.css'

const QuotationList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { Invoices, error, loading } = useSelector((state) => state.getInvoice)

    const columns = [
        { field: "id", headerName: "Quotation Id", minWidth: 120, flex: 0.3 },
        { field: "createdAt", headerName: "Issue Date", minWidth: 110, flex: 0.2 },
        { field: "name", headerName: "Company Name", minWidth: 120, flex: 0.3 },
        { field: "project", headerName: "Project Name", minWidth: 100, flex: 0.3 },
        {
            field: "actions", headerName: "Actions", type: 'number', minWidth: 80, flex: 0.2, sortable: false, renderCell: (params) => {
                return (
                    <Fragment>
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

    const rows = [];

    Invoices && Invoices.forEach((item) => {
        return (
            rows.push({
                id: item._id,
                createdAt: String(item.createdAt).substr(0, 10),
                name: item.companyname,
                project: item.projectname,
            })
        )
    })

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
        dispatch(getInvoice())
    }, [dispatch, alert])

    return (
        <Fragment>
            <MetaData title="Admin - Quotation List" />
            {
                loading ? <Loader /> :
                    <div className='dashboard-row'>
                        <div className='dashboard-col'>
                            <SideBar />
                        </div>
                        <div className='dashboard-aside-col'>
                            <div className='dashboard-algn-col'>
                                <div className="container text-container-wrapper">
                                    <h3 className='text-center'>Quota<span>tion</span> List</h3>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        pageSize={10}
                                        autoHeight
                                        className="mt-5"
                                        sortingOrder='null'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default QuotationList