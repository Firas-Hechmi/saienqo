import { useEffect, useState } from "react";
import { Label } from "reactstrap";
import Loader from "react-js-loader";
import httpCommon from "http-common";
import { useDispatch } from "react-redux";
import { setSuccess } from "redux/actions";
import { setError } from "redux/actions";

const AddFile=({getFiles,project_id,name})=>{

    const dispatch=useDispatch();
    const [file,setFile]=useState(undefined);
    const [selectedFile,setSelectedFile]=useState(false);

    const onChange = (e) => {
      dispatch(setSuccess([]));
      dispatch(setError([]));
      setSelectedFile(true);
      setFile(e.target.files[0]);
         
      };

      const upload=()=>{
        let formData = new FormData();
        formData.append("file", file);
        formData.append("project_id",project_id);
        formData.append("project_docs_name",name);
        formData.append("user_id",localStorage.getItem('id'));
        httpCommon.post("/upload", formData,{
        headers: {
          "Content-type": "multipart/form-data"
        }
        }
        ).then(res=>{
            setSelectedFile(false);
            dispatch(setSuccess([res.data.message]));
            getFiles();
         }).catch(error=>{
           dispatch(setError(["L'ajout du fichier a échoué !"]));
           setSelectedFile(false);
        });       
      }

      useEffect(()=>{
        setTimeout(()=>{
        if(file!==undefined){
            upload()
        }
       },3000);
     },[file]);
 
    
    return(
        <>
         {!selectedFile?
                                       <Label className="btn bg-primary text-white" 
                                       style={{float: "right"}}>
                                   <form>
                                    <input type="file"
                                    style={{display:"none"}}
                                    onChange={onChange}
                                
                                    />
                                    </form>
                                     Ajouter un document
                                   </Label>
 
                                    :
                                      
                                      <div   style={{float: "right"}}>
                                      <Loader type="hourglass"  bgColor={"#fab387"} size={82}/>
                                      </div>
                                    }
        </>
    )
}

export default AddFile;