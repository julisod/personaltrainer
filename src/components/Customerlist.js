import EditCustomer from './EditCustomer';
import AddCustomer from './AddCustomer';
import React, {useEffect, useState} from 'react';
import { addCustomer, editItem } from '../services/ApiServices'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Popconfirm } from 'antd';
import "antd/dist/antd.css";

function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    //this is for the error snackbar
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    //data for aggrid
    const columns = [
        {field: "firstname", sortable: true, filter: true, headerName:"First name"},
        {field: "lastname", sortable: true, filter: true, headerName:"Last name"},
        {field: "streetaddress", filter: true, headerName:"Street address"},
        {field: "postcode", sortable: true, filter: true, width: 120},
        {field: "city", sortable: true, filter: true, width: 120},
        {field: "email", sortable: true, filter: true},
        {field: "phone", filter: true, width: 140},
        {
            headerName: "",
            field: "links.0.href",
            width: 65,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: "",
            field: "links.0.href",
            width: 65,
            cellRendererFramework: params => 
            <Popconfirm
                title="Are you sure to delete this customer?"
                onConfirm={() => deleteCustomer(params.value)}
                okText="Yes"
                cancelText="No"
                >
                <IconButton
                    color="error"
                    /* onClick={() => deleteCustomer(params.value)} */><DeleteIcon />
                </IconButton>
            </Popconfirm>
        }
    ]

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    const onBtnExport = () => {
        gridApi.exportDataAsCsv();
    };

    const fetchCustomers = () => {
            fetch("https://customerrest.herokuapp.com/api/customers")
            .then(response => response.json())
            .then(responseData => setCustomers(responseData.content))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        fetchCustomers();
    }, [])
    
    const handleErrorClose = (event, reason) => {
        if (reason !== 'clickaway') {
            setErrorOpen(false);
        }
      };

    const deleteCustomer = (url) => {
        fetch(url, { method: "DELETE"})
        .then(response => {
            if (response.ok) {
                setMsg("Poisto onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni pieleen poistamisessa :(");
                setErrorOpen(true);
            }
            fetchCustomers();
        })
        .catch(err => console.error(err))
    }

    const newCustomer = (customer) => {
        addCustomer(customer)
        .then(response => {
            if (response.ok) {
                fetchCustomers();
                setMsg("Lis??ys onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni vikaan lis??yksess?? :/");
                setErrorOpen(true);
            }
        })
        .catch(err => console.error(err))
    }

    const updateCustomer = (url, updatedCustomer) => {
        editItem(url, updatedCustomer)
        .then(response => {
            if (response.ok) {
                setMsg("Muokkaus onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni vikaan muokkauksessa :c");
                setErrorOpen(true);
            }
            fetchCustomers();
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="App">
            <AddCustomer newCustomer={newCustomer}/>
            <div className="ag-theme-material" style={{height: 593, width: "90%", maxWidth : "1400px", margin: "auto"}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                    onGridReady={onGridReady}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message={msg}
            />
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    {errorMsg}
                </Alert>
            </Snackbar>
            <Button variant="outlined" color="success" sx={{color: '#3c9690'}} onClick={() => onBtnExport()}>Export</Button>
        </div>
    );
}
export default Customerlist;