import React from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'

function ListCards() {
  return (
    <Box sx={{
      padding: '0 5px',
      m: '0 5px',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
      ${theme.trelloCustom.boardContentHeight} - 
      ${theme.spacing(5)} -
      ${theme.trelloCustom.columnFooterHeight} -
      ${theme.trelloCustom.columnHeaderHeight}
      )`,
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ced0da'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#bfc2cf'
      }
    }}>
      <Card/>
      <Card temporaryHideMedia/>
    </Box>
  )
}

export default ListCards