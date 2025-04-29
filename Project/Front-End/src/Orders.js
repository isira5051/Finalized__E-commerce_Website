import React, { useEffect, useState } from "react";
import { useUser } from "./UserContext";
import './css/Notification.css'



function Orders() {


    const {user} = useUser();
    const{setUser} = useUser();
    const[orders , setOrders] = useState([]);
    const[showForm , setShowForm] = useState(false);
    const[notifications , setNotifications] = useState([]);
    const[showOrder , setShowOrder] = useState(false);
    const[gameids , setGameids] = useState([]);
    const[gameOrder , setGameOrder]  = useState([]);
    const[orderId , setOrderId] = useState();
    const[orderProcessed, setOrderProcessed] = useState(false);

    

    
    
    const getNotifications =  async (order_id) =>
    {

        const json_body = {
          order_id : order_id
        }

        try {

          const response = await fetch("http://localhost:5254/api/orders/notification-by-order" , {

            method :"POST",
            headers :{
              "Content-Type": "application/json",
            },
            body : JSON.stringify(json_body) 
          });

          if(!response.ok)
          {
            console.log(response);
            throw new Error(response.status);
          }

          const data = await response.json();
          setNotifications(data.$values);

        } catch (error) {
          console.log(error);
        }


    }


    const viewStatus = (order_id , list , status) =>
    {
     
        setOrderId(order_id);
        setShowForm(true)
        setGameids(list);
        getNotifications(order_id);
        
        if (status === "Processed")
        {
          setOrderProcessed(true);
        }

        

    }

    const getOrderItems =  async(games_ids)=>
    {
      
      const json_body ={
        game_id_list : games_ids

      }
      

      console.log("game" , gameids.$values);
      
      try {
        
        console.log("function");
          const response = await fetch("http://localhost:5254/api/games/get-game-order" , {
            method:"POST",
            headers :{
              "Content-Type": "application/json",
            },
            body : JSON.stringify(json_body) 
            
          });
    
          console.log("res" , response);
    
          if(!response.ok)
          {
            throw new Error(response);
          }
    
          const data = await response.json();
          setGameOrder(data.$values);
          
        
  
        

      } catch (error) {
        console.log(error);
      }



    }

   

    const ProcessFullOrder = async (list)=>
    {
      
      if(list.$values.length > 0)
      {
        getOrderItems(list);
        setShowOrder(!showOrder);
      }

      

      else
      {
        alert("Empty!");
        setShowOrder(false);

      }
      

      
    }

    useEffect(
      () =>
      {    
        console.log("Fetching orders for user:", user);
          const json_body =
                {
                  user_id : user.user_id   
                }
            
          const renderOrders = async () =>
          {
              try {
                
                
                const response = await fetch("http://localhost:5254/api/orders/get-by-user" , {

                  method : "POST" ,
                  headers :{
                    "Content-Type": "application/json",
                  },
                  body : JSON.stringify(json_body) ,
                  
                  
  
                });

                if(!response.ok)
                {
                  return Error(response);
                }

                const data = await response.json();
                console.log("data" , data.$values);
                console.log("user" , user.email)
                //alert(user.user_id);
                setOrders(data.$values);
                
                
              } catch (error) {

                console.log("eror fetchting data " , {error}); 
              }
          }

          renderOrders();

          

          
      },[]
    );

    const closeNotification = ()=>
    {
     
      setShowForm(false);
      setShowOrder(false);
      
     
    }

    return(
        <div>
      

        <h2>All Orders</h2><br></br>
        <div>
          <t>
            <tr>
              <td>
              <ul>
              {orders.map((order, index) => (
                <li key={index}>
                 
                  <strong>Order_No:</strong> {order._order_no} <br />
                  <strong>Date:</strong> {order._date} <br/>
                  <strong>Status:</strong> <h5 style={{color:'red'}}>{order.order_status}</h5> 
                  <button style={{marginLeft:'10px'}}
                          className="btn btn-primary"
                          onClick={() => viewStatus(order._order_no , order._item_list ,order.order_status)}
                          
                          
                  >View Details</button> <br/><br/>

                  
                </li>
              ))}
            </ul>
              </td>

              <td>
              <td>
                <ol>
                  {showForm && 
                    
                      
                      <div
                      className="modal fade show"
                      tabIndex="-1"
                      style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                      aria-labelledby="notificationModalLabel"
                      aria-hidden="false"
                      
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            
                            <h5  id="notificationModalLabel">
                              Notifications
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={closeNotification}
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                           
                          </div>
                          <div className="modal-body" >
                            {notifications.map((item, index) => (
                              <div key={index} className="mb-3">
                                <strong>Status</strong>
                                <h6 className="text-danger">{item.notification_topc}</h6>
                                
                                <i><p>{item.content}</p></i>
                              </div>
                            ))}
                            
                            {!showOrder && (
                            <button className="btn btn-secondary" onClick={() => ProcessFullOrder(gameids)}>
                              View
                            </button>
                          )}
                            {showOrder && gameOrder.length > 0 && (() => {
                            let total = gameOrder.reduce((sum, item) => sum + item.price, 0);
                          

                            return (
                              <div>
                                <hr />
                                <table>
                                      <thead>
                                        <tr>
                                          <th>Game</th>
                                          <th style={{ paddingLeft: '50px' }}>Price</th>
                                          <th>Details</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {gameOrder.map((item, index) => (
                                          <tr key={item.Id}>
                                            <td className="text-danger">{item.name}</td>
                                            <td  style={{paddingLeft:'50px'}} className="text-danger">{item.price}</td>
                                            <td>
                                              <i>{item.content}</i>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>

                                
                                <hr />
                               
                                <strong>Total Price: </strong>
                                <h6 className="text-success">{total}</h6>
                                {orderProcessed && (
                                  <div className="paid-notice-box">
                                      <center><b><h2 style={{color:'Red'}}>Paid</h2></b></center>
                                  </div>
                                )}
                                <a href="/dashboard/user/payment">
                                {!orderProcessed && (
                                  <div>
                                        <button 
                                    className="btn btn-secondary" 
                                    onClick={() => setUser(prevState => ({
                                      ...prevState, // Keep the previous stat
                                      order_id: orderId, // Add the new order data
                                      total_price: total // Add the new total price
                                    }))}
                                  
                                    style={{ marginLeft: '320px' }}
                                  >
                                    <h4>Pay Now</h4>
                                  </button>
                                  </div>
                                )}
                                
                              </a>
                              </div>
                            );
                          })()}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                  }
              
                </ol>
              </td>
              </td>
            </tr>
          </t>

        </div>
        
        <br></br>
        



    </div>
  
    );

    
}

export default Orders;