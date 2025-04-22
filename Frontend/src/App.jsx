import React from "react"
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom"
import BackgroundPaths from "./Components/Home/BackgroundPath"
import Login from "./Components/Login and Register/Login"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BackgroundPaths />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}