import React from 'react'
import { Box } from '@mui/material'

function BoardContent() {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : ''),
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid white'
    }}>
      BOARD CONTENT
    </Box>
  )
}

export default BoardContent