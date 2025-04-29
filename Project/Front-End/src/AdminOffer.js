import { useEffect } from "react";
import { useState } from "react";
import GameOffer from "./GameOffer";

function AdminOffer() 
{


    const [offerForum , showOfferForum] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState("");
    const [showGame , setShowGame] = useState(false);
    const [showOrder , setShowOrder] = useState(false);

    const handleChange = (e) => {
        setSelectedOffer(e.target.value);
    };


    useEffect(
        ()=>
        {
            if(selectedOffer != "")
            {
                if(selectedOffer == "game")
                {
                    setShowGame(true);
                    setShowOrder(false);
                }

                else if(selectedOffer == "order")
                {
                    setShowGame(false);
                    setShowOrder(true);
                }
            }

            else
            {
                setShowGame(false);
                setShowOrder(false);
            }

        } , [selectedOffer]
    );

    return(
        <div>
            <button className="btn btn-primary" style={{marginTop:'20px' , width:'130px'}} onClick={()=> showOfferForum(!offerForum)}>Add Offer</button>

            {offerForum &&
            (
                <div>
                    <select
                    id="offer-select"
                    onChange={handleChange}
                    style={{
                    padding: "8px",
                    width: "200px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    }}
                >
                    <option value="" disabled>Select an offer</option>
                    <option value="game">Game Offer</option>
                    <option value="order">Order Offer</option>
                </select>
                </div>
            )}

            {showGame &&
            (
                <div>
                    <GameOffer></GameOffer>
                </div>
            )}


            

            
            </div>
    );
    
}

export default AdminOffer;