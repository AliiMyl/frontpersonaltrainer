import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function EditCustomer({updateCustomer, params}) {
  //dialogi toimii ikkunana ja aukeaa modaalisesti
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  });

  const handleClickOpen = () => {
    console.log("Painettiin lisää customer");
    setOpen(true);
    setCustomer({
        firstname: params.data.firstname,
        lastname: params.data.lastname,
        streetaddress: params.data.streetaddress,
        postcode: params.data.postcode,
        city: params.data.city,
        email: params.data.email,
        phone: params.data.phone
    })
  };

  const handleClose = () => {
    console.log("handleclose kutsuttu");
    setOpen(false);
  };

const handleSave = () => {
    updateCustomer(customer, params.value);
    setOpen(false);
}
  const handleCancel = () => {
    console.log("painettiin cancel");
    setOpen(false);
  };

  const inputChanged = (event) => {
    console.log("yritetään tallentaa arvoa");
    setCustomer({...customer, [event.target.name] : event.target.value})
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent>
        <DialogTitle>New Customer</DialogTitle>
          <TextField
            autoFocus
            name="firstname"
            value={customer.firstname}
            margin="dense"
            label="firstname"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="lastname"
            value={customer.lastname}
            margin="dense"
            label="lastname"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="streetaddress"
            value={customer.streetaddress}
            margin="dense"
            label="streetaddress"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="postcode"
            value={customer.postcode}
            margin="dense"
            label="postcode"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="city"
            value={customer.city}
            margin="dense"
            label="city"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="email"
            value={customer.email}
            margin="dense"
            label="email"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
           <TextField
            autoFocus
            name="phone"
            value={customer.phone}
            margin="dense"
            label="phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}