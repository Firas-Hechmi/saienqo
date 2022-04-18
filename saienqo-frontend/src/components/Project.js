import Header from "shreds/Header";

import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";

import { CardFooter, Button,  Row, Card, CardHeader, CardImg, CardBody, CardText, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import {
  Container,

} from "reactstrap";
import Loader from "react-js-loader";
import httpCommon from "http-common";
import ListDocuments from "./ListDocuments";
import HistoricProject from "./HistoricProject";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProjectName } from "redux/actions";

const Project = (props) => {
  const style = { width: "40rem" };
  const stylePost={border :"1px solid",borderRadius:"30px",paddingLeft:"15px"}
  const [focus5, setFocus5] = React.useState(false);
  const [projectDocs,setProjectDocs]=useState([]);
  const {project_id}=useParams();
  const [content,setContent]=useState("");
  const [loadActualities,setLoadActualities]=useState(true);
  const dispatch=useDispatch();
  const [posts,setPosts]=useState([]);
  
  const getParsedDate=(date)=>{
    if(date!==null){
      return date.slice(0,10)+" à "+date.slice(11,16)+"h";
    }
      return "Heure indisponible";
  
 }

  const getProjectName=()=>{
    httpCommon.get("/projects/name/"+project_id).then(res=>dispatch(setProjectName(res.data)));
  }
  
  const getPosts=()=>{
    httpCommon.get("/posts/"+project_id).then(res=>setPosts(res.data))
  }
  const likePost=(id)=>{
     let liked=false
     let arr=[...posts]
     let i=0
     while(!liked && i<posts.length){
       if(posts[i].id===id){
         liked=true
         arr[i].likes++
         setPosts(arr)
         httpCommon.put("/like/post/"+id)
       }else{
         i++
       }
     }
  }
  const post=()=>{
   httpCommon.post("/posts",{
     projectid:project_id,
     userid:localStorage.getItem("id"),
     content:content
   }).then(res=>{
     setPosts(res.data);
      setContent("");
     })
  }
  useEffect(()=>{
     httpCommon.get("/projectDocs").then(res=>setProjectDocs(res.data));
   },[])
   
   useEffect(()=>{
     setLoadActualities(true);
     getPosts();
     setTimeout(()=>{
       setLoadActualities(false);
      },2000);
     getProjectName();
   },[project_id])
  return (
    <>
     <Header/>
     <Container className="mt-2">
      <div className="mt-4">
      
      <Row className="mt-2 mb-4 justify-content-md-center"
      > 
      <HistoricProject/>
       {projectDocs.map(projectDoc =>(
                <ListDocuments key={projectDoc.id} type="projectDocs" name={projectDoc.name} />
       ))}
      </Row>
      {loadActualities ?
      <div   className="mt-5">
                                      <Loader type="hourglass"  bgColor={"#fab387"} size={150}/>
                                     
                                        <h2 className="text-center text-primary">Fil d'actualités...</h2>
                                      </div>
                                      :
                                      <>
      <Row className="mt-2 justify-content-md-center">
                <Card style={style}>
        
                <CardHeader className="border-0 pb-0">
                <Row className="align-items-center">
               
                  <Col>
                  <FormGroup className={focus5 ? "focused" : ""}>
        <InputGroup>
          <Input
            aria-label="With textarea"
            type="textarea"
            value={content}
            onChange={e=>setContent(e.target.value)}
            placeholder="Commencer un post"
            onFocus={() => setFocus5(true)}
             onBlur={() => setFocus5(false)}
             style={stylePost}
          ></Input>
           <Button
           className="ml-2"
            size="sm"
            type="button"
            onClick={post}
           >Partager</Button>
        </InputGroup>
      </FormGroup>


      </Col>
                
                </Row>
              </CardHeader>
        <CardFooter className="pt-2 pb-2">
      <Row>
        <Col className="p-1">
        <Button className="btn-icon btn-3" style={{width:"100%"}} type="button">
        <span className="btn-inner--icon">
          <i className="ni ni-image text-default"></i>
        </span>
        <span className="btn-inner--text "  style={{fontSize:"1rem"}}>Photo</span>
      </Button>
        </Col>
        <Col className="p-1">
        <Button className="btn-icon btn-3" style={{width:"100%"}} type="button">
        <span className="btn-inner-icon">
          <i className="ni ni-button-play "></i>
        </span>
        <span className="btn-inner--text" style={{fontSize:"1rem"}}>Vidéo</span>
      </Button>
        </Col>
        
      </Row>
    
        </CardFooter>
      </Card>
                </Row>
              {posts.map(post=>(
                        
                        <Row className="mt-2 justify-content-md-center">
                        <Card style={style}>
                
                        <CardHeader className="border-0 pb-0">
                        <Row className="align-items-center">
                          <div className="col">
                          <span className="avatar avatar-sm rounded-circle bg-primary">
                   <FaUserAlt/>
                  </span>
                          
                         <span className="ml-2 text-lg text-primary" >{post.username}</span>
                          </div>
                          <div className="col text-right">
                            <span className="ml-2 text-sm ">{getParsedDate(post.date)}</span>
                          </div>
                        </Row>
                      </CardHeader>
                <CardBody className="mt-0">
                  <CardText>
                  {post.content}
                  </CardText>
                 
                
                </CardBody>
                <CardFooter className="pt-2 pb-2">
              <Row>
                <Col className="p-1">
                <Button
                 onClick={()=>likePost(post.id)}
                className="btn-icon btn-3" style={{width:"100%"}} type="button">
                <span className="btn-inner--icon">
                  <i className="ni ni-like-2 text-primary"></i>
                </span>
                <span className="btn-inner--text">{post.likes} J'aime</span>
              </Button>
                </Col>
                <Col className="p-1">
                <Button className="btn-icon btn-3" style={{width:"100%"}} type="button">
                <span className="btn-inner--icon">
                  <i className="ni ni-chat-round text-primary"></i>
                </span>
                <span className="btn-inner--text">Commenter</span>
              </Button>
                </Col>
                <Col className="p-1">
                <Button className="btn-icon btn-3" style={{width:"100%"}} type="button">
                <span className="btn-inner--icon">
                  <i className="ni ni-curved-next text-primary"></i>
                </span>
                <span className="btn-inner--text">Partager</span>
              </Button>
                </Col>
              </Row>
            
                </CardFooter>
              </Card>
                        </Row>
              ))}
               
   </>
}



        </div>
         
  
     </Container>
      
    </>
  );
};

export default Project;