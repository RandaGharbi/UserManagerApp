import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import * as ModalContents from './ModalContents'

export default function AlertDialog({ data = {}, open = false, handleClose, compName = 'CreateContent' }) {
  const Comp = ModalContents[compName]
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Comp data={data} open={open} handleClose={handleClose} />
      </Dialog>
    </div>
  );
}

