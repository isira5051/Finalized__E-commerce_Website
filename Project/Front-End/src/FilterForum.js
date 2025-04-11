import { useEffect, useState } from "react";

function FilterForum({ date, selection }) {
    const [forums, setForums] = useState([]);

    useEffect(() => {
        const filterForum = async () => {
            const jsonBody = {};

            if (selection === "") {
                jsonBody.Date = date;
            } else if (date === "") {
                jsonBody.selection = selection;
            } else {
                jsonBody.Date = date;
                jsonBody.selection = selection;
            }

            try {
                const response = await fetch("http://localhost:5254/api/user/forum/filter", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(jsonBody), // Convert to JSON
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setForums(data.$values); // Assuming data.$values is an array of forum objects
                }
            } catch (error) {
                console.error("Error fetching filtered forums:", error);
            }
        };

        filterForum();
    }, [date, selection]); // Ensure the effect runs when date or selection changes

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <div style={{backgroundColor:'lightgray' , width:'100%' , marginLeft:'-15px'}}>
                <h7 style={{ display: 'flex', fontStyle: 'italic', marginBottom: '15px' , marginLeft:'10px'}}>
                    Showing for
                    <p style={{ color: 'grey', marginLeft: '10px' , color:'red' }}>{selection}</p>
                    <p style={{ marginLeft: '10px' }}>Date</p>
                    <p style={{ color: 'grey', marginLeft: '10px',color:'red' }}>{date}</p>
                </h7>
            </div>

            <div style={{ maxHeight: '80vh', overflowY: 'auto', marginBottom: '20px' }}>
                {forums.length > 0 ? (
                    forums.map((forum, index) => (
                        <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '15px', backgroundColor: '#fff', marginBottom: '10px', borderRadius: '8px' }}>
                            <h4>{forum.forum_topic}</h4>
                            <p>{forum.forum_content}</p>
                            <p><strong>Selection:</strong> {forum.forum_selection}</p>
                            <p><strong>Date:</strong> {forum.date}</p>
                            <p><strong>User ID:</strong> {forum.user_id}</p>
                        </div>
                    ))
                ) : (
                    <p>No forums to display.</p>
                )}
            </div>
        </div>
    );
}

export default FilterForum;
