import React, {useState} from 'react';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const AddCar = (props) => {
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
        setOpen(true);
    }

    //Close modal window
    const handleClickClose = () => {
        setOpen(false);
    }
    //save car and close modal form
    const handleSave = () => {
        props.addCar(car);
        handleClickClose();
    }

    const handleChange = (event) => {
        setCar({...car, [event.target.name] : event.target.value});
    }
    return (
        <div>
            {/*<Button variant="contained" onClick={handleClickOpen}>New Car</Button>*/}
            <IconButton onClick={handleClickOpen}>
                <AddIcon color="primary"/>Add
            </IconButton>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Add A Car</DialogTitle>
                <DialogContent>
                    <Stack mt={1} spacing={2}>
                        <TextField label="Brand" variant="standard" name="brand" autoFocus value={car.brand} onChange={handleChange}/><br/>
                        <TextField label="Model" variant="standard"  name="model" value={car.model} onChange={handleChange}/><br/>
                        <TextField label="Color" variant="standard"  name="color" value={car.color1} onChange={handleChange}/><br/>
                        <TextField label="Registered Number" variant="standard"  name="registeredNumber" value={car.registeredNumber} onChange={handleChange}/><br/>
                        <TextField label="Year"  variant="standard" name="year" value={car.year} onChange={handleChange}/><br/>
                        <TextField label="Price" variant="standard"  name="price" value={car.price} onChange={handleChange}/><br/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                     <Button variant="outlined" onClick={handleClickClose}>Cancel</Button>
                     <Button variant="contained" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCar;
