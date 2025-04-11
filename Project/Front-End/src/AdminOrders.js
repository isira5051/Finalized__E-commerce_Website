
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";

function Admin() {

    const [userdata , setUserdata] = useState([]);
    const [gameData , setGameData] = useState([]);
    const [removeUserId , setRemoveUserID] = useState('');
    const [showForm, setShowForm] = useState(false);

    //Admin Add User
    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[id , setId] = useState('');
    const[type , setType] = useState('');
    const[password , setPassword] = useState('');

    const json_body =  {
        name : name ,
        email : email,
        id : id , 
        type : type , 
        password : password
    }

    const removeUser = async (id)=>
    {
        try {
            

            const response = await fetch(`http://localhost:5254/api/users/delete-user/${id}` , 
                {
                    method:"DELETE"
                }
            );
            
            if(!response.ok)
            {
                alert(`User with  ID ${id}              Not Found!`);
                throw new Error(`Error In resposse ${response.status}`);
                
            }

            alert("Success");
            


        } catch (error) {
            console.log(error);
        }
    }

    
    const addUser = async() =>
    {
        
        try {
            
            if(name != "" && email!="" && id != "" && type != "" && password != "")
            {
                const response = await fetch("http://localhost:5254/api/users/add-user" , 
                    {
                     method: "POST",
                     headers: {
                     "Content-Type": "application/json",
                     },
                     body: JSON.stringify(json_body),
                     }
                     );
                     if(!response.ok)
                        {
                            console.log(response.status);
                        }
                    else{
                        alert("success");
                    }
            }

            else
            {
                alert("fill all")
            }

        } catch (error) {
            console.log(error);
        }
        

       

    }

  


    useEffect(
        ()=>
        {
            const  temp2 =  async ()=>
                {
                    try {
                        const response = await fetch("http://localhost:5254/api/games/view-game");
        
                        if(!response.ok)
                        {
                            throw new Error(`Error in Response ${response.status}`);
                        }
        
                        const data = await response.json();
                        setGameData(data);
        
                    } catch (error) {
        
                        console.log(error);
                        
                    }
        
                }
        
                temp2();
        } , []
    );

    useEffect (
        () =>
        {
            const fetchUsers = async ()=>
            {
               try {

                const response = await fetch("http://localhost:5254/api/users/get-user");
  
                if(!response.ok)
                {
                   throw new Error("error ${response.status}");
                }
   
                const data = await response.json();
                setUserdata(data)
                
               } catch (error) {
                
                    console.log(error);
               }
  
  
            }
            fetchUsers();
        } , []
      );

    return(
        <div style={{backgroundColor:'ivory'}}>
            <h2>Admin Panel</h2><br/><br/>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add User"}
            </button>
            <br /><br/>

            
            

            {showForm && (
                <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                <h3>Add User</h3>
                <input type="text" name="name" placeholder="Name"  onChange={(e)=>{setName(e.target.value)}} required/><br /><br />
                <input type="email" name="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} required/><br /><br />
                <input type="text" name="ID" placeholder="ID"  onChange={(e)=>{setId(e.target.value)}} required/><br /><br />
                <input type="text" name="type" placeholder="Type"  onChange={(e)=>{setType(e.target.value)}}/><br /><br />
                <input type="password" name="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required /><br /><br />
                
                <button className="btn btn-success" onClick={addUser} >Submit</button>
            </div>
            )}
            <h3>Completed Orders</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
            <thead>
                <tr style={{ borderBottom: "1px solid black" }}>
                    <th style={{ border: "1px solid black", padding: "8px" }}>No</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Email</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Id</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Type</th>
                </tr>
            </thead>
            <tbody>
                {userdata.map((user, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid black" }}>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{user.name}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{user.email}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{user.id}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{user.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <label>Remove Row</label>
        <input
            onChange={(e)=> setRemoveUserID(e.target.value)}
        ></input>
        <button className="btn btn-primary" onClick={()=>{
            removeUser(removeUserId)
        }}>Remove</button>
        
        </div>
    );
    
}


export default Admin;