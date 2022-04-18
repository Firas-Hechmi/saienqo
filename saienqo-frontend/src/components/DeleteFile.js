import React, {useState} from "react";
import {AiFillDelete} from "react-icons/ai";
import {TiWarning} from "react-icons/ti";


import {Button, Modal} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import httpCommon from "http-common";
import { setSuccess } from "redux/actions";
import { setError } from "redux/actions";

const DeleteFile=({getFiles,id,name})=>{

    const [modalOpen, setModalOpen] = React.useState(false);
    const dispatch=useDispatch();
    
    
    const deleteFileFromProject=()=>{
        dispatch(setSuccess([]));
        dispatch(setError([]));
        httpCommon.delete("/project/file/"+id).then(
            res=>{
                dispatch(setSuccess([res.data.message]));
                getFiles();
                setModalOpen(!modalOpen);
            }
        ).catch(err=>dispatch(setError(["La suppression du fichier a échouée !!"])))

    }


    return (
        <>
        
        <button className="btn bg-danger btn-sm ml-2" onClick={() => setModalOpen(!modalOpen)} >  
           <AiFillDelete style={{fontSize:"1rem"}} fill="white" />
          </button>
            <Modal
                 className="modal-dialog-centered modal-danger"
                 contentClassName="bg-
                 "
                toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}
            >
                <div className="modal-header">
                    <button
                        aria-label="Close"
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}>
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body" >
                    <div className="py-3 text-center">
                        <TiWarning className="ni ni-bell-55 ni-4x" fill="white" />
                        <h4 className="heading mt-4">Confirmez-vous la suppression du fichier {name} de ce projet
                          
                         </h4>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button
                        className="ml-auto btn-white"
                        color="default"
                        data-dismiss="modal"
                        type="button"
                        onClick={() => setModalOpen(!modalOpen)}>
                        Annuler
                    </Button>
                    <Button className="btn-white"
                            color="default"
                            type="button"
                            onClick={()=>deleteFileFromProject()}
                         >
                        Confirmer
                    </Button>
                </div>

            </Modal>



        </>
    );
}

export default DeleteFile;