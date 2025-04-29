import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import "./css/LoginCard.css"
function Login()
{

    const [_email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const navigate = useNavigate();
    const {setUser} = useUser();

    const json_body = {
      email : _email, 
      password : password
    }

    const authenticate = async(e) =>
    {
        e.preventDefault();
        try {

            const response = await fetch("http://localhost:5254/api/users/auth" , 
              {
                method: "POST",
                credentials: "include",
                headers :{
                  "content-type" :"application/json"
                } , 
                body: JSON.stringify(json_body)
              }
            );

            console.log(response);

            if(!response.ok)
            {
                alert("invalid");
                throw new Error(response.status);
            }

            const data = await response.json();  
            // pass email to the User.js component
            setUser({ email: _email, type: data.type  , user_id : data.id});
            console.log("User set in context:", { email: _email, type: data.type , id : data.id}); // 
           

            setTimeout(() => {
              if (data.type === "admin") {
                  navigate("/dashboard/admin");
              } else {
                  navigate("/dashboard/user");
              }
          }, 100);
          
        } catch (error) {
          
          console.log(error);

        }
    }



    return(
      <div className="home-background-image" style={{height:'800px'}}>
            <Navbar></Navbar>
        <div  className="login-card-layout" style={{height:'500px'}}>
          <div className="login-card" style={{ width: '25rem' , }}>
            <div className="card-body">
              <div className="login-lable">
              <h2><center>Login</center></h2>
              </div>
              <form onSubmit={authenticate} >
                <div style={{marginLeft:'6px'}} className="login-card-element">
                <div className="mb-3">
                  <label style={{marginLeft:'13px'}} htmlFor="email" className="form-label">Email:</label>
                  <input
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email"
                    id="email"
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label style={{marginLeft:'13px', marginTop:'-2px'}} htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password" 
                    id="password"
                    className="form-control"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    
                    
                  />
                </div>
                <button  style={{marginTop:'5px'}} type="submit" className="btn btn-primary w-100" >Log In</button>
                </div>
              </form>
              <button><a href="/dashboard/admin">Admin</a></button>
              <button><a href="/dashboard/user">User</a></button>
            </div>
            
          </div>
        </div>
        
           </div> 
    );

}
 
export default Login;