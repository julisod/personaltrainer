import React, {useState} from 'react';
import "../App.css";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({firstname:"", lastname:"", streetaddress:"", postcode:"", city:"", email:"", phone:""})

    const handleClickOpen = () => {
        console.log(props);
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
        };

    const handleSave = () => {
        props.updateCustomer(props.params.value, customer);
        setCustomer({firstname:"", lastname:"", streetaddress:"", postcode:"", city:"", email:"", phone:"" });
        handleClose();
        };


    return (
      <div className="App">
        <IconButton onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              name="firstname"
              value={customer.firstname}
              onChange={inputChanged}
              margin="dense"
              label="First name"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              name="lastname"
              value={customer.lastname}
              onChange={inputChanged}
              margin="dense"
              label="Last name"
              fullWidth
              variant="standard"
            />
            <TextField
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              margin="dense"
              label="Street address"
              fullWidth
              variant="standard"
            />
            <TextField
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              margin="dense"
              label="Postcode"
              fullWidth
              variant="standard"
            />
            <TextField
              name="city"
              value={customer.city}
              onChange={inputChanged}
              margin="dense"
              label="City"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              name="email"
              value={customer.email}
              onChange={inputChanged}
              margin="dense"
              label="Email"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              name="phone"
              value={customer.phone}
              onChange={inputChanged}
              margin="dense"
              label="Phone"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default EditCustomer;