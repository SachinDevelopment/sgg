import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    p: {
      "& .MuiTypography-colorTextSecondary": {
        color: "#fff",
      },
    },
  }));

export default function GameDodgeDialog({ open, setOpen, handleGameDodge, loser }) {
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        handleGameDodge(loser);
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="bg-gray-800 rounded text-white">Are you sure you want to dodge this game?</DialogTitle>
                <DialogContent className="h-24 m-4">
                    <DialogContentText id="alert-dialog-description">
                       <div className="text-black font-semibold text-lg">You will lose 5 LP per player on your team (including you). </div> 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleAgree} className="bg-darkRed w-40 p-2 rounded text-center cursor-pointer disabled:cursor-not-allowed hover:bg-red-900 text-white" autoFocus>
                        Let me out
                    </button>
                    <button onClick={handleClose} className="bg-darkBlue w-40 p-2 rounded text-center cursor-pointer disabled:cursor-not-allowed hover:bg-blue-900 text-white" color="primary">
                        Stay and suffer
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}