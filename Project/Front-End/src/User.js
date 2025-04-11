import { use, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import UserDashboard from "./UserDashboard";
import './css/GameCard.css';
import './css/UserDashboard.css';



function User() {
    const [gameData, setGameData] = useState([]); // Store game list
    const [cart, setCart] = useState([]); // Store cart items
    const [id_cart , setIdCart] = useState([]);
    const [showCart , setShowCart] = useState(false);
    const[displayCheckout , setDisplayCheckout] = useState(false);
    const [displayLogo , setDisplayLogo] = useState(false);
    const [msg , setMsg] = useState([]);
    const {user} = useUser();
    const[shoeMsg , setShowMsg] = useState(false);
    const[showWishList , setShowWishList] = useState(false);
    const[wishGame , setWishGame] = useState("");
    const[addWishGame , setAddWishGame] = useState([]);
    const[viewWishGame , setViewWishGame] = useState([]);
    const[hasOrder , setHasOrder] = useState(false);
    const[libraryGames , setLibraryGames] = useState([]);
    const[isInLibrary , setisInLibrary] = useState(false);
    const[showDes , setShowDes] = useState(false);
    const[gameIdHover , setGameIdHover] = useState("");

    const msg_json_body ={

        rec_email : user.email // json_body when retreiving messgaes
    }

    useEffect(
        () =>
        {
            const checkGameExistingLibrary = async() =>
                {
                    const json_body ={
            
                        "user_id" : user.user_id
                    }
                    try {

                        const response = await fetch("http://localhost:5254/api/user/library/view-library", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(json_body)
                        });
        
                        if (!response.ok) {
                            console.log(response);
                            return;
                        }
        
                        const data = await response.json();
                        
        
                        if (!data?.$values || !Array.isArray(data.$values)) {
                            console.error("Unexpected response format:", data);
                            return;
                        }
        
                        setLibraryGames(data.$values);
                        
                    } catch (error) {

                        console.log(error);
                        
                    }
            
                    
            
                }
                checkGameExistingLibrary();
        }
        , []
    );
    

    useEffect(
        ()=>
        {
            const checkGame = ()=>
            {
                
                let currentGame ;
                if (cart.length === 1) {
                    console.log(cart[0]);
                    currentGame = cart[0]
                } else if (cart.length > 1) {
                    currentGame = cart[cart.length -1];
                }
                
                let _isInLibrary = false;

                if(cart.length > 0)
                {
                     _isInLibrary = libraryGames.some(game => game.id === currentGame.id)
                }

                setisInLibrary(_isInLibrary);
                
            }
            checkGame();
        },
        [cart]
    );

    const getMsg = async () =>
    {
        try {
          
            const response = await fetch("http://localhost:5254/api/admin/msg/get-msg-user" , {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(msg_json_body)
            });

            if(!response.ok)
            {
                throw new Error(`Response status ${response.status}`);
            }

            const data = await response.json();
            setMsg(data.$values);
            console.log("messages" ,msg);

        } catch (error) {
            
            console.log(error);
        }

    }

    

    const sendWishGamesRequest = async ()=>
    {
        const json_body = {
            user_id : user.user_id,
            game_list : addWishGame
        }

        try {

            const response = await fetch("http://localhost:5254/api/review/add-wish-list" , {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(json_body)
    
            });
    
            if(!response.ok)
            {
                throw new Error(response);
    
            }

            console.log("backend" , response)
    
            console.log("wish list" , addWishGame);
            alert("List sent successfully");
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    const deleteMsg = async(msg_id)=>
    {
        console.log(msg_id)
        const json_body =
        {
            msg_id : msg_id
        }

        try {

            const response = await fetch("http://localhost:5254/api/admin/msg/delete-msg" , {
                method:"POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body : JSON.stringify(json_body)
            });
    
            if(!response.ok)
            {
                throw new Error(response);
            }

            getMsg();
            
            console.log(await response.json());
            
        } catch (error) {
            
            console.log("Error Fetching Delete Message" , error);
        }
        

    }


    // Fetch games from the backend
    useEffect(() => {
        const renderGames = async () => {
            try {
                const response = await fetch("http://localhost:5254/api/games/view-game");

                if (!response.ok) {
                    throw new Error(`Response Error ${response.status}`);
                }

                const data = await response.json();
                setGameData(data?.$values || []);
               

            } catch (error) {
                console.log(error);
            }
        };

        renderGames();
    }, []); 

    useEffect(()=>
    {
        getMsg();
    } , []);

    

    const resetCart = ()=>
    {
        setCart([]);
        setIdCart([]);
        setDisplayCheckout(false);
    }
   

    const addToCart = (game) => {
        setCart(prevCart => [...prevCart, game]); 
        setIdCart(prevCart => [...prevCart, game.id]); 
        console.log("Cart Updated:", cart); 
        setDisplayCheckout(true);
    };


    const addWishGameFunc= ()=>
    {
        setAddWishGame( p => [...p , wishGame]) ;
        setShowWishList(true);

    }

    const resetWishList =  ()=>
    {
        setAddWishGame([]);
    }


    const viewWishList = async ()=>
    {
        try {
            
            const json_body = {
                user_id : user.user_id
            }
    
    
            const response = await fetch("http://localhost:5254/api/review/get-wish-list"  , {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body : JSON.stringify(json_body)
    
            });
    
    
            if(!response.ok)
            {
                throw new Error(response.status);
            }
    
            const data  = await response.json();
            const extractedGames = data?.$values?.[0]?.$values || []; // Safely extract the game list

            setViewWishGame(extractedGames);
            setAddWishGame(extractedGames); // Use extractedGames instead of viewWishGame
            setShowWishList(!showWishList);
            
          
            

        } catch (error) {
            console.log(error);
        }
    }

    

    const AddOrder = async ()=>
    {   
       

        const json_body = {
            "user_id" : user.user_id,
            "item_list" : id_cart

    }  

    console.log(" Sending JSON:", json_body);

    try {

        if (id_cart.length == 0)
        {
            console.error("Error: Item list cannot be empty!");
            alert("Your cart is empty. Please add items before checking out.");
            return
        }

        const response = await fetch("http://localhost:5254/api/orders/add-order", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json_body),
        });

        if(response.ok)
        {
            alert("Order Received. Wait to process");
        }

        
    } catch (error) {
        console.log(error);
    }
        
    }

  

    const HandleCart = (game) => {
        const _isInLibrary = libraryGames.some(g => g.id === game.id);
    
        if (_isInLibrary) {
            alert("Game is already in Library");
            return;
        }
    
        addToCart(game); // Safe to add now
    };


    const hanndleCardHover = (id)=>
    {
        setGameIdHover(id);
        setShowDes(true)

    }

    return (
        <div className="home-background-image">
            <div className="container mt-0" style={{backgroundColor:'brown'}}>
            <br></br>
            <UserDashboard hasOrder = {displayCheckout}></UserDashboard>
            
            <div style={{marginTop:'-30px'}}>
            <button style={{marginLeft:'1000px' , marginTop:'60px'}} className="btn btn-primary" onClick={()=> {setShowCart(!showCart)}}>My Cart</button>
            {showCart && (
                <div style={{marginLeft:'900px'}}>
                    <ul><h3 className="mt-4" style={{color:'ivory'}}>🛒 Cart Items</h3>
                        {cart.map((item, index) => (
                            <li style={{color:'silver'}} key={index}>{item.name} - ${item.price}</li>
                        ))}
                    </ul>
                    
                    <h4 style={{color:'gold'}}>Total: ${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</h4>
                    {displayCheckout && cart.length !=0  &&(
                        
                            <div>
                            <button className="btn btn-primary" onClick={resetCart}>
                                Reset
                            </button>

                            <button className="pay-button" onClick={AddOrder}>Pay Now</button>
                            
                            </div>
                        
                    )}
                    


                    




                </div>
            )}

            </div>
            <button className="btn btn-secondary" onClick={() => {setDisplayLogo(!displayLogo)}}>Add to Wishlist</button>

            {
                displayLogo &&
                    (
                        <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "5px" }}>
                        <h3 style={{color:'maroon'}}>Please informs us games you want to add</h3>
                        
                        <input style={{padding:'4px' , marginTop:'15px'}} type="text" name="type" placeholder="Games You want to Add" onChange={(e)=>{setWishGame(e.target.value)}} />
                        <button style={{marginLeft:'20px'}} 
                        className="btn btn-primary"
                        onClick={addWishGameFunc}
                        >Add</button>
                        <button  className="btn btn-secondary" style={{marginLeft:'10px'}} onClick={resetWishList}>Reset</button>
                        <br /><br />
                        {
                            showWishList && (
                                <div>
                                    <ul>
                                    {addWishGame.map(
                                        (game) =>
                                        {
                                            return <li style={{color:'ivory'}}>{game}</li>
                                            
                                        }
                                    )}
                                    </ul>

                                 </div>
                            )
                        }
                        <button className="btn btn-primary" onClick={viewWishList}>View My Wishlist</button>
                        
                        <button className="btn btn-success" style={{marginLeft:'20px'}}  onClick={sendWishGamesRequest}>Send Request</button>
            </div>
                    )
            }
            <br/>

                    
            <br/>

            <div className="row" style={{ marginTop: '10px' }}>
                {gameData.map((game) => (
                    <div key={game.id} className="col-md-4 mb-4">
                        {showDes && gameIdHover === game.id &&  (
                                <div className="transparent-textbox">
                                <p>{game.description}</p>
                              </div>
                            )}
                        <div className="card shadow-sm"
                            
                        >
                            
                            <img 
                                src={game.img_url}
                                className="card-img-top" 
                                alt={game.name} 
                                style={{ height: "200px", objectFit: "cover" }}
                                onMouseEnter={() => hanndleCardHover(game.id)}
                                onMouseLeave={()=>setShowDes(false)}
                                
                            />
                            
                            <div className="card-body text-center">
                                <h5 className="card-title">{game.name}</h5>
                                <p className="card-text">Price: ${game.price}</p>
                                <button className="btn btn-primary" 
                                
                                >View Details</button>
                                <button 
                                    className="btn btn-success" 
                                    style={{ marginLeft: '30px' }} 
                                    onClick={()=>HandleCart(game)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <button style={{marginLeft:'1200px'}} 

            className={msg.length > 0 ? "messages-button" : "messages-button-reset"}
            onClick={()=> {setShowMsg(!shoeMsg)}}
            >Messages</button>
            

            <br/> 
            {shoeMsg && 
                  
                      
                      <div
                      className="modal fade show"
                      tabIndex="-1"
                      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                      aria-labelledby="notificationModalLabel"
                      aria-hidden="false"
                    >
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header">
                            
                            <h5  id="notificationModalLabel">
                              Messages
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={()=>setShowMsg(!shoeMsg)}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                           
                          </div>
                          <div className="modal-body">
                            {msg.map((item, index) => (
                              <div key={index} className="mb-3">
                                <strong>From</strong>
                                <h6 className="text-danger">{item.sender_email}</h6>
                                <strong>Topic</strong>
                                <h6 className="text-danger">{item.msg_topic}</h6>
                                <i><p>{item.message_content}</p></i>
                                <button 
                                className="message-accept-button"
                                onClick={()=>{deleteMsg(item.message_id)}}
                                
                                >✅</button>
                                <br></br>
                              </div>
                            ))}
                                {msg.length == 0 ? (
                                    <h2>No Messages</h2>
                                ) : []}
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                  }
            <br/> <br/>
        </div>
        </div>
    );
}

export default User;
