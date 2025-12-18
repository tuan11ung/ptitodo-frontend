import React, { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCardIcon from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useConfirm } from 'material-ui-confirm'

import { createNewCardAPI, deleteColumnAPI } from '~/apis/index'

import { cloneDeep } from 'lodash'

import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentActiveBoard, activeBoardSelector } from '~/redux/activeBoard/activeBoardSlice'

function Column({ column }) {
  const dispatch = useDispatch()
  const board = useSelector(activeBoardSelector)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyles = {
    // touchAction: 'none', // danh cho sensor default dang PointerSensor
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%', // fix loi keo flickering
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    if (openNewCardForm == true) {
      toggelNewCardForm()
    }
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderedCards = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(null)
  const toggelNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const inputRef = useRef(null)

  useEffect(() => {
    if (openNewCardForm && inputRef.current) {
      inputRef.current.focus()
    }
  }, [openNewCardForm])

  const [newCardTitle, setNewCardTitle] = useState('')
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter card title', { position: 'bottom-right' })
      return
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    /**
     * Goi len props function createNewCard nam o component cha cao nhat
     */
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // Cap nhat state board
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    toggelNewCardForm()
    setNewCardTitle('')
  }

  const deleteColumn = (columnId) => {
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)

    dispatch(updateCurrentActiveBoard(newBoard))

    deleteColumnAPI(columnId).then(res => {
      toast.success(res?.result)
    })
  }

  const confirmDelete = useConfirm()

  const handleDeleteColumn = () => {
    confirmDelete({
      title: 'Delete Column?',
      description: 'This action will permanently delete your Column and its Cards! Are you sure?',
      confirmationText: 'Confirm'
    })
      .then(() => {
        deleteColumn(column._id)
      })
      .catch(() => {})
  }

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`
        }}>

        {/* BOX COLUMN HEADER */}
        <Box sx={{
          height: (theme) => theme.trelloCustom.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}>
          <Typography variant='h6' sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More Options'>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-column-dropdown'
                }
              }}
              onClick={handleClose}
            >
              <MenuItem
                onClick={toggelNewCardForm}
                sx={{
                  '&:hover': {
                    color: 'primary.light',
                    '& .add-card-icon': {
                      color: 'primary.light'
                    }
                  }
                }}
              >
                <ListItemIcon className='add-card-icon'>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                sx={{
                  '&:hover': {
                    color: 'error.light',
                    '& .delete-icon': {
                      color: 'error.light'
                    }
                  }
                }}
                onClick={handleDeleteColumn}
              >
                <ListItemIcon>
                  <DeleteIcon className='delete-icon' fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* LIST CARDS */}
        <ListCards cards={orderedCards}/>

        {/* BOX COLUMN FOOTER */}
        <Box sx={{
          height: (theme) => theme.trelloCustom.columnFooterHeight,
          p: 2
        }}>
          {!openNewCardForm
            ? <Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }} >
              <Button startIcon={<AddCardIcon/>} onClick={toggelNewCardForm}>Add new card</Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }}></DragHandleIcon>
              </Tooltip>
            </Box>
            : <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
              data-no-dnd='true'
            >
              <TextField
                label="Enter card title..."
                type="text"
                size="small"
                variant='outlined'
                autoFocus
                inputRef={inputRef}
                onChange={(e) => setNewCardTitle(e.target.value)}
                value={newCardTitle}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                  },
                  '& label.Mui-focused': { color: (theme) => theme.palette.primary.main },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&:hover fieldset': { borderColor: (theme) => theme.palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: (theme) => theme.palette.primary.main }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  className='interceptor-loading'
                  onClick={addNewCard}
                  variant='contained' color='success' size='small'
                  sx={{
                    boxShadow: 'none',
                    // border: '1px solid',
                    borderColor: (theme) => theme.palette.success.main
                    // '&:hover': { borderColor: (theme) => theme.palette.success.main }
                  }}
                >Add</Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.dark,
                    cursor: 'pointer'
                  }}
                  onClick={toggelNewCardForm}
                />
              </Box>
            </Box>
          }
        </Box>

      </Box>
    </div>
  )
}

export default Column