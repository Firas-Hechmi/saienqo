import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

// reactstrap components
import { Alert, Button, Card, CardFooter, CardHeader, Modal, ModalBody, Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";
import httpCommon from "http-common";

import { useDispatch, useSelector } from "react-redux";
import { setFiles} from "redux/actions";
import {  useParams } from "react-router-dom";
import fileDownload from "js-file-download";
import AddFile from "./AddFile";
import UpdateFile from "./UpdateFile";
import { setError } from "redux/actions";
import { setSuccess } from "redux/actions";
import DeleteFile from "./DeleteFile";


function ListDocuments({type,name}) {

const dispatch=useDispatch();
const [modalOpen, setModalOpen] = React.useState(false);
  
const {project_id}=useParams();
const listFiles=useSelector(state=>state.listFiles)

const error=useSelector(state=>state.error);
const success=useSelector(state=>state.success);

const getFiles=()=>{
    if(type==="projectDocs"){
        httpCommon.get("/files/projectDocs",{
            params:{
                project_id: project_id,
                project_docs_name:name
            }
        }).then(res=>{
            dispatch(setFiles(res.data))
        console.log(res.data)}
            )
    }
    
}

 const close=()=>{
    dispatch(setError([]));
    dispatch(setSuccess([]));
    setModalOpen(!modalOpen);
 }
 
  

  const handleDownload = (url, filename) => {
    httpCommon.get(url, {
      responseType: 'blob',
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
  }

  const getParsedDate=(date)=>{
      if(date!==null){
        return "Le "+date.slice(0,10)+" à "+date.slice(11,16)+"h";
      }
        return "Indisponible";
    
   }
   const projectName=useSelector(state=>state.projectName);
   const isAuthorizedForAddingFile=()=>{
         return localStorage.getItem("roles").includes("DIRECTION")||
                localStorage.getItem("roles").includes("BUREAU")  
   }
   const isAuthorizedForUpdatingFile=(action)=>{
       return localStorage.getItem("roles").includes("DIRECTION")
     }
     const isAuthorizedForDeletingFile=(action)=>{
        return localStorage.getItem("roles").includes("DIRECTION")            
         }
     const isAuthorizedForReadingFile=()=>{
         return localStorage.getItem("roles").includes("DIRECTION")||
                localStorage.getItem("roles").includes("BUREAU") ||
             (localStorage.getItem("roles").includes("CLIENT_DIRECT") && localStorage.getItem("roles").includes(projectName))||
             (localStorage.getItem("roles").includes("CLIENT_INDIRECT") && localStorage.getItem("roles").includes(projectName))||
             (localStorage.getItem("roles").includes("ENTREPRISES") && localStorage.getItem("roles").includes(projectName))
                  
     }    
  

  useEffect(()=>{
     if(modalOpen===true){getFiles()}
    },[modalOpen]);


  return (
    <>
    {type==="accountDocs" ?

      <Button
        color="primary"        
        size="sm"
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        <FaSearch/>
     </Button>
    
    : null}
    {type==="projectDocs" ?
        <Button className="ml-4" color="primary" type="button"  onClick={() => setModalOpen(!modalOpen)}> 
            {name}
        </Button>
        : null
     }
      <Modal  style={{maxWidth:"80%"}}
      toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className="modal-header pb-0">
              <h3 className="text-center">{name} - {projectName} </h3>
              <Button
                      color="warning"        
                      size="sm"
                      type="button"
                      onClick={close}
                    >
                     X
                    </Button>
                    
      
         
        </div>
        <ModalBody >
        <div className="col m-0 p-0">
                        <Card className="shadow">
                           
                        <CardHeader className="border-0">
                             {isAuthorizedForAddingFile() ?
                                    
                                    <AddFile getFiles={getFiles} project_id={project_id} name={name} />
                                    : null
                                }
                            </CardHeader>
                          {success.length!==0 ?
                                <Alert color="success" className="p-1 text-center">
                                <strong>{success[0]}</strong>
                              </Alert>   
                           : null}
                           
      
                            {error.length!==0 ? 
                                <Alert color="danger" className="p-1 text-center" >
                                <strong>{error[0]}</strong>
                              </Alert>
                            : null}
                           
                           
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Document</th>
                                    <th scope="col">Publié par</th>
                                    <th scope="col">Date dépôt </th>
                                    <th scope="col">Date dernière modification</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                     {listFiles.map(e=>(
                                         <tr>
                                             <td>{e.name}</td>
                                             <td>{e.username}</td>
                                             <td>{getParsedDate(e.createDate)}</td>
                                             <td>{getParsedDate(e.updateDate)}</td>
                                             <td>
                                              {isAuthorizedForReadingFile() ?
                                              <button onClick={()=>handleDownload(e.url,e.name)} 
                                              className="btn bg-default btn-sm"
                                              
                                              > <FaSearch style={{fontSize:"0.9rem"}} fill="white"/></button> 
                                              : null }
                                               {isAuthorizedForDeletingFile() ?
                                               <DeleteFile getFiles={getFiles} id={e.id} name={e.name}/>
                                               : null}
                                               {isAuthorizedForUpdatingFile() ? 
                                               <UpdateFile getFiles={getFiles} id={e.id} />
                                                : null
                                                }
                                            

                                   
                                            </td>

                                         </tr>
                                     ))}
                                  
                                       
                             
                                </tbody>
                            </Table>
                          
                                      <CardFooter className="py-4">
                                      <nav aria-label="...">
                                      {listFiles.length!==0 ? 
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

export default ListDocuments;