import { Component } from "react";
import Forum from "./Forum";
import Header from "./Header";
import './css/Navbar.css'

class Navbar extends Component {
    state = {
        name : 'Isira'
        
    }

    myFunction = () =>
    {
        this.setState({name : 'Kevin'})
    }

    render() { 
        return (
            <div>
                <nav>
                   <div className="navbar-element">
                   <ul>
                        <li>
                        <a href="/">Home</a>
                        </li>
                        <li>
                        <a href="#">About</a>
                        </li>
                        <li>
                        <a href="#">Services</a>
                        </li>
                        <li>
                        <a href="#">Contact</a>
                        </li>
                        <li>
                        <a href="/view">View</a>
                        </li>
                    </ul>
                   </div>
                </nav>
                                    
            </div>
        );
    }

}
 
export default Navbar;
