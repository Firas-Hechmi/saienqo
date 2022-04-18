let initialState={
    listFiles:[],
    error :[],
    success:[],
    projectName :""
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
       
        case "LIST_FILES":{
            return{
                ...state,
                listFiles:[...action.playload]
            }
        }

        case "ERROR" :{
            return{
                ...state,
                error:[...action.playload]
            }
        }

        case "SUCCESS" :{
            return {
                ...state,
                success:[...action.playload]
            }
        } 
        case "PROJECT_NAME":{
            return{
                ...state,
                projectName:action.playload
            }
        }
      
        default :
            return state;
    }
}

export default reducer;