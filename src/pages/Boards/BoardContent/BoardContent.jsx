import React from 'react'
import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box sx={{
      p: '10px 0',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#0984e3'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent