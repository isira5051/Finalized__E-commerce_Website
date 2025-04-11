import { useEffect } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";

function Payment(params) 
{
    const{user} = useUser();

    const navigate = useNavigate();

    const json_body = {

        order_id : user.order_id,
        user_id : user.user_id

    }

    
    const addToLibrary =  async () =>
    {
        try {

            const response = await fetch("http://localhost:5254/api/orders/complete-order" , {
                method:"POST",
                headers :{
                    "Content-Type": "application/json",
                  },
                body : JSON.stringify(json_body) ,
            });

            console.log("status" ,response.status)
    
            if(response.ok)
            {
                alert("Games Added to Library");
                
            }
            
        } catch (error) {
            
            console.log(error);
        }
        
    }

    const payOrder = async () =>
    {
        
        alert(`Payment processing Total ${user.total_price} Amount`);
        alert("Please Wait Order will Start to Process ");

        // process order

        try {
            console.log(user.order_id);
            console.log(user.user_id);
            const response = await fetch("http://localhost:5254/api/orders/add-user-order" , {
                method:"POST",
                headers :{
                    "Content-Type": "application/json",
                  },
                body : JSON.stringify(json_body) ,
            });

            if(response.ok)
            {
                alert("Order Processed!");
                navigate(-1);
                await addToLibrary();
            }
            console.log(response.status);
            
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div>
             <button className="btn btn-secondary" style={{marginLeft:'320px'}} onClick={payOrder}><h4 >Pay Now</h4></button>

        </div>
    );
    
}

export default Payment;