import { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import UserDashboard from "./UserDashboard";
import './css/UserDashboard.css'

function UserLibrary() {
    const [game_data, Set_game_data] = useState([]);
    const { user } = useUser();
    const[like , setLike] = useState(false);
    useEffect(() => {
        const getGameLibrary = async () => {
            const json_body = {
                "user_id": user.user_id
            };
                
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

                Set_game_data(data.$values); 

                console.log("Fetched Games:", data.$values);
            } catch (error) {
                console.error("Error fetching game library:", error);
            }
        };

        getGameLibrary();
    }, []);

    return (
       
            

            
            <div className="home-background-image">
                <div className="container mt-0" >
            <br></br>
            <UserDashboard></UserDashboard>
           
            <div style={{marginTop:'40px'}}>
            
            <div className="row" style={{ marginTop: '10px' }}>
                {game_data.map((game) => (
                    <div key={game.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src={game.img_url}
                                className="card-img-top"
                                alt={game.name}
                                style={{  objectFit: "cover" }}
                            />
                            <div className="card-in-background">
                               
                                <h5 className="card-title" style={{marginTop:'16px' , marginLeft:'10px'}}>{game.name}</h5>
                                <br></br>
                                <button className="btn btn-secondary">View Details</button>
                                <button
                                    className="btn btn-success"
                                    style={{ marginLeft: '10px' , color:'aqua'}}
                                    onClick={()=> { alert(`Now Playing ${game.name}`)}}
                                >
                                   <h2>▶️</h2>
                                   
                                </button>
                                <button
                                   onClick={()=>setLike(!like)}
                                    style={{
                                        fontSize: '2rem',
                                        marginLeft:'140px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: like ? 'red' : 'gray',
                                        transition: 'color 0.2s ease-in-out',
                                        backgroundColor : like && "green",
                                        color:'white',
                                        padding:'4px'
                                    }}
                                    >
                                    <h4>❤️</h4>
                                    </button>
                                <br/><button style={{marginLeft:'-200px'}}>📝</button>
                                <label style={{marginLeft:'20px'}}>Leave a Review</label>
                                
                                
                            </div>
                        </div>
                    </div>
                ))}
                
            </div><br></br><br></br><br></br>
            <br></br><br></br><br></br>
            </div>
            </div>
                
            
            </div>
            
        
    );
}

export default UserLibrary;
