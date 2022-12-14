import React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function AddTraining({addTraining}) {
  //dialogi toimii ikkunana ja aukeaa modaalisesti
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: '',
    duration: '',
    activity: '',
  });

  const handleClose = () => {
    console.log("handleclose kutsuttu");
    addTraining(training);
    setOpen(false);
  };

const handleClickOpen = () => {
    //Painetaan lisää customer
    setOpen(true);
}
  const handleCancel = () => {
    console.log("painettiin cancel");
    setOpen(false);
  };

  const inputChanged = (event) => {
    console.log("yritetään tallentaa arvoa");
    setTraining({...training, [event.target.name] : event.target.value})
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogContent>
        <DialogTitle>New Training</DialogTitle>
          <TextField
            autoFocus
            name="date"
            value={training.date}
            margin="dense"
            label="date"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="duration"
            value={training.duration}
            margin="dense"
            label="duration"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
          <TextField
            autoFocus
            name="activity"
            value={training.activity}
            margin="dense"
            label="activity"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}