import React from "react"
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import Login from "./Components/Login and Register/Login"
import Chat from "./Components/Chat/Chat"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </>
  )
}