
import './App.css';
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Typography from "@mui/material/Typography";
import Carlist from "./components/Carlist";
import Link from "./Link";

function App() {
  return (
     <Container>
       <AppBar position="static">
         <Toolbar>
           <Typography variant="h6">
             Car Deals
           </Typography>
         </Toolbar>
       </AppBar>
         {/*<Carlist/>*/}
         <Link/>
     </Container>
  );
}

export default App;
