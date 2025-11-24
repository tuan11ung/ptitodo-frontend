import React from 'react'
import { Box } from '@mui/material'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddCircleIcon from '@mui/icons-material/AddCircle'

function ListColumns({ columns }) {
  return (
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
        return <Column key={column._id} column={column}/>
      })}

      {/* BOX ADD NEW COLUMN */}
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
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
    </Box>
  )
}

export default ListColumns