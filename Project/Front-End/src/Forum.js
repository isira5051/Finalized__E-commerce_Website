import { useState } from "react";
import "./css/LoginCard.css";

function Forum() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  

  const onSubmitFunction = async (e) => {
    e.preventDefault();
  
    // Construct JSON body correctly
    const jsonBody = {
      user_id: id,
      name: name,
      email: email,
      password: password,
      type : "user"

    };
  
    try {
      const response = await fetch("http://localhost:5254/api/users/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody), // Convert to JSON
      });
  
      // Check if the response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text(); // Get raw response
        throw new Error(`Server returned non-JSON response: ${text}`);
      }
  
      const responseData = await response.json(); // Now safely parse JSON
  
      if (response.ok) {
        alert("User added successfully!");
        setEmail("");
        setName("");
        setId("");
        setPassword("");
      } else {
        alert("Error adding user: " + responseData.message);
      }
    } catch (error) {
      console.error("Request failed:", error.message);
      alert("Request failed: " + error.message);
    }
  };
  

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", marginTop: "-140px" }}
    >
      <div className="sign-up-card-layout">
      <div className="login-card" style={{ width: "25rem" }}>
        <div className="card-body">
          <div className="login-label">
            <h2 style={{color:'aqua'}}>
              <center>Sign Up</center>
            </h2>
          </div>
          <form onSubmit={onSubmitFunction}>
            <div style={{ marginLeft: "6px" }} className="login-card-element">
              <div className="mb-3">
                <label
                  style={{ marginLeft: "13px" }}
                  htmlFor="email"
                  className="form-label"
                >
                  Email:
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="form-control"
                  required
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ marginLeft: "13px" }}
                  htmlFor="name"
                  className="form-label"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ marginLeft: "13px", marginTop: "15px" }}
                  htmlFor="id"
                  className="form-label"
                >
                  ID Number:
                </label>
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  style={{ marginLeft: "13px", marginTop: "-2px" }}
                  htmlFor="password"
                  className="form-label"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>
              <button
                style={{ marginTop: "5px" }}
                type="submit"
                className="btn btn-primary w-100"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Forum;
