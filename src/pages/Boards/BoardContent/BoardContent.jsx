import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import {
  DndContext,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/DnDKitSensors'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board, creatNewColumn, creatNewCard, moveColumn, moveCardInSameColumn }) {
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

  // cung 1 thoi diem chi co 1 item duoc keo (column or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Moi khi board thay doi thi cap nhat State voi du lieu da sap xep
  useEffect(() => {
    // const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(board.columns)
  }, [board])

  // Tim 1 column theo cardId
  const findColumnByCardId = (cardId) => {
    // cho nay dung cards thay vi cardOrderIds vi cards can hoan thien truoc xong moi cap nhat cardOrderIds
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Cap nhat lai State khi di chuyen card giua cac column khac nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Logic tinh toan cardIndex moi (tren hoac duoi cua over card)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // clone mang OrderedColumnsState cu ra 1 cai moi de xu ly data roi return - cap nhat lai OrderedColumnsState moi
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // Old column
      if (nextActiveColumn) {
        // Xoa card o cai column active
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Them placeholder neu card empty
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Cap nhat lai mang cardOrderIds cho chuan du lieu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      // New old column
      if (nextOverColumn) {
        // Kiem tra xem card dang keo co ton tai o overColumn chua, neu co thi can xoa no truoc
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // Them card dang keo vao overColumn vao vi tri moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // Xoa placeholder card neu dang ton tai
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Cap nhat lai mang cardOrderIds cho chuan du lieu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }

  // Xu ly du lieu khi bat dau keo tha
  const handleDragStart = (event) => {
    // console.log('handleDragStart : ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Neu la keo card thi moi thuc hien hanh dong set gia tri oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Xu ly du lieu trong qua trinh keo
  const handleDragOver = (event) => {
    // console.log('handleDragEnd: ', event)

    // Khong lam gi neu dang keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Neu keo card thi xu ly them de co the keo card qua lai giua cac columns
    const { active, over } = event

    // Neu khong ton tai active voi over thi khong lam gi
    if (!over || !active) return

    // activeDraggingCard: card dang duoc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: la card dang duoc keo den
    const { id: overCardId } = over

    // Tim 2 columns theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Neu khong ton tai 1 trong 2 column
    if (!activeColumn || !overColumn) return

    // Xu ly logic khi keo card qua 2 columns khac nhau, con neu keo card trong chinh column ban dau cua no thi khong lam gi
    // Dat la luc xu ly khi keo, con xu ly luc keo xong thi o handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  // Xu ly du lieu sau khi keo tha
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)

    const { active, over } = event

    if (!over || !active) return

    // Xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCard: card dang duoc keo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: la card dang duoc keo den
      const { id: overCardId } = over

      // Tim 2 columns theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Neu khong ton tai 1 trong 2 column
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // Hanh dong keo tha card trong cung 1 column
        // console.log('oldColumnWhenDraggingCard: ', oldColumnWhenDraggingCard);
        // Lay vi tri cu tu oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        // console.log('oldCardIndex: ', oldCardIndex)
        // Lay vi tri moi tu over
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        // console.log('newCardIndex: ', newCardIndex)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

        setOrderedColumns(prevColumns => {
          // clone mang OrderedColumnsState cu ra 1 cai moi de xu ly data roi return - cap nhat lai OrderedColumnsState moi
          const nextColumns = cloneDeep(prevColumns)

          // Tim toi mang ta dang tha
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)

          // Cap nhat lai 2 gia tri moi la card va cardOrderIds trong cai targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds

          // Tra ve state moi chuan vi tri
          return nextColumns
        })

        moveCardInSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
      }
    }

    // Xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Kiem tra xem item duoc keo sang vi tri khac hay khong
      if (active.id !== over.id) {
        // Lay vi tri cu tu active
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        // Lay vi tri moi tu over
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

        // Mang sau khi keo tha, dung ArrayMove de sap xep lai mang columns ban dau
        // Repo Github: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        // Update State ban dau sau khi keo tha
        setOrderedColumns(dndOrderedColumns)

        // Dung de xu ly goi APIs
        // console.log('dndOrderedColumns: ', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds)
        moveColumn(dndOrderedColumns)
      }
    }

    // Nhung du lieu sau khi keo tha luon phai dua ve null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  /**
   * Animation khi drop phan tu
   */
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext
      sensors={mySensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        p: '10px 0',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#0984e3'),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight
      }}>
        <ListColumns
          columns={orderedColumns}
          creatNewColumn={creatNewColumn}
          creatNewCard={creatNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemId || !activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent