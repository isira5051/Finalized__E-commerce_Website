import UserNavbar from "./UserNavbar";
import UserProfile from "./UserProfile";

function UserDashboard({hasOrder}) {

    return(
        <div style={{ display: "flex" }}>
        <br></br>
        <UserNavbar hasOrder={hasOrder} />
        <UserProfile />

    </div>
    );
    
}


export default UserDashboard;