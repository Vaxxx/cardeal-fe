import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const EditCard = (props) => {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        year: '',
        registeredNumber: '',
        price:''
    });
    //open modal window
    const handleClickOpen = () => {
        setCar({
            brand: props.data.row.brand,
            model: props.data.row.model,
            color: props.data.row.color,
            registeredNumber: props.data.row.registeredNumber,
            year: props.data.row.year,
             price: props.data.row.price
        })
        setOpen(true);
    }

    //Close modal window
    const handleClickClose = () => {
        setOpen(false);
    }
    const handleChange = (event) => {
        setCar({...car, [event.target.name] : event.target.value});
    }

    //save car and close modal form
    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClickClose();
    }
    return (
        <>
            <div>
                {/*<Button variant="outlined" onClick={handleClickOpen}>Edit Car</Button>*/}
                <IconButton onClick={handleClickOpen}>
                    <EditIcon color="primary"/>
                </IconButton>
                <Dialog open={open} onClose={handleClickClose}>
                    <DialogTitle>Edit Car</DialogTitle>
                    <DialogContent>
                       <Stack mt={1} spacing={2}>
                           <TextField variant="standard" autoFocus label="Brand" name="brand" value={car.brand} onChange={handleChange}/><br/>
                           <TextField variant="standard" label="Model" name="model" value={car.model} onChange={handleChange}/><br/>
                           <TextField variant="standard" label="Color" name="color" value={car.color} onChange={handleChange}/><br/>
                           <TextField variant="standard" label="Registered Number" name="registeredNumber" value={car.registeredNumber} onChange={handleChange}/><br/>
                           <TextField variant="standard" label="Year" name="year" value={car.year} onChange={handleChange}/><br/>
                           <TextField variant="standard" label="Price" name="price" value={car.price} onChange={handleChange}/><br/>
                       </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" onClick={handleClickClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default EditCard;
