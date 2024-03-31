
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './userContext'
import { createContext, useEffect, useState } from "react";
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LogonPage'
import Layout from './Layout'
import Register from './pages/Register'
import axios from 'axios'
import AcountPage from './pages/acountPage';
import PlacesPage from './pages/place';
import PlacePage from './pages/placePage';
axios.defaults.baseURL = "http://localhost:3000"
axios.defaults.withCredentials = true;


function App() {
 
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Account/:sub?" element={<AcountPage />} />
          <Route path="/Account/:sub/:action" element={<AcountPage />} />
          <Route path="/Account/places/edit/:id" element={<PlacesPage />} />
          <Route path="/place/:id" element={<PlacePage />} />

        </Route>

      </Routes>
    </UserContextProvider>

  )

}

export default App
