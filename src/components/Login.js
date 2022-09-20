import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CarList from "./Carlist";
import {SERVER_URL} from "../constants";
import {Snackbar} from "@mui/material";

const Login = () => {
    const [open, setOpen] = useState(false);//for the snackbar
    const [isAuthenticated, setAuth] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

//changes ()
    const handleChange = (event) => {
        setUser({...user, [event.target.name]: event.target.value});
    }

    //logout
   const logout = () => {
        sessionStorage.removeItem("jwtToken");
        setAuth(false);
    }

    //login ()
    const login = () => {
        fetch(SERVER_URL + 'login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
            .then(response => {
                const jwtToken = response.headers.get('Authorization');
                if(jwtToken !== null){
                    sessionStorage.setItem('jwtToken', jwtToken);
                    setAuth(true);
                }else
                    setOpen(true);
            }).catch(err => {console.error(err);});
    }


            if(isAuthenticated)
               return <CarList/>
           else{
               return(
                   <>
                       <Snackbar
                           open={open}
                           autoHideDuration={3000}
                           onClose={() => setOpen(false)}
                           message="Login failed: Check your Credentials properly"
                       />
            <Stack spacing={2} alignItems="center" mt={2}>
                <TextField label="User Name" name="username" onChange={handleChange}/>
                <TextField label="Password" name="password" type="password" onChange={handleChange}/>
                <Button variant="contained" color="primary" onClick={login}>Login</Button>
            </Stack>
               </>
               );
        }

};

export default Login;
