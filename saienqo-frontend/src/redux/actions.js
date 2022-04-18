const setFiles=(listFiles)=>{
    return {
        type :"LIST_FILES",
        playload:listFiles
    }
}

const setError=(errorMsg)=>{
    return{
        type:"ERROR",
        playload:errorMsg
    }
}

const setSuccess=(successMsg)=>{
    return{
        type:"SUCCESS",
        playload:successMsg
    }
}

const setProjectName=(name)=>{
    return {
        type:"PROJECT_NAME",
        playload:name
    }
}

export {setFiles,setError,setSuccess,setProjectName};