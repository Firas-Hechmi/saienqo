import httpCommon from "http-common";
import React from "react";
import { AiOutlineProject } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// reactstrap components
import { NavLink,  ListGroup, ListGroupItem } from "reactstrap";
import {

  Navbar,

  Container,
  NavbarBrand,
  
} from "reactstrap";

const Sidebar = (props) => {
  const [projects,setProjects]=React.useState([]);
  const dispatch=useDispatch();
  const getProjects=()=>{
    httpCommon.get("/projects").then(
      res=>setProjects(res.data)
    )
  }
  React.useEffect(
    ()=>getProjects()
    ,[]);
  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >

      <Container fluid>
      <NavbarBrand className="pt-0 mb-5">
        <NavLink>
        <img  className="navbar-brand-img" alt="..."
                                  src={
                             require("assets/img/logo.PNG")
                                     .default
                                     }
                             
                               />
        </NavLink>
       
        </NavbarBrand>
         <ListGroup>
         
         <ListGroupItem  className="text-center bg-default"><span className="font-weight-bold">Projets</span><AiOutlineProject className="text-lg ml-1" /> </ListGroupItem>
         {projects.map(
             project=>(
              <ListGroupItem  className="bg-default">
            <Link className="navLink" to={"/admin/projects/"+project.id}  >
              <span 
          
              className="text-sm text-white font-weight-bold">{project.name}</span></Link> 
           
              </ListGroupItem>
             )
           )} 
        
         </ListGroup>
      </Container>
     
    </Navbar>
  );
};




export default Sidebar;
