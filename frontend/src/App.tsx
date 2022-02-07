import './App.css';
import Home from './components/Home';
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UserProfile from './components/UserProfile';
import FormLogin from './components/FormLogin';
import EditProfile from './components/EditProfile';
import SinglePost from './components/SinglePost';
function App() {
  return (
    <>
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Home />}/>
         <Route path='/:username' element={<UserProfile />}/>
         <Route path='/login' element={<FormLogin />}/>
         <Route path='/edit-user/:username' element={<EditProfile />}/>
         <Route path='/post/:id' element={<SinglePost />} />
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
