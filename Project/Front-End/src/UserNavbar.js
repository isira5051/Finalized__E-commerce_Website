
import './css/Navbar.css';

function UserNavbar({ hasOrder }) {

  

    return (
        <div>
            <nav>
                <div className="navbar-element" style={{marginTop:'30px'}}>
                    <ul>
                        <li><a href="/dashboard/user">Home</a></li>
                        <li><a href="/user/forum">Form</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="/user/dashboard/library">Library</a></li>
                        <li>
                            <div className={hasOrder ? "update-order-button" : ""}>
                                <a href="/dashboard/orders" className={hasOrder ? "bounce-text" :""}>Orders</a>
                            </div>
                        </li>
                    </ul>
                    
                    
                </div>
                
            </nav>
           
        </div>
    );
}

export default UserNavbar;
