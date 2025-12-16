//board id
import React, { useState, useEffect } from 'react'
import { Box, Container, Typography } from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import CircularProgress from '@mui/material/CircularProgress'
import { toast } from 'react-toastify'
import { cloneDeep } from 'lodash'

import { updateBoardDetailsAPI, updateColumnDetailsAPI, moveCardToOtherColumnAPI, deleteColumnAPI } from '~/apis'

import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetailsAPI, updateCurrentActiveBoard, activeBoardSelector } from '~/redux/activeBoard/activeBoardSlice'

function Board() {

  const board = useSelector(activeBoardSelector)
  const dispatch = useDispatch()

  useEffect(() => {

    // fetchBoard()
    const boardId = '692b2128f9a85561876254c6'

    dispatch(fetchBoardDetailsAPI(boardId))

  }, [dispatch])

  const moveColumn = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(newBoard))

    // Goi api
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  const moveCardInSameColumn = async (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }

    dispatch(updateCurrentActiveBoard(newBoard))

    // Goi api
    await updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di chuyen card sang column khac
   * B1: cap nhat lai mang cardOrderIds cua column chua no (xoa _id o mang cu)
   * B2: cap nhat mang cardOrderIds moi vao column moi
   * B3: cap nhat lai columnId cua card vua duoc keo
   * => Lam 1 API support rieng
   */
  const moveCardToOtherColumn = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(newBoard))

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []

    await moveCardToOtherColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: 2 }}>
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    )
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar/>
      <BoardBar board={board}/>
      <BoardContent
        board={board}

        moveColumn={moveColumn}
        moveCardInSameColumn={moveCardInSameColumn}
        moveCardToOtherColumn={moveCardToOtherColumn}
      />
    </Container>
  )
}

export default Board