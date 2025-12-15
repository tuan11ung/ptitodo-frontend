import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function ListColumns({ columns, creatNewColumn, creatNewCard, deleteColumn }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(null)
  const toggelNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter column title!')
      return
    }

    // Tao du lieu Column de goi API
    const newColumnData = {
      title: newColumnTitle
    }

    /**
     * Goi len props function createNewColumn nam o component cha cao nhat
     */
    await creatNewColumn(newColumnData)

    // Dong trang thai them column moi & clear input
    toggelNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    /**
     * SortableContext yeu cau items la 1 mang dang ['id-1', 'id-2'] not [{id: 'id-1'}, {id: 'id-2'}]
     * Neu khong dung se khong co animation
     */
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map((column) => {
          return <Column key={column._id} column={column} creatNewCard={creatNewCard} deleteColumn={deleteColumn}/>
        })}

        {/* BOX ADD NEW COLUMN */}
        {!openNewColumnForm
          ? <Box onClick={toggelNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
            <Button sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }} startIcon={<AddCircleIcon/>}>Add new column</Button>
          </Box>
          : <Box
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: '#ffffff3d'
            }}
          >
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant='outlined'
              autoFocus
              onChange={(e) => setNewColumnTitle(e.target.value)}
              value={newColumnTitle}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} data-no-dnd='true'>
              <Button
                onClick={addNewColumn}
                variant='contained' color='success' size='small'
                sx={{
                  boxShadow: 'none',
                  // border: '1px solid',
                  borderColor: (theme) => theme.palette.success.main
                  // '&:hover': { borderColor: (theme) => theme.palette.success.main }
                }}
              >Add column</Button>
              <CloseIcon
                fontSize='small'
                sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.warning.dark } }}
                onClick={toggelNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns