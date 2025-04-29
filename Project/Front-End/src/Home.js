import { Component } from "react";
import Navbar from "./Navbar";
import Forum from "./Forum";

import Header from "./Header";

class Home extends Component {
    state = { 
        showForum : false,
        apple : 'Isira'
     };

     passfunction2 = () => {
        this.setState({apple : 'Kevin'});
     }

    render() { 
        // Trigger the alert only when the state "apple" is "Kevin"
        if (this.state.apple === "Kevin") {
            alert("yes");
        }

        return (
            <div className="home-background-image">
                
                <Navbar onHomeclick={this.passfunction2} />
                <Forum></Forum>
                <Header></Header>
                <a href="/login"><button className="btn btn-primary" style={{marginLeft:'723px', marginTop:'-210px'} }>Log In</button></a>
            </div>
        );
    }
}

export default Home;
