import React, {useEffect, useState} from 'react';
import {SERVER_URL} from "../constants";
import {DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses} from '@mui/x-data-grid';
import {IconButton, Snackbar} from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import Stack from "@mui/material/Stack";
import DeleteIcon from '@mui/icons-material/Delete';


const CarList = () => {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);


    //get all cars
    const fetchCars = () => {
        //get the token from the sessionStorage => jwtToken
        const token = sessionStorage.getItem("jwtToken");
        fetch(SERVER_URL + 'api/cars',{
            headers: {'Authorization': token}
        })
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.log(err));
    }

    //delete a car
    const onDelClick = (url) => {
        if(window.confirm("Are you sure you want to delete? ")){
            const token = sessionStorage.getItem("jwtToken")
            fetch(url, {method: 'DELETE',
             headers: {'Authorization': token}
            })
                .then(response => {
                    if(response.ok){
                        fetchCars();
                        setOpen(true);
                    }else{
                        alert('Something went wrong!');
                    }
                })
                .catch(err =>console.log(err));
        }
    }
    //add a car

    const addCar = (car) => {
        const token = sessionStorage.getItem("jwtToken")
        fetch(SERVER_URL + 'api/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify(car)
            }).then(response => {
                if(response.ok){
                    fetchCars();
                }else{
                    alert('Something went wrong');
                }
        }).catch(err => console.log(err));
    }

    //update car
    const updateCar = (car, link) => {
        const token = sessionStorage.getItem("jwtToken")
        fetch(link,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : token
                },
                body: JSON.stringify(car)
            }).then(response => {
                if(response.ok){
                    fetchCars();
                }else{
                    alert('Something went wrong');
                }
        }).catch(err => console.log(err));
    }
    //export to csv
    function CustomToolbar(){
        return(
            <GridToolbarContainer
                className={gridClasses.toolbarContainer}>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }

    useEffect(() => {
       fetchCars();
    },[]);

    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200} ,
        {field: 'color', headerName: 'Color', width: 200} ,
        {field: 'registeredNumber', headerName: 'Registered Number', width: 200} ,
        {field: 'year', headerName: 'Year', width: 200} ,
        {field: 'price', headerName: 'Price($)', width: 200},
        {field: '_links.car.href',
            headerName: 'Update',
            sortable:false,
            filterable:false,
            renderCell: row=>
              <EditCar data={row} updateCar={updateCar}/>
        },
        {field: '_links.self.href',
            headerName: 'Actions',
            sortable:false,
            filterable:false,
            renderCell: row=>
                <IconButton onClick={() => onDelClick(row.id)}>
                    <DeleteIcon color="error"/>
                </IconButton>
        }

    ]

    return (
        <>
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar}/>
            </Stack>
        <div style={{height: 500, width: '100%'}}>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Car Deleted Successfully"
                />
            <DataGrid
                rows={cars}
                columns={columns}
                disableSelectionOnClick={true}
                getRowId={row => row._links.self.href}
                components={{Toolbar: CustomToolbar}}
            />
        </div>
            </>
    );
};

export default CarList;
