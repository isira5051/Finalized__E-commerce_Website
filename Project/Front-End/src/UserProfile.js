import { useUser } from "./UserContext";
import './css/UserDashboard.css'


function UserProfile() {

    const {user} = useUser();

    return(
        <div style={{marginLeft:'200px'}}>
            <a href="/login" ><h2><button className="profile-logo">🧑‍💻</button></h2></a>
            <h2 style={{ color:'brown'}}>Welcome </h2> 
                 <h5 style={{color:'ivory'}}>{user.email}</h5>
                 
        </div>
    )
    
}


export default UserProfile;
