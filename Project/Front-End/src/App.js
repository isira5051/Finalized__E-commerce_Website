import { UserProvider } from "./UserContext";
import './css/App.css';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from './Login';
import Admin from './Admin';
import Orders from "./Orders";
import User from './User';
import UserLibrary from "./UserLibrary";
import Payment from "./Payment";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Q_A from './Q_A';
import ForumDetails from "./ForumDetails";
function App() {




  return (
    <div className="App">
      <UserProvider>  
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/view' element={<Orders />} />
            <Route path='/dashboard/admin' element={<Admin />} />
            <Route path='/dashboard/user' element={<User />} />
            <Route path="/dashboard/user/payment" element={<Payment/>}></Route>
            <Route path='/dashboard/orders' element={<Orders />} />
            <Route path='/user/forum' element={<Q_A />} />
            <Route path="/forum" element={<ForumDetails/>}></Route>
            <Route path="/user/dashboard/library" element = {<UserLibrary></UserLibrary>}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
