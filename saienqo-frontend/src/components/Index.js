import Header from "shreds/Header";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaMoneyBillWave, FaSearch, FaUserAlt } from "react-icons/fa";
// reactstrap components
import { NavItem, NavLink, Nav, Row, Table, Button, CardHeader, Card, Col, Progress } from "reactstrap";
import {
  Container,

} from "reactstrap";
import ListDocuments from "./ListDocuments";


const Index = (props) => {
  const history = useHistory();
  useEffect(()=>console.log('history.location.pathname'),[])
  
  
  return (
    
    <>
      <Header/>
      <Container className="mt-6" fluid>
    
         
       
        <Row className="mt-5 justify-content-md-center" >
         
          <Col xl="4" className="mr-4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Mon compte</h3>
                  </div>
                  <div className="col text-right">
                  <Button
                      color="default"        
                      size="sm"
                    >
                     <FaUserAlt/>
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Documents</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">gdgd</th>
                    <td>
                    <Button
                      color="primary"
                      size="sm"
                    >
                    <FaSearch/>
                    </Button>
                    </td>
                    
                  </tr>
                  <tr>
                    <th scope="row">fsf</th>
                    <td>
                    <Button
                      color="primary"
                      size="sm"
                    >
                    <FaSearch/>
                    </Button>
                    </td>
                    
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Opportunités</h3>
                  </div>
                  <div className="col text-right">
                  <Button
                      color="default"        
                      size="sm"
                    >
                     <FaMoneyBillWave />
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                  <th scope="col">Documents</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Sujet 1</th>
                    <td>
                    <Button
                      color="primary"
                      size="sm"
                    >
                    <FaSearch/>
                    </Button>
                    </td>
                    
                  </tr>
                  <tr>
                    <th scope="row">Sujet 2</th>
                    <td>
                    <Button
                      color="primary"
                      size="sm"
                    >
                    <FaSearch/>
                    </Button>
                    </td>
                    
                  </tr>
                  <tr>
                    <th scope="row">Sujet 3</th>
                    <td>
                    <Button
                      color="primary"
                      size="sm"
                    >
                    <FaSearch/>
                    </Button>
                    </td>
                    
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </>
  );
};

export default Index;