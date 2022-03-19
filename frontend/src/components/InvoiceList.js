import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteInvoice, getLoggedInvoice } from '../actions/Invoiceaction';
import './InvoiceList.css';
import Loader from './Loader/Loader';
import MetaData from './MetaData';
import { Link } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import { Button } from '@material-ui/core'
import { INVOICE_DELETE_RESET } from '../constants/InvoiceConstants';
import { useAlert } from 'react-alert';
import RefreshIcon from '@material-ui/icons/Refresh'
import { Tooltip } from 'react-hover-tooltip';

const InvoiceList = () => {
  const Months = [
    "ALL",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const alert = useAlert()
  const dispatch = useDispatch();
  const { error, loading, Invoices } = useSelector((state) => state.loggedInvoice);
  const { error: isError, isDeleted } = useSelector((state) => state.deleteInvoice)

  const [month, setMonth] = useState("")

  const deleteInvoiceHandler = (id) => {
    dispatch(deleteInvoice(id))
  }

  const filterCategory = (value) => {
    setMonth(value)
    dispatch(getLoggedInvoice(value, month))
  }

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isError) {
      alert.error(isError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      alert.success("Invoice Deleted Success");
      dispatch({
        type: INVOICE_DELETE_RESET
      })
    }
    dispatch(getLoggedInvoice())
  }, [dispatch, isError, isDeleted, alert, error])

  const columns = [
    { field: "id", headerName: "Quotation Id", minWidth: 200, flex: 0.5 },
    { field: "createdAt", headerName: "Issue Date", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Company Name", minWidth: 150, flex: 0.5 },
    { field: "project", headerName: "Project Name", minWidth: 150, flex: 0.5 },
    { field: "revision", headerName: "Revision Number", minWidth: 150, flex: 0.5 },
    { field: "customer", headerName: "Customer Ref Number", minWidth: 150, flex: 0.5 },
    {
      field: "actions", headerName: "Actions", type: 'number', minWidth: 250, flex: 0.7, sortable: false, renderCell: (params) => {
        return (
          <Fragment>
            <Tooltip bottom content="View">
              <Link to={`/invoice-details/${params.getValue(params.id, "id")}`}>
                <Button>
                  <ViewIcon />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip bottom content="Update">
              <Link to={`/invoice-update/${params.getValue(params.id, "id")}`}>
                <Button className='btn-green'>
                  <EditIcon />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip bottom content="Delete">
              <Button onClick={() => deleteInvoiceHandler(params.getValue(params.id, "id"))} className='btn-red'>
                <DeleteIcon />
              </Button>
            </Tooltip>
            <Tooltip bottom content="ReCreate">
              <Link to={`/invoice-recreate/${params.getValue(params.id, "id")}`}>
                <Button className='btn-green'>
                  <RefreshIcon />
                </Button>
              </Link>
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
        revision: item.revisionnumber,
        customer: item.customerrefno
      })
    )
  })
  return (
    <Fragment>
      {
        loading ? <Loader /> :
          <Fragment>
            <MetaData title='Newzel - Quotation List' />
            <div className='count-Invoice'>
              <div>
                {Invoices && Invoices.length}
              </div>
            </div>
            <div className='text-center month-dropdown'>
              <select value={month} name="month" onChange={(e) => filterCategory(e.target.value)}>
                {
                  Months.map((months) => {
                    return (
                      <>
                        <option key={months} value={months}>{months}</option>
                      </>
                    )
                  })
                }
              </select>
            </div>
            <h2>Quot<span>ation</span> List</h2>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              autoHeight
              sortingOrder='null'
            />
          </Fragment>
      }
    </Fragment >
  )
}

export default InvoiceList