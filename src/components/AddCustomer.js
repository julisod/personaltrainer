import React, {useState} from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({firstname:"", lastname:"", streetaddress:"", postcode:"", city:"", email:"", phone:""})

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setCustomer({firstname:"", lastname:"", streetaddress:"", postcode:"", city:"", email:"", phone:"" });
    };
  
    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
      };

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
      };

    return (
      <div className="App">
          {/* tän tyyliä vois muuttaa */}
        <Button variant="outlined" onClick={handleClickOpen} sx={{margin: "15px"}}>
          Add customer
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
          <DialogTitle>New Customer</DialogTitle>
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
              required
              name="streetaddress"
              value={customer.streetaddress}
              onChange={inputChanged}
              margin="dense"
              label="Street address"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              name="postcode"
              value={customer.postcode}
              onChange={inputChanged}
              margin="dense"
              label="Postcode"
              fullWidth
              variant="standard"
            />
            <TextField
              required
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
            <Button onClick={handleSave}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default AddCustomer;