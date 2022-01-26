import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react';

export interface AlertDialogProps {
  title: string,
  contentText: string,
  open: boolean,
  handleClose: () => void,
}

const AlertDialog = (props: AlertDialogProps) => {

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
