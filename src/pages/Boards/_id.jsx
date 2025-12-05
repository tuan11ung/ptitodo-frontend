//board id
import React, { useState, useEffect } from 'react'
import { Container } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { useParams } from 'react-router-dom'
import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewCardAPI, createNewColumnAPI } from '~/apis'

function Board() {
  const [board, setBoard] = useState(null)
  // const [loading, setLoading] = useState(true)

  // const { boardId } = useParams();

  useEffect(() => {
    // async function fetchBoard() {
    //   try {
    //     const res = await fetch(`http://localhost:8017/v1/boards/${boardId}`)
    //     const data = await res.json()
    //     setBoard(data)
    //   } catch (err) {
    //     console.error('Lỗi gọi API:', err)
    //   } finally {
    //     setLoading(false)
    //   }
    // }

    // fetchBoard()
    const boardId = '692b2128f9a85561876254c6'

    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  const creatNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Cap nhat state board
  }

  const creatNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cap nhat state board
  }

  // if (!board) return <div>Loading...</div>;

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board={board}/>
      <BoardContent board={board} creatNewColumn={creatNewColumn} creatNewCard={creatNewCard}/>
    </Container>
  )
}

export default Board