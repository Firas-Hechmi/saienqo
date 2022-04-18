import httpCommon from "http-common";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// reactstrap components
import {  Alert, Button,Card, CardFooter,Modal, ModalBody, Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";




const HistoricProject=()=>{
    const [modalOpen, setModalOpen] = React.useState(false);
    const [historicProject,setHistoricProject]=useState([]);
    const [error,setError]=useState(false);
    const {project_id}=useParams();
    const getParsedDate=(date)=>{
        if(date!==null){
          return "Le "+date.slice(0,10)+" à "+date.slice(11,16)+"h";
        }
          return "Indisponible";
      
     }
    const closeModal=()=>{
        setModalOpen(!modalOpen);
        setHistoricProject([]);
    }
    
    const openModal=()=>{
        httpCommon.get("/historic/project/"+project_id).then(res=>{
            setError(false);
            setHistoricProject(res.data);
        }
        ).catch(error=>setError(true));
        setModalOpen(!modalOpen);
    }
    const projectName=useSelector(state=>state.projectName);
    return(
        <>
          <Button className="ml-4 bg-default" type="button"  onClick={openModal}> 
            Historique
        </Button>

      <Modal  style={{maxWidth:"50%"}}
      toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="modal-header pb-0">
              <h3 className="text-center">Historique du {projectName}</h3>
              <Button
                      color="warning"        
                      size="sm"
                      type="button"
                      onClick={closeModal}

                    >
                     X
                    </Button>
                    
      
         
        </div>
        <ModalBody >
        <div className="col m-0 p-0">
                        <Card className="shadow">
                      {error ?
                          <Alert color="danger" className="p-1 text-center" >
                          <strong>"L'historique du projet est Indisponible,essayer plus tard"</strong>
                          </Alert>
                      : null}
                             
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Utilisateur</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Date</th>
                               
                                </tr>
                                </thead>
                                <tbody>
                                    {historicProject.map(e=>(
                                        <tr>
                                            <td>{e.username}</td>
                                            <td>{e.action}</td>
                                            <td>{getParsedDate(e.date)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                          
                                      <CardFooter className="py-4">
                                      <nav aria-label="...">
                                       {historicProject.length!==0 ? 
                                          <Pagination
                                              className="pagination justify-content-end mb-0"
                                              listClassName="justify-content-end mb-0"
                                          >
                                              <PaginationItem className="disabled">
                                                  <PaginationLink
                                                      href="#pablo"
                                                      onClick={(e) => e.preventDefault()}
                                                      tabIndex="-1"
                                                  >
                                                      <i className="fas fa-angle-left"/>
                                                      <span className="sr-only">Previous</span>
                                                  </PaginationLink>
                                              </PaginationItem>
                                              <PaginationItem className="active">
                                                  <PaginationLink
                                                      href="#pablo"
                                                      onClick={(e) => e.preventDefault()}
                                                  >
                                                      1
                                                  </PaginationLink>
                                              </PaginationItem>
                                              <PaginationItem>
                                                  <PaginationLink
                                                      href="#pablo"
                                                      onClick={(e) => e.preventDefault()}
                                                  >
                                                      2 <span className="sr-only">(current)</span>
                                                  </PaginationLink>
                                              </PaginationItem>
                                              <PaginationItem>
                                                  <PaginationLink
                                                      href="#pablo"
                                                      onClick={(e) => e.preventDefault()}
                                                  >
                                                      3
                                                  </PaginationLink>
                                              </PaginationItem>
                                              <PaginationItem>
                                                  <PaginationLink
                                                      href="#pablo"
                                                      onClick={(e) => e.preventDefault()}
                                                  >
                                                      <i className="fas fa-angle-right"/>
                                                      <span className="sr-only">Next</span>
                                                  </PaginationLink>
                                              </PaginationItem>
                                          </Pagination>
                                     : null}
                                      </nav>
      
                                  </CardFooter>
                            
                            
                        </Card>
                    </div>




        </ModalBody>
        
      </Modal>

        </>
    );
}

export default HistoricProject;