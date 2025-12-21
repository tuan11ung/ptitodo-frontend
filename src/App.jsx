import * as React from 'react'
import Board from './pages/Boards/_id'
import NotFound from './pages/404/NotFound'
import Auth from './pages/Auth/Auth'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { currentUserSelector } from './redux/user/userSlice'
import Settings from './pages/Settings/Settings'
import Boards from './pages/Boards'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true}/>
  // Outlet cua react-router-dom se chay vao cac child route
  return <Outlet />
}

function App() {
  const currentUser = useSelector(currentUserSelector)
  return (
    <Routes>
      <Route path='/' element={
        <Navigate to='/boards' replace={true}/>
      }
      />

      {/* ProtectedRoute: nhung route duoc truy cap chi khi login */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* Board routes */}
        <Route path="/boards/:boardId" element={<Board />} />
        <Route path="/boards" element={<Boards />} />

        {/* User setting */}
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>

      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />

      <Route path='*' element={<NotFound/>}/>
    </Routes>
  )
}

export default App
