import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

export default function SimpleSnackbar({ status, attributeName, detailKey, setOpen }) {
  //   const [open, setOpen] = React.useState(false);
  //   if (status) {
  //       console.log(status);
  //       setOpen(status);
  //   };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={status}
        autoHideDuration={6000}
        onClose={handleClose}
        message={`${detailKey} saved to ${attributeName}`}
        // message={`${detailKey} added to ${attributeName}`}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}