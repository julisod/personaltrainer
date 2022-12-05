import EditTraining from './EditTraining';
import AddTraining from './AddTraining';
import { addTraining, editItem } from '../services/ApiServices';
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs'

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css'

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { Popconfirm } from 'antd';
import "antd/dist/antd.css";

import { NewTraining, ExistingTraining } from '../../types';



const Traininglist: React.FC = () => {

    const [trainings, setTrainings] = useState<ExistingTraining[]>([]);
    const [gridApi, setGridApi] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [errorOpen, setErrorOpen] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    //this is for the error snackbar
    const Alert: any = React.forwardRef((props, ref: any) =>
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
      );

    //data for aggrid
    const columns = [
        {field: "activity", sortable: true, filter: true},
        {
            headerName:"Date",
            
            sortable: true, filter: true,
            valueGetter: (params: any) =>
                dayjs(params.data.date).format("DD.MM.YYYY (ddd) H:mm")
        },
        {field: "duration", sortable: true, filter: true, headerName:"Duration (min)", width: 150},
        {
            sortable: true, filter: true,
            headerName:"Customer",
            valueGetter: (params: any) => (params.data.customer == null) ? "" : params.data.customer.firstname + " " + params.data.customer.lastname
        },
        {
            headerName: "",
            field: "id",
            width: 65,
            cellRendererFramework: (params: any) => <EditTraining updateTraining={updateTraining} params={params} />
        },
        {
            headerName: "",
            field: "id",
            width: 65,
            cellRendererFramework: (params: any) => 
            <Popconfirm
                title="Are you sure you want to delete this training?"
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

    const onGridReady = (params: any) => {
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
    
    const handleErrorClose = (event: React.SyntheticEvent | Event, reason: SnackbarCloseReason): void => {
        if (reason !== 'clickaway') {
            setErrorOpen(false);
        }
      };

    const deleteTraining = (id: number) => {
        fetch("https://customerrest.herokuapp.com/api/trainings/" + id, { method: "DELETE"})
        .then(response => {
            if (response.ok) {
                setMsg("Poisto onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni pieleen poistamisessa :(");
                setErrorOpen(true);
            }
            fetchTrainings();
        })
        .catch(err => console.error(err))
    }

    const newTraining = (training: NewTraining) => {
        addTraining(training)
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                setMsg("Lisäys onnistui");
                setOpen(true);
            } else {
                setErrorMsg("Jokin meni vikaan lisäyksessä :/");
                setErrorOpen(true);
            }
        })
        .catch(err => console.error(err))
    }

    const updateTraining = (id: number, updatedTraining: ExistingTraining) => {
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