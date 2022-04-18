import React, { useEffect, useState } from "react";
import { Label } from "reactstrap";

import httpCommon from "http-common";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSuccess } from "redux/actions";
import { setError } from "redux/actions";

const UpdateFile=({getFiles,id})=>{
   const dispatch=useDispatch();
   const [file,setFile]=useState(undefined);
   const [selectedFile,setSelectedFile]=useState(false);

    const onChange = (e) => {
    
      dispatch(setSuccess([]));
      dispatch(setError([]));
        setSelectedFile(true);
        setFile(e.target.files[0]);
         
      };

     
  const update=()=>{
    
    let formData = new FormData();
    formData.append("file", file);
    httpCommon.put("/update/"+id, formData,{
        headers: {
          "Content-type": "multipart/form-data"
        }
        }
        ).then(res=>{
            setSelectedFile(false);
            dispatch(setSuccess([res.data.message]));
            getFiles();
         }).catch(error=>{
           dispatch(setError(["La modification du fichier a échoué !"]));
           setSelectedFile(false);
        });     
  }

      useEffect(()=>{
        setTimeout(()=>{
        if(file!==undefined){
            update()
        }
       },3000);
     },[file]);
 

    return(
        <>
        {!selectedFile ?
                                           <Label className="btn bg-orange btn-sm mb-0"
                                     >
                                   <form>
                                    <input type="file"
                                    style={{display:"none"}}
                                    
                                    onChange={onChange}
                                
                                    />
                                    </form>
                                    <FiEdit fill="white"  className="ml-0" style={{fontSize:"1rem"}}/> 
                                   </Label>
                                   :  
                                   <span className="text-primary">En cours...</span>
                                  
                                   }
        </>
    )
}

export default UpdateFile;