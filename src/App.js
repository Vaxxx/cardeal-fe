
import './App.css';
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Typography from "@mui/material/Typography";
import Login, {logout} from "./components/Login";
import Button from "@mui/material/Button";

function App() {

  return (
     <Container>
       <AppBar position="static">
         <Toolbar>
           <Typography variant="h6">
             Car Deals
           </Typography>

         </Toolbar>
           {/*<Button variant="error" onClick={logout}>Log Out</Button>*/}
       </AppBar>
         <Login/>
     </Container>
  );
}

export default App;
