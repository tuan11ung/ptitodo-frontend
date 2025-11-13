import React from 'react'
import { Box, Container } from '@mui/material'

function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      height: (theme) => theme.trelloCustom.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
        BOARD BAR
    </Box>
  )
}

export default BoardBar