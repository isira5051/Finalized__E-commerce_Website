
import { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "./UserContext";
import AdminOffer from "./AdminOffer";
function Admin() {

    const {user} = useUser();
    const [userdata , setUserdata] = useState([]);
    const [gameData , setGameData] = useState([]);
    const [removeUserId , setRemoveUserID] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showGameForm , setShowGameForm] = useState(false)
    const [showMsgForm , setShowMsgForm] = useState(false);
    const [updateGameForm ,  SetUpdateGameForm] = useState(false);
    const[updateGameData , setUpdateGameData] = useState(null)
   

    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[id , setId] = useState('');
    const[type , setType] = useState('');
    const[password , setPassword] = useState('');
    const[sender , setSender] = useState('');
    const[msgTopic , setMsgTopic] = useState('');
    const[msgBody , setMsgBody] = useState('');
    const[trailer , setTrailer] = useState("");
    const[gameDescription , setGameDescription] = useState("");
    const[removeGameId , setRemoveGameId] = useState("");

    const [gameName , setGameName] = useState('');
    const [gameId , setGameId] = useState('');
    const[gamePrice , setGamePrice] = useState(0.0);
    const [imgUrl , setImageUrl] = useState('');
    const [tags , setTags] = useState([]);

    useEffect(()=>
    {
        setGameName("");
        setGameDescription("");
        setGamePrice(0.0);
        setImageUrl("");
        setTrailer("");
        setTags([]);
        setUpdateGameData(null);
        
    } , [showGameForm , updateGameForm]
    );

    useEffect (
        () =>
        {
            if (updateGameData != null)
            {
                setGameName(updateGameData.name);
                setGamePrice(updateGameData.price);
                updateGameData.img_url != null && setImageUrl(updateGameData.img_url);
                updateGameData.description != null && setGameDescription(updateGameData.description);
                updateGameData.trailer != null && setTrailer(updateGameData.trailer);
                if (Array.isArray(updateGameData.tags) && updateGameData.tags.length > 0) {
                    setTags(updateGameData.tags);
                }
            }
        } , [updateGameData]
    );

    const json_body =  {
        name : name ,
        email : email,
        id : id , 
        type : type , 
        password : password
    }

    const game_json = {
        name : gameName , 
        price : gamePrice ,
        img_url : imgUrl ,
        des : gameDescription,
        trailer : trailer
    }

    const msg_json = {

        msg_topic : msgTopic,
        msg_content : msgBody ,
        sender_email :user.email ,
        rec_email : sender
    }

    const update_game_json = {
        Id : updateGameData ? updateGameData.id : "",
        name : gameName , 
        price : gamePrice ,
        img_url : imgUrl ,
        des : gameDescription,
        trailer : trailer,
        tags : tags,

    }

   

    const updateGame = async ()=>
    {
        try {
            
            const response = await fetch("http://localhost:5254/api/games/update-game" , 
                {
                    method : "POST",
                    headers : {
                        "content-type" : "application/json" 
                    }, 
                    body : JSON.stringify(update_game_json)
                    
                }
            )

            if(response.ok)
            {
                console.log(response);
            }

            else
            {
                console.log(response.status);
            }


        } catch (error) {

            console.log(error);
            
        }


    }

    const findGame = (game_id)=>
    {
        const game = gameData.find(g => g.id == game_id );
        setUpdateGameData(game);
        console.log(game);
    }

    const sendMsg =  async ()=>
    {
        
        if(msgTopic != "" && msgBody != "")
            {
                
                try {

                    const response = await fetch("http://localhost:5254/api/admin/msg/post-msg" , 
                        {
                            method :"POST" , 
                            headers : {
                                "content-type" : "application/json" 
                            }, 
                            body : JSON.stringify(msg_json)
            
                        }
                    );
            
            
                    if(response.ok)
                    {
                        alert("Success")
                    }
            
                    else
                    {
                        alert("Failed to Send")
                    }
                    
                } catch (error) {

                    console.log(error);
                    
                }
            }   
            
            else
            {
                alert("Fill All");
            }
            
        
    
    }
    const tagsPool = ["Action", "Adventure", "Multiplayer", "Singleplayer", "RPG", "Shooter", "Strategy"];


    const addTag = (tag) => {
        if (!tags.includes(tag)) {
          setTags([...tags, tag]);
        }
      };

    const addGame = async ()=>
    {
        try {

            const response = await fetch("http://localhost:5254/api/games/add-game" , 
                {
                    method :"POST" , 
                    headers : {
                        "content-type" : "application/json" 
                    }, 
                    body : JSON.stringify(game_json)

                }
            );

            if(!response.ok)
            {
                alert(`invalid ${response.status}`);
                throw new Error();
            }

            alert("success");
            
        } catch (error) {

            console.log(error);
            
        }

    }

    const removeGame = async () => {
        
        const response = await fetch(`http://localhost:5254/api/games/${removeGameId}`, {
            method: "DELETE"
        });
    
        if (!response.ok) {
            if (response.status === 404) {
                alert("Game not found.");
            } else {
                alert(`Invalid ${response.status}`);
            }
            throw new Error("Failed to delete");
        }
    
        alert("Success!");
    };
    

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
                        setGameData(data?.$values || []);
        
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
                   throw new Error(`Error : ${response.status}`);
                }
   
                const data = await response.json();
                setUserdata(data?.$values || []);
                console.log(response)
                
               } catch (error) {
                
                    console.log(error);
               }
  
  
            }
            fetchUsers();
        } , []
      );

    const showAddGameForm  = ()=>
    {
        
        setShowGameForm(!showGameForm);
        SetUpdateGameForm(false);
    }

    const showUpdateGameForm = ()=>
    {
        
        SetUpdateGameForm(!updateGameForm);
        setShowGameForm(false);
    }

    return(
        <div style={{backgroundColor:'ivory'}}>
            <h2>Admin Panel</h2><br/><br/>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel" : "Add User"}
            </button>
            <AdminOffer></AdminOffer>
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
            
            <h3>Registered Users</h3>
            {showMsgForm && (
                <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                    <br/><br/>
                <h3>Send Message</h3>
                <label>Sending to {sender}</label> <br/><br/>
                <input type="text" name="topic" placeholder="Topic" onChange={(e)=>{setMsgTopic(e.target.value)}} 
                style={{width:'450px' , padding:'7px'}}
                required/><br /><br />
                <input type="text" name="body" placeholder="Context"  onChange={(e)=>{setMsgBody(e.target.value)}
            
                }
                style={{padding:'25px' , width:'500px'}}
                required/><br /><br />
                
                <button className="btn btn-success"  style={{width:'100px'}} onClick={sendMsg} >Send</button> <br/><br/>

                </div>
            )}
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
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            {index + 1}
                            <br/>
                            <button className="btn btn-secondary"
                            onClick={() =>
                            {
                                setShowMsgForm(!showMsgForm)
                                setSender(user.email);
                            }
                            }
                            
                            > + </button>
                            </td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            {user.name} 

                        </td>
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
        <br/> 
            <br></br>
            <h3>Registered Games</h3>
           
            <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid black" }}>
            <thead>
                <tr style={{ borderBottom: "1px solid black" }}>
                    <th style={{ border: "1px solid black", padding: "8px" }}>No</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Id</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
                </tr>
            </thead>
            <tbody>
                {gameData.map((game, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid black" }}>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{game.id}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{game.name}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{game.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <br/>
        <button className="btn btn-primary" onClick={showAddGameForm} > {showGameForm ? "Cancel" : "Add Game"}</button>
        <button className="btn btn-secondary" onClick={showUpdateGameForm}>Update Game</button>
        <label style={{marginLeft:'50px'}} >Remove Row</label>
        <input
        type="text"
        onChange={(e) => setRemoveGameId(e.target.value)}
        style={{ marginLeft: '10px' }}
        />
        <button className="btn btn-primary" onClick={removeGame} style={{marginLeft:'20px'}}>
            Remove
            </button>
        <br/> <br/>
        {showGameForm && (
                <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                <h3>Add Game</h3>
                <input type="text" name="name" placeholder="Name"  onChange={(e)=>{setGameName(e.target.value)}} required/><br /><br />
                <input type="text" name="price" placeholder="Price"  onChange={(e)=>{setGamePrice(e.target.value)}}/><br /><br />
                <input type="text" name="img" placeholder="Image URL"  onChange={(e)=>{setImageUrl(e.target.value)}}/><br /><br />
                <input type="text" name="img" placeholder="Description"  onChange={(e)=>{setGameDescription(e.target.value)}}/><br /><br />
                <input type="text" name="img" placeholder="Trailer"  onChange={(e)=>{setTrailer(e.target.value)}}/><br /><br />
                
                
                <button className="btn btn-success" onClick={addGame} >Submit</button>
            </div>
            )}
        {updateGameForm && (
                <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                <h3>Update Game</h3>
                <input type="text" name="id" placeholder="Id"  onChange={(e)=>{setGameId(e.target.value)}}required/>
                <button className="btn btn-secondary" onClick={() => findGame(gameId)}>Find</button>
                <br /><br />    
                <input
                    type="text"
                    name="name"
                    placeholder={updateGameData?.name || "Name"}
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    required
                    /><br /><br />

                    <input
                    type="text"
                    name="price"
                    placeholder={updateGameData?.price || "Price"}
                    value={gamePrice !== 0.0 ? gamePrice : ""}
                        onChange={(e) => setGamePrice(parseFloat(e.target.value) || 0.0)}
                    
                    /><br /><br />

                    <input
                    type="text"
                    name="img"
                    placeholder={updateGameData?.img_url || "Image"}
                    value={imgUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{width:'500px'}}
                    /><br /><br />

                    <input
                    type="text"
                    name="description"
                    placeholder={updateGameData?.description || "Description"}
                    value={gameDescription}
                    onChange={(e) => setGameDescription(e.target.value)}
                    style={{width:'500px'}}
                    /><br /><br />

                    <input
                    type="text"
                    name="trailer"
                    placeholder={updateGameData?.trailer || "Trailer"}
                    value={trailer}
                    onChange={(e) => setTrailer(e.target.value)}
                    style={{width:'500px'}}
                    /><br /><br />

<input
  type="text"
  value={tags.join(", ")} // Convert array to string for display
  onChange={(e) => {
    const inputTags = e.target.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    setTags(inputTags); // Store as array
  }}
  style={{ width: "500px" }}
/>


<br /><br />

<div>
  <strong>Select tags:</strong><br />
  {tagsPool.map((tag) => (
    <button
      key={tag}
      onClick={() => addTag(tag)}
      style={{
        margin: "5px",
        padding: "5px 10px",
        backgroundColor: "#eee",
        border: "1px solid #ccc",
        cursor: "pointer",
        borderRadius: "5px"
      }}
    >
      {tag}
    </button>
  ))}
</div>


                
                
                <button className="btn btn-success" onClick={updateGame} >Submit</button>
            </div>
            )}    
             <br/> <br/>
        </div>
    );
    
}


export default Admin;