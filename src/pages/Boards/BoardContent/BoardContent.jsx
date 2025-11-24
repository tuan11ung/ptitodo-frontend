import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { 
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  // Neu dung pointer sensor mac dinh thi phai dung touch-action: 'none', nma con bug
  // Yeu cau chuot di chuyen 10px thi moi goi event, tranh click
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })

  //
  const touchSensor = useSensor(TouchSensor, { activationConstraint: {
    delay: 250, // nhan giu 250ms
    tolerance: 50 // dung sai cam ung 5px
  } })

  // uu tien su dung mouse va touch sensor de khong bi bug tren mobile
  const mySensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  // Moi khi board thay doi thi cap nhat State voi du lieu da sap xep
  useEffect(() => {
    // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Xu ly du lieu sau khi keo tha
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    if (!over) return

    // Kiem tra xem item duoc keo sang vi tri khac hay khong
    if (active.id !== over.id) {
      // Lay vi tri cu tu active
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      // Lay vi tri moi tu active
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)

      // Mang sau khi keo tha, dung ArrayMove de sap xep lai mang columns ban dau
      // Repo Github: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      // Dung de xu ly goi APIs
      // console.log('dndOrderedColumns: ', dndOrderedColumns)
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)

      // Update State ban dau sau khi keo tha
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box sx={{
        p: '10px 0',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#0984e3'),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight
      }}>
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent