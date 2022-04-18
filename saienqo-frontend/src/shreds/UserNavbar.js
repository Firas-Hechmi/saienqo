
import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";

const UserNavbar = (props) => {
  const history=useHistory();
  const projectName=useSelector(state=>state.projectName);
  const deconnexion=()=>{
    localStorage.removeItem("id");
          localStorage.removeItem("username");
          localStorage.removeItem("roles");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("tokenType");
          history.push("/auth/login");
  }
  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
           
          </Link>
         <h2 className="text-white">{projectName}</h2>
        
          <Nav className="align-items-center d-none d-md-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle bg-success">
                   <FaUserAlt/>
                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">
                    {localStorage.getItem("username")}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
         
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Bienvenue </h6>
                </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem  >
                        <i className="ni ni-user-run" />
                        <span onClick={deconnexion}>Deconnexion</span>
                      </DropdownItem>
                 
              </DropdownMenu>
             
            </UncontrolledDropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default UserNavbar;
