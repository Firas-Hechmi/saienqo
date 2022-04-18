
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
} from "reactstrap";
import MyComponent from 'react-fullpage-custom-loader';
import {FaBell} from 'react-icons/fa';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import { useState } from "react";


import { RiLoginBoxFill } from "react-icons/ri";
import httpCommon from "http-common";
import { useHistory } from "react-router-dom";


  const Login = () => {
  
    const history=useHistory();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [loader,setLoader]=useState(false);
    const [isPasswordHidden, setPasswordHideness] = useState(true);
    const [error,setError]=useState({
      exist:false,
      msg:""
    })

    const connexion=(e)=>{
       e.preventDefault();
       if(username==="" || password===""){
        setError({
          exist:true,
          msg:"Veuillez remplir tous les champs !!"
        })
       }else{
       setLoader(true);
       setTimeout(()=>{
          
        httpCommon.post("/auth/signin",{
          "username":username,
          "password":password
        }).then(res=>{
          localStorage.setItem("id",res.data.id);
          localStorage.setItem("username",res.data.username);
          localStorage.setItem("roles",res.data.roles);
          localStorage.setItem("accessToken",res.data.accessToken);
          localStorage.setItem("tokenType",res.data.tokenType);
          setLoader(false);
          history.push("/admin/index");
        }
        ).catch(err=>{setError({
          exist:true,
          msg:"Identifiants sont incorrects !!"
        })
        setLoader(false);
         }
        )
        

       },1000)
       
      }
    };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-white shadow border-0">
          <CardHeader className="bg-transparent">
  
            <div className="btn-wrapper text-center">
            
            <img  className="" alt="..."
                                  src={
                             require("assets/img/logo.PNG")
                                     .default
                                     }
                             
                               />
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 ">
          <div className="text-center text-muted">
            {error.exist ?
                   <Alert color="danger">
                     <span className="alert-inner--icon">
                          <FaBell/>
                    </span>{" "}
                     <span className="alert-inner--text">
                         <strong>{error.msg}</strong>
                     </span>
                </Alert> 
            : null}
           
         </div>
            <Form role="form" onSubmit={connexion}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83"  />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={username}
                    placeholder="Identifiant"
                    type="text"
                    onChange={e=>setUsername(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open"   />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={password}
                    placeholder="Mot de passe"
                    type={isPasswordHidden ? 'password' : 'text'}
                    onChange={e=>setPassword(e.target.value)}
                  />
                      <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        {isPasswordHidden ?
                                                            <AiFillEye  onClick={() => setPasswordHideness(false)}
                                                                       className="ni ni-lock-circle-open"  /> : null}
                                                        {!isPasswordHidden ? <AiFillEyeInvisible 
                                                            onClick={() => setPasswordHideness(true)}
                                                            className="ni ni-lock-circle-open"  /> : null}
                                                    </InputGroupText>
                       </InputGroupAddon>

                 </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button color="primary" className="text-secondary" type="submit">
                <RiLoginBoxFill style={{fontSize:"19px"}} /> 
                  Se connecter
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
      {loader ? 
       <MyComponent sentences={[]}/>
      : null}
     
    </>
  );
};

export default Login;
