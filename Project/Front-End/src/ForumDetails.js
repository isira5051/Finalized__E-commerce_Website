import { useState, useEffect } from "react";
import Forum from "./Forum";
import "./css/Forum.css";
import FilterForum from "./FilterForum";

function ForumDetails() {
  const [Choice, setChoice] = useState("");
  const [SelectedDate, setSelectedDate] = useState("");
  const [showForum, setShowForum] = useState(false);
  const[showFilterButton , setShowFilterButton] = useState(true);

  const handleForumFilter = () => {
    if (SelectedDate === "" && Choice === "") {
      alert("Please Select One");
    } else {
      setShowForum(true); // Display the filtered forum
    }
  };

  // Reset filters after the FilterForum component has been rendered
  const hanndlFilter =  () =>
  {
      setChoice(""); // Reset the Choice filter
      setSelectedDate("")
      setShowForum(false);
  }

  return (
    <div className="forum-background">
     
      <br></br>

      <div style={{display:'flex' , marginTop:'40px' , alignItems:'center' , marginLeft:'200px'}}>
      <label>
        Select Section
        <select
          onClick={()=>setShowForum(false)}
          style={{ marginLeft: "30px" , width:'200px' , padding:'10px' }}
          value={Choice}
          onChange={(e) =>
            e.target.value !== "Select" ? setChoice(e.target.value) : setChoice("")
          }
        >
          <option value="Select" >Select</option>
          <option value="Orders">Orders</option>
          <option value="Feedback">Feedback</option>
          <option value="Suggetions">Suggetions</option>
        </select>
      </label>

      <label style={{ marginLeft: "30px"  , padding:'10px'  }}>
        Select Date
        <input
          onClick={()=>setShowForum(false)}
          type="date"
          style={{ marginLeft: "20px" }}
          value={SelectedDate}
          onChange={(e) =>
            e.target.value ? setSelectedDate(e.target.value) : setSelectedDate("")
          }
        />
      </label>
      <button onClick={handleForumFilter} className="btn btn-primary"  style={{padding:'8px' , width:'80px' , marginLeft:'30px'}}>Filter</button>
      <button className="btn btn-secondary" style={{marginLeft:'20px'}} onClick={hanndlFilter}>Reset</button>
      </div>

      <br></br>

      

      <br></br>

      {showForum && (
        <div>
          
          <FilterForum selection={Choice} date={SelectedDate} />
          
        </div>
      )}
    </div>
  );
}

export default ForumDetails;
