import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef } from "react";

interface Props{
    handleValueChange?:any
}

const FormDialog = forwardRef((props:Props, ref) => {
  const [open, setOpen] = React.useState(false);
  const [text,setText]=React.useState("")
  const [stepId,setStepId]=React.useState("")

  React.useImperativeHandle(ref, () => ({
    getAlert(id:any) {
      //   alert("getAlert from Child");
      setStepId(id)
      setOpen(true);
    },
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () =>{
    props.handleValueChange(stepId,text)
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} sx={{ color: "white" }}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "white" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: "white" }} onClick={handleSubmit}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default FormDialog;
