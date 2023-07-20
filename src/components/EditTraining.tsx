import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import AdapterDateFns from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { ExistingTraining } from "../../types";

interface ComponentProps {
  updateTraining: (id: number, updatedTraining: ExistingTraining) => void;
  params: any;
}

function EditTraining(props: ComponentProps) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState(props.params.data);
  const [customerName, setCustomerName] = useState("");

  const handleClickOpen = () => {
    setCustomerName(
      props.params.data.customer.firstname +
        " " +
        props.params.data.customer.lastname,
    );
    setTraining({
      date: props.params.data.date, //we don't have to format the date since mui is doing it for us
      duration: props.params.data.duration,
      activity: props.params.data.activity,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const changeDate = (value: any) => {
    setTraining({ ...training, date: value });
  };

  const handleSave = () => {
    props.updateTraining(props.params.value, training);
    setTraining({
      date: new Date(),
      duration: "",
      activity: "" /* , customer:"" */,
    });
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              name="date"
              label="Date"
              ampm={false}
              inputFormat="DD.MM.YYYY HH:mm"
              mask="__.__.____ __:__"
              value={training.date}
              onChange={changeDate}
              renderInput={(params: any) => <TextField {...params} />}
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
export default EditTraining;
