import React from 'react'
import { Box } from '@mui/material'
import Column from './Column/Column'

function ListColumns() {
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
      <Column/>
    </Box>
  )
}

export default ListColumns