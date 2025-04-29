import React, { useState } from "react";

function GameOffer() 
{

    const [name, setName] = useState("");
    const [price, setMinPrice] = useState(0.0);
    const [selectedTags, setSelectedTags] = useState([]);
        const[filteredGames , setFilteredGames] = useState([]);

    const tagsPool = ["Action", "Adventure", "Multiplayer", "Singleplayer", "RPG", "Shooter", "Strategy"];

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const applyFilter = async () => {
        
        const json_body = {
            name: name ? name.trim().toLowerCase() : null,
            price: price > 0.0 ? price : null,
            tags: selectedTags.length > 0  ? selectedTags : null,
        }

        console.log(json_body);

       try {

            const response = await fetch("http://localhost:5254/api/games/filter-game" , 
                {
                    method :"POST" , 
                    headers : {
                        "content-type" : "application/json" 
                    }, 
                    body : JSON.stringify(json_body)

                }
            );

            if (response.ok)
            {
                const data = await response.json();
                setFilteredGames(data.$values);

            }

            else
            {
                alert("Not Found");
            }
        
       } catch (error) {

        console.log(error);
       }

        
    };

    return (
        <div style={{ margin: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <h3>Filter Games</h3>

        <div style={{ marginBottom: "10px" }}>
            <label>Game Name: </label><br />
            <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search by name"
            />
        </div>

        <div style={{ marginBottom: "10px" }}>
            <label>Minimum Price: </label><br />
            <input
            type="number"
            value={price}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0.0"
            />
        </div>

        <div style={{ marginBottom: "10px" }}>
            <label>Tags:</label><br />
            {tagsPool.map((tag) => (
            <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                margin: "5px",
                padding: "5px 10px",
                backgroundColor: selectedTags.includes(tag) ? "#d1e7dd" : "#eee",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                }}
            >
                {tag}
            </button>
            ))}
        </div>

        <button onClick={applyFilter} className="btn btn-secondary" style={{ padding: "8px 16px", marginTop: "10px" }}>
            Apply Filter
        </button>
        <div style={{ marginTop: "20px" }}>
        <h4>Filtered Games:</h4>
        {filteredGames.length === 0 ? (
            <p>No games found.</p>
        ) : (
            <ul>
                {filteredGames.map((game, index) => (
                    <li key={index}>
                        <strong>{game.name}</strong> – ${game.price}
                        <br />
                        
                    </li>
                ))}
            </ul>
        )}
    </div>

        </div>
    );
    
}

export default GameOffer;