import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: new Date(), duration:"", activity:"", customer:""});
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("https://customerrest.herokuapp.com/api/customers")
        .then(response => response.json())
        .then(responseData => setCustomers(responseData.content))
        .catch(err => console.error(err))
    }, [])
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSave = () => {
        props.newTraining(training);
        setTraining({date: new Date(), duration:"", activity:"", customer:""});
        handleClose();
      };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
      };

    const changeDate = (value) => {
      setTraining({...training, date: value});
    };

    return (
      <div className="App">
        <Button variant="contained" color="success" onClick={handleClickOpen} sx={{margin: "15px", backgroundColor: '#3c9690'}}>
          Add training
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        //submit the form on ENTER
        onKeyUp={(e) => {
          if (e.key === "Enter") {
           handleSave();
         }
       }}
        >
          <DialogTitle>New Training</DialogTitle>
          <DialogContent>
            <FormControl variant="standard" fullWidth>
                <InputLabel id="select-label">Customer</InputLabel>
                <Select
                    labelId="select-label"
                    name="customer"
                    value={training.customer}
                    label="Customer"
                    onChange={inputChanged}
                >
                    {customers.map((customer, i) =>
                    <MenuItem value={customer.links[0].href} key={i}>
                        {customer.firstname} {customer.lastname}</MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                required
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                margin="dense"
                label="Activity"
                fullWidth
                variant="standard"
            />
            <TextField
              required
              name="duration"
              value={training.duration}
              onChange={inputChanged}
              margin="dense"
              label="Duration (min)"
              fullWidth
              variant="standard"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DateTimePicker
                    name="date"
                    label="Date"
                    ampm={false}
                    inputFormat="DD.MM.YYYY HH:mm"
                    mask="__.__.____ __:__"
                    value={training.date}
                    onChange={changeDate}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
export default AddTraining