import EditTraining from './EditTraining';
import AddTraining from './AddTraining';
import { addTraining, editItem } from '../services/ApiServices';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Popconfirm } from 'antd';
import "antd/dist/antd.css";


function Traininglist(props) {
    const [trainings, setTrainings] = useState([]);
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
        {field: "activity", sortable: true, filter: true},
        {
            headerName:"Date",
            
            sortable: true, filter: true,
            valueGetter: params =>
                dayjs(params.data.date).format("DD.MM.YYYY (ddd) H:mm")
        },
        {field: "duration", sortable: true, filter: true, headerName:"Duration (min)", width: 150},
        {
            sortable: true, filter: true,
            headerName:"Customer",
            valueGetter: params => (params.data.customer == null) ? "" : params.data.customer.firstname + " " + params.data.customer.lastname
        },
        {
            headerName: "",
            field: "id",
            width: 65,
            cellRendererFramework: params => <EditTraining updateTraining={updateTraining} params={params} />
        },
        {
            headerName: "",
            field: "id",
            width: 65,
            cellRendererFramework: params => 
            <Popconfirm
                title="Are you sure to delete this training?"
                onConfirm={() => deleteTraining(params.value)}
                okText="Yes"
                cancelText="No"
                >
                <IconButton color="error">
                    <DeleteIcon />
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

    const fetchTrainings = () => {
            fetch("https://customerrest.herokuapp.com/gettrainings")
            .then(response => response.json())
            .then(responseData => setTrainings(responseData))
            .catch(err => console.error(err))        
    }

    useEffect(() => {
        fetchTrainings();
    }, [])
    
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setErrorOpen(false);
      };

    const deleteTraining = (id) => {
        fetch("https://customerrest.herokuapp.com/api/trainings/" + id, { method: "DELETE"})
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg("Poisto onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni pieleen poistamisessa :(");
                setErrorOpen(true);
            }
        })
        .catch(err => console.error(err))
    }

    const newTraining = (training) => {
        addTraining(training)
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg("Lis??ys onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni vikaan lis??yksess?? :/");
                setErrorOpen(true);
            }
        })
        .catch(err => console.error(err))
    }

    const updateTraining = (id, updatedTraining) => {
        editItem("https://customerrest.herokuapp.com/api/trainings/" + id, updatedTraining)
        .then(response => {
            if (response.ok) {
                setMsg("Muokkaus onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni vikaan muokkauksessa :c");
                setErrorOpen(true);
            }
            fetchTrainings();
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="App">
            <AddTraining newTraining={newTraining}/>
            <div className="ag-theme-material" style={{height: 593, width: "85%", maxWidth : "900px", margin: "auto"}}>
                <AgGridReact
                    rowData={trainings}
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
export default Traininglist;