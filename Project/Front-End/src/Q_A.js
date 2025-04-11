import {useState } from "react";
import FilterForum from "./FilterForum";
import { useUser } from "./UserContext";

function Q_A() {
   
    const {user}  = useUser();
    const [topic , setTopic] = useState("");
    const[forum_content , setForum_Content] = useState("");
    const[selection , setSelection] = useState('');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];


    
    const jsonBody =
    {
        Selection : selection,
        user_id : user.user_id,
        topic : topic , 
        forum_content : forum_content
    }

    const addQuestion = async () => {
        

        if( topic != "" && forum_content !="")
        {
            try {
                const response = await fetch("http://localhost:5254/api/user/forum/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonBody), 
                });
    
                if (response.ok) {
                    alert("Success");
                }
            } catch (error) {
                console.error("Error fetching filtered forums:", error);
            }
        }

        else

        {
            alert("Please Fill All");
        }

    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2 style={{marginRight:'60px'}}>Welcome to the Forum</h2><br/><br/>
            <br/>
            <form>
            <label>
            Select Section
            <select style={{marginLeft:'30px'}} onChange={(e) => setSelection(e.target.value)}>
                <option value="Orders">Orders</option>
                <option value="Feedback">Feedback</option>
                <option value="Suggetions">Suggetions</option>
            </select>
        </label>

            </form>
            <br/>
            <center><input
                placeholder="Forum Topic"
                type="text"
                onChange={(e)=> setTopic(e.target.value)}
                style={{ padding: "8px", width: "80%", marginLeft:'-75px' }}
            ></input></center>
            <br/>
            <br/>
            <center>
            <input
                type="text"
                onChange={(e) => setForum_Content(e.target.value)}
                placeholder="Ask a question..."
                style={{ padding: "40px", width: "900px", marginLeft:'-160px' }}
            />
            </center><br/>
            <div style={{display:"flex"}}>
            <button className="btn btn-secondary" onClick={addQuestion} style={{ padding: "12px" , marginLeft:'-40px' }}>Submit</button><br/>
            <a href="http://localhost:3000/forum"><button className="btn btn-primary"  style={{marginLeft:'50px' ,marginBottom:'2px' , padding:'12px'}}>View Forum</button></a>
            </div>
            <br></br>
            <FilterForum selection="" date={formattedDate} />
            
            
        </div>
    );
}

export default Q_A;
