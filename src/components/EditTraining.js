import React, {useState} from 'react';
import dayjs from 'dayjs'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import AdapterDateFns from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

function EditTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: new Date(), duration:"", activity:""/* , customer:"" */});
    const [customerName, setCustomerName] = useState("");

    const handleClickOpen = () => {
        setCustomerName(props.params.data.customer.firstname + " " + props.params.data.customer.lastname)
        setTraining({
            date: dayjs(props.params.data.date).format("DD.MM.YYYY (ddd) H:mm"),
            duration: props.params.data.duration,
            activity: props.params.data.activity,
            //customer: props.params.data.customer.links[0].href,

        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    };

    const changeDate = (value) => {
        setTraining({...training, date: value});
    };

    const handleSave = () => {
        props.updateTraining(props.params.value, training);
        setTraining({date: new Date(), duration:"", activity:""/* , customer:"" */});
        handleClose();
        };


    return (
      <div className="App">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
            {/* Tämän olisi voinut koodata silleen että pystyy samalla vaihtaa asiakkaankin, 
            mutta mielestäni ei tunnu järkevältä, että tietyn asiakkaan treenin voi vaan siirtää toiselle */}
          <DialogTitle>Edit training for {customerName}</DialogTitle>
          <DialogContent>
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
            <Button onClick={handleSave}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
export default EditTraining