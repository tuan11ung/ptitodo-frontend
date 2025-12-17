import * as React from 'react'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to='/boards/692b2128f9a85561876254c6' replace={true}/>
      }
      />
      <Route path="/boards/:boardId" element={<Board />} />

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
