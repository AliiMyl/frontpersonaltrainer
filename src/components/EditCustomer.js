import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function EditCustomer({params}) {
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
    console.log(params.customer);
    console.log("Painettiin update customer");
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

const updateCustomer = () => {
   params.updateCustomer(customer, params.customer.links.href);
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
        <DialogTitle>Edit Customer</DialogTitle>
          <TextField
            autoFocus
            name="firstname"
            value={customer.firstname}
            margin="dense"
            label="Firstname"
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
            label="Lastname"
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
            label="Streetaddress"
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
            label="Postcode"
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
            label="City"
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
            label="Email"
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
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateCustomer}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}